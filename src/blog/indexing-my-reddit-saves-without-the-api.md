---
title: Indexing my Reddit saves without the API
description: "A source-linked implementation note on reddit-kb, a local MCP server for searching saved Reddit content."
date: 2026-06-16
tags: [ai, mcp, reddit, chromadb, ollama, embeddings, rag, docker]
layout: post.njk
thumbnail: /images/blog/indexing-my-reddit-saves-without-the-api.jpg
---

![A computer monitor showing source code in a dark mode editor, lit by warm amber light](/images/blog/indexing-my-reddit-saves-without-the-api.jpg)

I wanted a better way to revisit saved Reddit posts and comments. The result is [reddit-kb](https://github.com/lh1207/reddit-kb-mcp-server), a local project whose source documents the data flow and deployment configuration.

Updated October 2026: this post describes what the repository implements. It does not make claims about Reddit policy, live deployment, or the privacy and cost of a particular runtime.

## What the source contains

The [server](https://github.com/lh1207/reddit-kb-mcp-server/blob/main/server.py) registers four FastMCP tools: saved-content search, ingestion, live-thread fetch, and live search. The [ingestion code](https://github.com/lh1207/reddit-kb-mcp-server/tree/main/tools) normalizes saved items before adding text, metadata, and embeddings to a Chroma collection.

The repository's [embedding module](https://github.com/lh1207/reddit-kb-mcp-server/blob/main/lib/embeddings.py) calls an Ollama-compatible endpoint, while [the Chroma module](https://github.com/lh1207/reddit-kb-mcp-server/blob/main/lib/chroma.py) opens a persistent local collection. Those are implementation details in source, not a claim that a particular index is currently running or contains a particular set of saves.

## Configuration and error handling

The [Reddit client](https://github.com/lh1207/reddit-kb-mcp-server/blob/main/lib/reddit.py) reads its username, session cookie, and user-agent from environment variables. Its request-error path reports a generic error rather than including the original request exception in the new message, so that message does not reproduce request details.

The repository also contains [offline tests](https://github.com/lh1207/reddit-kb-mcp-server/tree/main/tests) for the client, ingestion, search, fetch, and server-registration boundaries.

## Container definition

The [Compose definition](https://github.com/lh1207/reddit-kb-mcp-server/blob/main/docker/docker-compose.yml) describes a containerized HTTP transport, environment-file configuration, a mounted Chroma store, and a health check. It also records the address configuration required when the embedding endpoint is outside the container. Those files are a reproducible starting point, not proof of a current deployment or availability guarantee.

## Why I keep the source public

The useful part of this project is inspectability. The repository shows the interfaces, configuration boundaries, and tests behind a small search tool. That makes it easier to revisit the design, correct it, or use it as a reference for another local project.
