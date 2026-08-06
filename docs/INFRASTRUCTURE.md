# Infrastructure Overview

## Local deployment model

The workspace uses Docker Compose to run the core platform locally. The main compose configuration is located at infrastructure/docker/docker-compose.yml.

## Core infrastructure components

- Traefik – reverse proxy and TLS termination for local routing
- PostgreSQL – relational database for the auth service
- Redis – cache and session-oriented support
- OpenSearch – search and observability data backend
- OpenSearch Dashboards – UI for OpenSearch
- MinIO – object storage for file-like assets

## Networking and routing

Traefik exposes local hostnames such as:

- traefik.cyberconnect.local
- search.cyberconnect.local
- storage.cyberconnect.local
- console.cyberconnect.local

These routes are configured through Traefik labels and dynamic configuration files.

## Certificates and local hosts

The infrastructure folder includes certificate generation scripts and host configuration helpers so the local environment can use HTTPS-style local domains.

## Operational notes

- Docker services are configured with restart policies and health checks where available.
- Environment values are expected from the compose environment files.
- The auth service automatically applies EF Core migrations on startup.
