# Docker Development

This repository uses Docker Compose for shared infrastructure, local development, and production-like containers. Run commands from the repository root (`D:\CyberConnect` or the equivalent path on your machine).

## Prerequisites

Install and start:

- Docker Desktop with Docker Compose v2
- `mkcert` for the local HTTPS certificate
- PowerShell as Administrator for the hosts-file setup

The Compose files expect a root `.env` file. It is ignored by Git because it contains credentials. Create it locally and provide these variables:

```text
REDIS_PASSWORD
OPENSEARCH_PASSWORD
MINIO_ROOT_USER
MINIO_ROOT_PASSWORD
KEYCLOAK_DB_USERNAME
KEYCLOAK_DB_PASSWORD
KEYCLOAK_ADMIN
KEYCLOAK_ADMIN_PASSWORD
TZ
VITE_KEYCLOAK_URL
VITE_KEYCLOAK_REALM
VITE_KEYCLOAK_CLIENT_ID
VITE_API_URL
```

Use strong local-only values. Do not commit `.env`, paste its values into documentation, or reuse development credentials in another environment.

## First-time setup

From the repository root:

```powershell
.\scripts\generate-certificates.ps1
.\scripts\install-host.ps1
```

The first script installs the local `mkcert` CA and creates certificates under `certificates/`. The second adds the `*.cyberconnect.local` hostnames to the Windows hosts file. Run the second script from an elevated PowerShell window.

The hosts used by the current routing configuration are:

| Host | Purpose |
| --- | --- |
| `app.cyberconnect.local` | CyberConnect web app |
| `auth.cyberconnect.local` | Keycloak |
| `storage.cyberconnect.local` | MinIO S3 endpoint |
| `console.cyberconnect.local` | MinIO console |
| `search.cyberconnect.local` | OpenSearch Dashboards |
| `traefik.cyberconnect.local` | Traefik dashboard |

## How Compose works here

`compose.yml` is the base file. It defines the shared reverse proxy, databases, caches, search, object storage, Keycloak, and the production-like CyberApp image.

`compose.override.yml` is a development override. Docker Compose automatically loads it when both files are named `compose.yml` and `compose.override.yml`. It adds host ports, smaller local OpenSearch memory settings, the Vite development container, bind mounts, and file watching. The override can also replace labels, as it does for `cyberapp`.

The base file creates two bridge networks:

- `frontend`: attach services that Traefik must route to.
- `backend`: attach internal dependencies such as PostgreSQL, Redis, OpenSearch, and service APIs.

Containers on the same network reach each other by Compose service name, for example `postgres:5432`, `redis:6379`, or `opensearch:9200`. A container should use these names instead of `localhost`.

Named volumes preserve state across container recreation:

- `postgres_data`
- `redis_data`
- `opensearch_data`
- `minio_data`

Traefik discovers only containers with `traefik.enable=true`. Its labels define the hostname, entrypoint, TLS behavior, and the container port to route to. The container port in a label is not necessarily the host port.

## Common commands

```powershell
# Start the local stack (base + automatic override)
docker compose up -d

# Build images and start the stack
docker compose up -d --build

# Follow all logs, or logs for one service
docker compose logs -f
docker compose logs -f cyberapp

# Check service state and health
docker compose ps

# Validate the merged files without starting containers
docker compose config

# Stop and remove containers and the Compose network
docker compose down

# Stop everything and delete named data volumes (destructive)
docker compose down -v
```

With the development override, the app is available at `http://localhost:5173` and through `https://app.cyberconnect.local`. Infrastructure ports are also published for local tools: PostgreSQL `5432`, Redis `6379`, OpenSearch `9200`/`9600`, MinIO `9000`/`9001`, and the Traefik dashboard `8080`.

To run only the base configuration, omit the override explicitly:

```powershell
docker compose -f compose.yml up -d --build
```

## Adding a future service

Keep each service in its own directory under `services/` and give it a production Dockerfile. For a .NET service, the Dockerfile should publish the application in a build stage, run it from the ASP.NET runtime image, bind to `0.0.0.0`, and expose its internal HTTP port.

Add the service to `compose.yml` using the repository root as the path reference:

```yaml
  example-service:
    build:
      context: ./services/ExampleService
      dockerfile: DOCKERFILE
    container_name: example-service
    restart: unless-stopped
    environment:
      ASPNETCORE_ENVIRONMENT: Production
      ASPNETCORE_URLS: http://+:8080
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - frontend
      - backend
    labels:
      - traefik.enable=true
      - traefik.http.routers.example-service-http.rule=Host(`api.cyberconnect.local`)
      - traefik.http.routers.example-service-http.entrypoints=web
      - traefik.http.routers.example-service-http.middlewares=redirect-https@file
      - traefik.http.routers.example-service.rule=Host(`api.cyberconnect.local`)
      - traefik.http.routers.example-service.entrypoints=websecure
      - traefik.http.routers.example-service.tls=true
      - traefik.http.services.example-service.loadbalancer.server.port=8080
```

Use a unique hostname and router/service names when the service is not the API. Add a development-only override in `compose.override.yml` for source mounts, a development command, a host port, and `develop.watch` if the service supports it. Keep secrets in `.env` or a deployment secret store, not in the Compose file.

The existing TenantService is not currently registered in the root Compose stack. Its service directory is `services/TenantService`; wire it in with a context such as `./services/TenantService`, then confirm its internal listening port and health behavior before adding `depends_on` or Traefik labels.

## Adding a future app

For a frontend app:

1. Place it under `apps/<app-name>`.
2. Add a development Dockerfile that runs the framework dev server on `0.0.0.0`.
3. Add a production Dockerfile that builds static assets and serves them with Nginx or the app's production server.
4. Add the production build to `compose.yml` and the source-mounted dev build to `compose.override.yml`.
5. Pass browser-visible configuration as build arguments or the framework's supported environment mechanism. Never put server-only secrets in frontend variables.
6. Add Traefik labels using the app's unique `*.cyberconnect.local` hostname and its internal container port.

Example development entry:

```yaml
  example-app:
    build:
      context: ./apps/example-app
      dockerfile: Dockerfile.dev
    volumes:
      - ./apps/example-app:/app
      - /app/node_modules
    command: npm run dev -- --host 0.0.0.0
    ports:
      - "5174:5173"
    environment:
      NODE_ENV: development
    networks:
      - frontend
```

After adding or changing a service, run `docker compose config`, then `docker compose up -d --build <service-name>` and inspect `docker compose logs -f <service-name>`. Verify the direct port, the Traefik hostname, and any dependency healthchecks before considering the container integrated.
