---
title: AeroAssist - Docker support contribution
description: Docker and Compose configuration added to the AeroAssist ticketing application.
date: 2026-01-26
tags: [docker, containerization, devops, csharp, asp.net, homelab]
layout: post.njk
thumbnail: /images/aeroassist/cloud-logo-docker.png
thumbnailLogo: true
---

I added container configuration to [AeroAssist](https://github.com/lh1207/AeroAssist), an `ASP.NET` ticketing application. The repository includes a Dockerfile, Docker Compose configuration, and container-specific application settings.

## What is included

- A [Dockerfile](https://github.com/lh1207/AeroAssist/blob/master/Dockerfile) for the application.
- A [Docker Compose file](https://github.com/lh1207/AeroAssist/blob/master/docker-compose.yml) describing the application and SQL Server services.
- [Container settings](https://github.com/lh1207/AeroAssist/blob/master/appsettings.Docker.json) for the application.

The configuration makes the application and database dependencies visible in source control. It is an example of my contribution to an existing software project, separate from my employer support experience.

## Inspecting the project

Use the repository's current setup instructions and configuration when trying the application. Container configuration alone is not a production-readiness or security assessment.

[Ticket API overview](/blog/aeroassist-ticketing-system/)
