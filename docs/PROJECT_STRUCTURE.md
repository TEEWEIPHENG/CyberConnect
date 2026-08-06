# Project Structure

## Repository layout

- apps/ – frontend application(s)
- services/ – backend services
- infrastructure/ – deployment, Docker Compose, certificates, and local environment scripts
- monitoring/ – Prometheus, Grafana, Loki, and related monitoring assets

## Frontend application

Location: apps/cyber-app

Key folders:

- src/main.tsx – application bootstrap
- src/app/ – router and app-level routing guards
- src/features/ – feature-oriented UI modules such as authentication and dashboard
- src/layouts/ – shared layout components
- src/shared/ – shared services, context, styles, types, and components

## Backend service

Location: services/AuthService

The service is organized in multiple projects:

- AuthService.API – ASP.NET Core Web API entry point, controllers, middleware, and startup configuration
- AuthService.Application – application layer with commands, services, interfaces, and domain-facing models
- AuthService.Domain – domain entities, enums, exceptions, and core business concepts
- AuthService.Infrastructure – persistence, repositories, EF Core configuration, and supporting services
- Tests/AuthService.UnitTest – unit tests for the service

## Infrastructure layer

Location: infrastructure/

Key areas:

- docker/ – Docker Compose files and container-specific configuration
- certificates/ – TLS certificate assets and guidance
- scripts/ – scripts for bringing services up and configuring local hosts

## Monitoring layer

Location: monitoring/

Contains configuration and storage assets for observability tools such as Prometheus, Grafana, and Loki.
