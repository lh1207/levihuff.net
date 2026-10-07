---
title: AeroAssist - Docker and SQL Server deployment
description: How AeroAssist packages its ASP.NET Core application and SQL Server dependency, with configuration details and current validation limits.
date: 2026-01-26
updated: 2026-10-07
tags: [docker, containerization, devops, csharp, asp.net]
layout: post.njk
thumbnail: /images/aeroassist/cloud-logo-docker.png
thumbnailLogo: true
---

I added Docker configuration to AeroAssist in [PR #37](https://github.com/lh1207/AeroAssist/pull/37) to package the application and SQL Server together. For screenshots and my implementation work, see the [AeroAssist case study](/blog/aeroassist-ticketing-system/).

These notes describe files at [dff52cb](https://github.com/lh1207/AeroAssist/commit/dff52cbc726f252fc47e9de10b5586982a7c66e7). They are a source review, not a verified deployment walkthrough.

## What the configuration provides

- The [Dockerfile](https://github.com/lh1207/AeroAssist/blob/dff52cbc726f252fc47e9de10b5586982a7c66e7/Dockerfile) restores and publishes with the .NET 8 SDK, copies output into the ASP.NET 8 runtime image, and runs as `appuser`.
- [Compose](https://github.com/lh1207/AeroAssist/blob/dff52cbc726f252fc47e9de10b5586982a7c66e7/docker-compose.yml) defines `aeroassist` and `sqlserver` services, a shared network, and the `sqlserver-data` volume.
- SQL Server uses the 2022 image with the Express edition setting. The app waits for the database health check and applies migrations when configured.
- The app listens on port 8080. Compose also publishes SQL Server on port 1433.

## Start and stop

Use a Docker host compatible with the SQL Server image. The Compose file accepts SQL Server license terms and publishes both ports.

```bash
git clone https://github.com/lh1207/AeroAssist.git
cd AeroAssist
cp .env.example .env
# Replace SA_PASSWORD in .env with your own strong password.
docker compose up --build -d
docker compose logs
```

The configured addresses are `http://localhost:8080` and `http://localhost:8080/swagger`. Use `docker compose down` to stop services while retaining the database volume.

## Configuration the code reads

These keys come from [Program.cs](https://github.com/lh1207/AeroAssist/blob/dff52cbc726f252fc47e9de10b5586982a7c66e7/Program.cs) and the page models:

- `ConnectionStrings__DefaultConnection`: SQL Server connection string.
- `Database__AutoMigrate`: apply EF migrations at startup.
- `HttpClient__BaseAddress`: API address used by server-side page models. Compose sets `http://aeroassist:8080/`.
- `Swagger__Enabled`: expose Swagger outside Development.
- `ReverseProxy__Enabled`: skip the production HSTS/HTTPS redirect branch. This alone does not configure forwarded headers.
- `Authentication__Microsoft__ClientId` and `Authentication__Microsoft__ClientSecret`: optional Microsoft sign-in, registered when both are present.

Compose runs in the `Production` environment and supplies settings through environment variables. `appsettings.Docker.json` is a reference file, not the active environment configuration for this Compose setup.

## Manual .NET setup

Use a .NET 8 SDK and an accessible SQL Server instance. Configure `ConnectionStrings:DefaultConnection` with local user secrets or environment variables before applying migrations. Restore packages, install a .NET 8-compatible `dotnet-ef` tool, and run `dotnet ef database update`.

The repository defines `https-website` (ports 5000/5001) and `https-api` (7222/7223) launch profiles. The default page-model client and chart scripts expect the API on `https://localhost:7223`; starting only the website profile is insufficient. For these defaults, start both profiles in separate terminals:

```bash
dotnet run --launch-profile https-api
# In a second terminal:
dotnet run --launch-profile https-website
```

Local HTTPS requires a trusted development certificate. This sequence is derived from the checked-in configuration and was not executed during this review.

## Remaining demonstration issues

- Chart scripts hardcode `https://localhost:7223/api/Ticket/Ticket`, bypassing the configurable server-side API address.
- The application health check requires `curl`, but the Dockerfile does not install it.
- Compose has a default database password fallback and enables the page-model certificate-validation bypass. Replace demo defaults and review authorization before public deployment.
- The .NET SDK was unavailable and Docker was not running during this website update, so a successful build and end-to-end run remain unverified.
