---
title: "Consolidating my Proxmox homelab around Docker"
description: "Moving five household services into a Docker LXC, preserving their data and rollback paths, and documenting what still needs verification."
date: 2026-08-20T12:00:00-04:00
tags: [homelab, proxmox, docker, lxc, self-hosting, systems-administration]
layout: post.njk
thumbnail: /images/projects/proxmox-homelab.jpg
---

![Rack-mounted servers and network equipment in a data center](/images/projects/proxmox-homelab.jpg)

**Updated November 10, 2026.**

My Proxmox homelab has been moving from separate service containers toward a shared Docker environment. The useful part of that work has been preserving the things inside the applications: the BookStack library, monitoring configuration, Homebridge identity, DNS settings, and Jellyfin users and watched state.

This update follows the migration checks recorded on October 18–19, 2026, and the recovery runbooks written afterward. Those records describe what was checked at the time. They are not a fresh live inspection of the lab today.

## Docker runs inside an LXC

Proxmox remains the host platform. An unprivileged LXC runs Docker, with separate Compose stacks for groups such as media, monitoring, networking, and application services. Home Assistant remains in its own virtual machine.

The services migrated from standalone LXCs are Pi-hole, Jellyfin, Homebridge, Uptime Kuma, and BookStack. Their source LXCs are stopped in an Archive resource pool with boot startup disabled. Their disks and the original Docker volumes are retained for rollback.

That is a more precise description than saying everything moved into one stack. The applications share a Docker environment, but their Compose projects and persistent data remain distinct. Home Assistant still has a separate operating boundary.

Consolidation gives me a more consistent way to manage applications. It also creates a shared failure domain: a problem with the Docker LXC can affect several services together. Keeping separate Compose projects does not remove that dependency.

## Migration meant checking application state

A first-run screen can look like a successful deployment while hiding an empty volume. I needed evidence that the replacement contained the original service's data.

For BookStack, that meant migrating both the application files and database, including the original encryption key. The recorded checks matched core records and users, and an original-account sign-in verified the restored library. The application also responded after an application and database restart.

Uptime Kuma retained its monitors and user account. Its database passed an integrity check, and the migrated service responded after restart. Homebridge's configuration, pairings, accounts, and plugins were restored, with both plugins loading without recent logged errors. Actual device control remains unverified in the migration record.

Pi-hole needed checks beyond its administration page. The migrated instance answered DNS queries over both UDP and TCP. That established that the replacement resolver could answer requests. It did not prove that every household client had switched away from the old address; client DNS cutover remained unresolved.

Jellyfin required separate checks for users, libraries, watched state, and media access. The migration restored two users and five libraries. Authenticated direct streaming returned bytes matching an actual video before and after restart. Watched-state records for retained media were checked, while records associated with unavailable media paths were preserved in a private export and source backup. Visual playback and transcoding were still untested, and metadata scanning was ongoing.

These checks give each migration a concrete acceptance boundary. They also leave an honest list of workflows to finish testing.

## HTTPS and the dashboard are separate layers

Caddy provides local HTTPS routes in front of the web applications. Pi-hole holds the local DNS records, and clients need to trust the relevant Caddy certificate authority. The Mac proxy and server proxy have separate local authorities.

That gives troubleshooting several distinct questions: does the backend respond, does the proxy reach it, does the client resolve the name, and does the client trust the certificate? A working backend alone cannot answer all four.

The later Homepage dashboard gives me a central directory for the lab. Its cards include Docker services, Home Assistant, Proxmox, and other local resources. Twelve configured HTTP checks passed during dashboard deployment verification.

Those indicators establish reachability at the checked endpoints. They do not prove that a database connection, media playback, or home automation workflow works. The dashboard also includes a clearly identified staging placeholder whose backend is not deployed. A link on the dashboard is not evidence of a running service.

## Repository files and deployed files can drift

One important discovery was that the Git checkout is not the live deployment source for most stacks. The running services use external Compose files on the Docker host. The repository contains definitions and references, but editing those files does not update the deployed copies.

The runbooks now make target identification the first step: confirm the host, Compose project, image, mounts, and actual deployment source before changing a service. That prevents a repository edit from being mistaken for a completed deployment, or a reference definition from accidentally starting a second instance.

It is also a maintenance task I still need to resolve. A clearer relationship between versioned definitions and deployed sources would make future changes easier to trace.

## Backups and rollback have different limits

The migration produced a dated manual backup on my Mac, including Docker data and deployment sources. Recorded checksum checks passed, along with disposable SQLite restore checks for selected services. Jellyfin also has separate migration backups and recorded restore checks.

That is useful recovery evidence, but it does not establish a complete host restore. The records do not show a recurring backup schedule or retention policy. A later model installation also postdates the full Docker snapshot and has its own backup.

The archived LXCs provide another recovery option, with a different limitation: they represent the source state at cutover. Returning to one later could discard newer changes. A rollback needs a deliberate recovery point and must avoid running both copies of a service at once.

The recovery runbooks cover Pi-hole, BookStack, and Uptime Kuma, plus common restore precautions. They call for isolated restore rehearsals and service-specific acceptance checks. Writing those procedures does not mean every rehearsal has passed. An offline copy also matters, especially when BookStack itself needs recovery.

## What remains to verify

The migration records leave several concrete follow-ups:

- Complete client DNS cutover and test the affected household workflows.
- Verify Homebridge device control and Jellyfin visual playback and transcoding.
- Test media mounting and service recovery after a full host reboot.
- Establish recurring backups, retention, and a broader recovery rehearsal.
- Reconcile the repository definitions with the live deployment sources.

The lab also has experiments beyond the household services. Ollama passed an embedding request, and its backend was reachable from Open WebUI, but authenticated WebUI use and chat inference were not verified. Gitea remained at initial setup, and staging had no deployed backend. Those are separate pieces of unfinished work.

The main improvement is a more consistent application environment with better migration evidence and recovery instructions. The next useful milestone is proving that household workflows and recovery procedures hold up beyond the checks already recorded.
