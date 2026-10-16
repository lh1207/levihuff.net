---
title: AeroAssist - Ticketing API development
description: AeroAssist ticket API and container configuration, with links to the implementation.
date: 2025-01-18
tags: [full-stack, csharp, asp.net, mssql, web-development, ticketing-system]
layout: post.njk
thumbnail: /images/aeroassist/cloud-logo.png
thumbnailLogo: true
---

[AeroAssist](https://github.com/lh1207/AeroAssist) is a software project with an `ASP.NET` ticketing application. My contributions include adding Docker and Docker Compose configuration to the existing application.

## What the source contains

The [ticket controller](https://github.com/lh1207/AeroAssist/blob/master/Controllers/TicketController.cs) implements endpoints for creating, reading, updating, and deleting tickets. The application uses C#, `ASP.NET`, Entity Framework, and SQL Server.

The [project file](https://github.com/lh1207/AeroAssist/blob/master/AeroAssist.csproj) records the dependencies. The repository also includes the application views, ticket service, and database model.

## Container configuration

The [Dockerfile](https://github.com/lh1207/AeroAssist/blob/master/Dockerfile) and [Compose file](https://github.com/lh1207/AeroAssist/blob/master/docker-compose.yml) describe how to package the app and its database for a container environment.

This is a software portfolio project. The source shows ticket operations and deployment configuration; it does not establish use as a production help desk system.

[More about the container work](/blog/aeroassist-docker-support/)
