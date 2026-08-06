# CyberConnect Workspace Documentation

This directory contains a practical overview of the CyberConnect repository for onboarding, architecture review, and local development.

## What this workspace contains

- A React-based web application in the apps/cyber-app folder
- A .NET authentication service in the services/AuthService folder
- Docker-based infrastructure and local environment tooling under infrastructure/
- Monitoring and observability assets under monitoring/

## Documentation set

- [Project Structure](./PROJECT_STRUCTURE.md)
- [Infrastructure](./INFRASTRUCTURE.md)
- [Tech Stack](./TECH_STACK.md)

## High-level architecture

The workspace is organized as a multi-service platform:

1. The frontend application provides the user interface and routes to protected areas.
2. The AuthService exposes authentication and user-management APIs.
3. Infrastructure components such as PostgreSQL, Redis, OpenSearch, MinIO, and Traefik support the services locally.
4. Docker Compose orchestrates the local environment and Traefik handles routing and TLS termination.
