---
title: AeroAssist - Adding Docker Support for Home Lab Deployment
description: Containerizing the AeroAssist ticketing system with Docker and Docker Compose for simplified deployment in home labs and production environments
date: 2026-01-26
tags: [docker, containerization, devops, csharp, asp.net, home-lab]
layout: post.njk
---

# AeroAssist - Adding Docker Support for Home Lab Deployment

I recently added Docker support to AeroAssist, making it much easier to deploy the ticketing system in home labs and containerized environments. This update includes a multi-stage Dockerfile, Docker Compose configuration, and several configuration enhancements to support containerized deployments.

**Pull Request:** [Add Docker Support - PR #37](https://github.com/lh1207/AeroAssist/pull/37)

## Why Docker?

Running AeroAssist previously required manual setup of .NET, SQL Server, and configuration of connection strings and environment variables. Docker solves these problems by packaging everything into containers that work consistently across different environments.

Benefits of containerizing AeroAssist:

- **Simplified deployment**: One command to start the entire stack
- **Consistent environments**: Same setup works on any Docker host
- **Isolation**: Application and database run in separate containers
- **Easy updates**: Pull new images and restart
- **Home lab friendly**: Perfect for self-hosted environments

## What Changed

### Configuration Enhancements

The application needed several changes to work properly in containerized environments:

- **Configurable HTTP client base URL**: No longer hard-coded to localhost
- **Certificate validation bypass**: Configurable for development and internal networks
- **CORS origins**: Configurable via appsettings for different deployment scenarios
- **Microsoft Account authentication**: Can be enabled/disabled through configuration
- **Swagger**: Configurable for production environments
- **HTTPS redirect**: Can be disabled when running behind a reverse proxy

These changes make AeroAssist flexible enough to run in various deployment configurations without code changes.

### Dockerfile

The Dockerfile uses a multi-stage build for optimal image size and security:

```dockerfile
# Build stage - uses .NET 8.0 SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /app

# Runtime stage - uses ASP.NET runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .

# Run as non-root user
USER app
EXPOSE 8080
HEALTHCHECK CMD curl --fail http://localhost:8080/health || exit 1
ENTRYPOINT ["dotnet", "AeroAssist.dll"]
```

Key features:
- **Multi-stage build**: Keeps the final image small by excluding build tools
- **Non-root user**: Follows security best practices
- **Health check**: Enables container orchestrators to monitor application health
- **Port 8080**: Standard HTTP port for containerized ASP.NET apps

### Docker Compose

The `docker-compose.yml` orchestrates the full application stack:

```yaml
services:
  aeroassist:
    build: .
    ports:
      - "8080:8080"
    environment:
      - ASPNETCORE_ENVIRONMENT=Docker
      - ConnectionStrings__DefaultConnection=${DB_CONNECTION_STRING}
    depends_on:
      db:
        condition: service_healthy

  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=${SA_PASSWORD}
    volumes:
      - sqldata:/var/opt/mssql
    healthcheck:
      test: /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P ${SA_PASSWORD} -Q "SELECT 1"

volumes:
  sqldata:
```

This configuration provides:
- **SQL Server 2022 Express**: Production-ready database
- **Health checks**: Application waits for database to be ready
- **Persistent volumes**: Database data survives container restarts
- **Bridge networking**: Containers communicate on an isolated network
- **Environment variables**: Sensitive values loaded from `.env` file

### Supporting Files

Additional files included in this update:

- **`.dockerignore`**: Excludes unnecessary files from the build context
- **`appsettings.Docker.json`**: Reference configuration for containerized deployments
- **`.env.example`**: Template for environment variables

## Quick Start

Getting AeroAssist running with Docker is now straightforward:

### Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/lh1207/AeroAssist.git
cd AeroAssist

# Copy environment template and configure
cp .env.example .env
# Edit .env with your settings

# Start the stack
docker compose up -d
```

The application will be available at `http://localhost:8080` once both containers are healthy.

### Using Standalone Docker

For environments with an existing database:

```bash
# Build the image
docker build -t aeroassist .

# Run the container
docker run -d \
  -p 8080:8080 \
  -e ConnectionStrings__DefaultConnection="your-connection-string" \
  -e ASPNETCORE_ENVIRONMENT=Docker \
  aeroassist
```

## Auto-Migration

The containerized deployment includes automatic database migration. When the application starts, it checks for pending migrations and applies them. This eliminates the need for manual migration steps during deployment or updates.

## Configuration Reference

Key environment variables for Docker deployments:

| Variable | Description |
|----------|-------------|
| `ConnectionStrings__DefaultConnection` | SQL Server connection string |
| `ASPNETCORE_ENVIRONMENT` | Set to `Docker` for containerized config |
| `Auth__MicrosoftAccount__Enabled` | Enable/disable Microsoft auth |
| `Cors__Origins` | Allowed CORS origins |
| `Swagger__Enabled` | Enable Swagger in production |
| `HttpsRedirect__Enabled` | Enable/disable HTTPS redirect |

## Technical Considerations

### Running Behind a Reverse Proxy

When running AeroAssist behind a reverse proxy like Nginx or Traefik:

1. Disable HTTPS redirect in the application (the proxy handles TLS)
2. Configure CORS origins to match your domain
3. Set up proper forwarded headers if needed

### Database Persistence

The Docker Compose configuration uses a named volume (`sqldata`) for database persistence. This ensures data survives container restarts and updates. For production, consider:

- Regular database backups
- Volume backup strategies
- External SQL Server for critical deployments

## Learning Outcomes

Adding Docker support to AeroAssist provided experience with:

- Multi-stage Docker builds for .NET applications
- Docker Compose for multi-container applications
- Configuration management for containerized environments
- Container security best practices
- Health checks and container orchestration

## Conclusion

Docker support makes AeroAssist much more accessible for home lab users and simplifies deployment in any containerized environment. The combination of Docker Compose, configurable settings, and auto-migration means you can have a full ticketing system running in minutes rather than hours.

For more details, check out the [pull request](https://github.com/lh1207/AeroAssist/pull/37) or the [AeroAssist repository](https://github.com/lh1207/AeroAssist).
