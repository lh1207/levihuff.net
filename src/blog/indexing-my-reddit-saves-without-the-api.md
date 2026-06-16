---
title: Indexing My Reddit Saves Without the API
description: "A build log of reddit-kb, the MCP server that turns my saved Reddit posts into a local searchable index. The official API was a dead end, so it runs on a session cookie, nomic-embed-text through Ollama, and ChromaDB. Two Docker failures included."
date: 2026-06-16
tags: [ai, mcp, reddit, chromadb, ollama, embeddings, rag, docker]
layout: post.njk
thumbnail: /images/blog/indexing-my-reddit-saves-without-the-api.jpg
---

![A computer monitor showing source code in a dark mode editor, lit by warm amber light](/images/blog/indexing-my-reddit-saves-without-the-api.jpg)

Last post ended on a wireframe. The [reddit-kb scaffold](/blog/spending-the-fable-window/) came out of a single Fable session as typed signatures and `NotImplementedError` bodies, with the ingestion layer labeled PRAW, because that is the obvious thing you reach for when you want to read Reddit from Python.

This post is what happened when I went to fill that stub in, and the label turned out to be wrong.

My Reddit saved list is a junk drawer. Years of bookmarked comments, the kind with a real answer buried three paragraphs down, and no way to search any of it. No tags, no full text, and posts get edited or deleted out from under the bookmark. reddit-kb pulls that content into a local index I control, so "that thread about Proxmox ghost nodes" becomes an actual query instead of an afternoon of scrolling.

The headline: it all runs locally and none of it touches the official Reddit API, because the official API is closed. Saved items come in over a session cookie. `nomic-embed-text` does the embeddings through Ollama on my own machine. ChromaDB holds the vectors. [FastMCP](https://github.com/jlowin/fastmcp) exposes four tools so Claude Code can search the whole thing in the middle of a session.

This is the build log. The auth pivot that started it, the real code for each layer, and two failures from getting it into Docker.

## The pivot: PRAW was a dead end

The stub said PRAW. PRAW is dead for this. Reddit closed self-service API access in November 2025, so registering an OAuth app and pulling your own saved items the documented way is no longer on the table. The wireframe inherited an assumption that had already stopped being true.

What still works is the oldest trick on the site. old.reddit.com serves JSON for almost any listing if you append `.json`, and if you send it your logged-in `reddit_session` cookie, it serves your private listings too, including `/user/<username>/saved.json`. No app registration, no OAuth dance, just the cookie the browser already has.

So `lib/reddit.py` is a small authenticated JSON client. The cookie comes from `.env` (gitignored), and the one detail worth calling out is the error handling:

```python
headers = {
    "Cookie": f"reddit_session={os.environ['REDDIT_SESSION_COOKIE']}",
    "User-Agent": os.environ["REDDIT_USER_AGENT"],
}

status: int | str = "network error"
for attempt in range(2):
    if attempt:
        time.sleep(_RETRY_DELAY)
    try:
        response = requests.get(
            url, params=merged_params, headers=headers, timeout=_TIMEOUT
        )
    except requests.RequestException:
        # Deliberately not chained/interpolated: the request (and any
        # exception repr) carries the session cookie.
        status = "network error"
        continue
    if response.status_code == 200:
        return response.json()
    status = response.status_code
```

That comment is the point. A `requests` exception can carry the full request in its repr, and the request carries the cookie. Chaining the original exception or interpolating it into a log line would leak a live credential into stderr. So the except clause throws the original away and reports a flat `"network error"`. It is the kind of thing that does not matter until the day someone pastes their logs into a GitHub issue.

Paging is just the `after` cursor, 100 items a page, capped at 50 pages. Which surfaces the real tradeoff: Reddit caps the saved listing at roughly the most recent 1000 items, cookie or not. There is no API trick around it, because there is no API. If I ever want the full history I have to request a [Reddit data export](https://www.reddit.com/settings/data-request) and backfill from the CSV, which I have not automated yet. For "search the stuff I saved recently," 1000 items is plenty.

## Embeddings, on my own hardware

The reason to run this locally instead of calling a hosted embedding API is the same reason I run a homelab at all. The content is mine, the inference is free after the electricity, and nothing about my reading history leaves the machine. [Ollama](https://ollama.com) already serves `nomic-embed-text`, so `lib/embeddings.py` just talks to it:

```python
base_url = os.environ.get("OLLAMA_BASE_URL", "http://localhost:11434")
model = os.environ.get("EMBED_MODEL", "nomic-embed-text")

client = ollama.Client(host=base_url)

if hasattr(client, "embed"):
    response = client.embed(model=model, input=texts)
    vectors = [list(v) for v in response.embeddings]
else:
    vectors = [
        list(client.embeddings(model=model, prompt=text)["embedding"])
        for text in texts
    ]
```

The `hasattr` branch is there because the Ollama Python client changed its embedding method across versions, and I did not want a client bump to silently break ingestion. Same text in, same vector out, regardless of which method the installed version exposes.

That `OLLAMA_BASE_URL` default of `localhost:11434` is correct on bare metal and a trap in Docker. More on that below.

## The vector store

ChromaDB holds the vectors. One persistent collection, cosine distance, opened or created on demand:

```python
client = chromadb.PersistentClient(path=chroma_path)
return client.get_or_create_collection(
    name=name,
    metadata={"hnsw:space": "cosine"},
)
```

I attach no embedding function to the collection on purpose. Chroma can call an embedder for you, but I already embed through Ollama, so the collection just stores vectors I hand it. That keeps the embedding path in one place instead of split between my code and Chroma's defaults.

Ingestion normalizes two Reddit types into one shape. A saved comment is a `t1` and a saved post is a `t3`, they carry different fields, so `tools/ingest.py` maps both into the same text-plus-metadata record and dedupes on the Reddit fullname so re-running ingestion skips what is already indexed:

```python
for child in get_saved_items(limit):
    data = child["data"]
    fullname = data["name"]

    if collection.get(ids=[fullname])["ids"]:
        skipped += 1
        continue

    text, metadata = _normalize(child.get("kind", ""), data)
    vector = embed(text)
    collection.add(
        ids=[fullname],
        embeddings=[vector],
        metadatas=[metadata],
        documents=[text],
    )
```

Re-running it is cheap and safe, which matters because the saved list grows and I want to top it up, not rebuild it every time.

## Wiring it as an MCP server

The point of all of this is to query it from inside Claude Code without leaving the session. That is what MCP is for, and FastMCP makes the server almost boring:

```python
from fastmcp import FastMCP

from tools.fetch_live import fetch_reddit_thread, search_reddit
from tools.ingest import ingest_saved
from tools.search_saved import search_saved

mcp = FastMCP("reddit-kb")

mcp.tool(search_saved)
mcp.tool(fetch_reddit_thread)
mcp.tool(search_reddit)
mcp.tool(ingest_saved)

if __name__ == "__main__":
    mcp.run()
```

Four tools. `search_saved` is the one that earns the project: it embeds the query with the same model the content was embedded with, runs a cosine search in Chroma, and returns the top matches with their metadata and similarity distance. `ingest_saved` does the pull, embed, and store loop on demand. The two `fetch_live` tools go straight to old.reddit for a thread or a search when I want something I never bothered to save.

Locally it runs over stdio, which is what most MCP clients expect when they spawn the server themselves. In Docker it serves over HTTP at `http://localhost:8000/mcp`, and Claude Code connects with one line:

```sh
claude mcp add --transport http reddit-kb http://localhost:8000/mcp
```

After that, "search my saves for the Proxmox ghost node fix" is a tool call, and the answer is a comment I bookmarked eight months ago and forgot the words to.

## What didn't work

Both of these are from getting the container to actually serve. Neither is exotic. Both cost me time anyway.

### Ollama on localhost does not exist inside the container

The first ingest inside Docker failed every embedding call. The cause was the `OLLAMA_BASE_URL` default I flagged earlier. Inside a container, `localhost` is the container, not the host, so `http://localhost:11434` points at an Ollama that is not running in there. Ollama is on the host.

The fix is to point the container at the host explicitly. On macOS under Docker Desktop or OrbStack, the host is reachable at `host.docker.internal`:

```
OLLAMA_BASE_URL=http://host.docker.internal:11434
```

On Linux that hostname is not provided by default, so it is either an `extra_hosts: ["host.docker.internal:host-gateway"]` entry in the compose file, or just the host's LAN or Tailscale IP. The lesson is the boring container one: `localhost` inside a container is a different machine than `localhost` in your shell, and anything the container depends on that runs on the host needs an address that crosses that boundary.

### A changed .env needs a recreate, not a restart

After fixing the URL I edited `.env` and ran `docker compose ... restart`, and the container came back with the old value. `restart` restarts the process inside the existing container, and `env_file` is read when the container is created, not when the process bounces. The new variable never got loaded.

The fix is `up -d` again, which recreates the container against the current `.env`:

```sh
docker compose -f docker/docker-compose.yml up --build -d
```

It is a small thing and it is in the compose file's own comments now, because I will absolutely forget it again otherwise. The vector store survives the recreate because it is bind-mounted to `./store/chroma` on the host, so recreating the container does not cost me the index.

## Key takeaways

1. **A label in a scaffold is not a fact.** The wireframe said PRAW because PRAW is the default, and the default was already dead. The cheap stub still did its job, it just did not get a vote on the implementation.
2. **When the API closes, the cookie is still there.** old.reddit serves your private listings as JSON if you send your `reddit_session`. It is capped at roughly 1000 saved items and that is a hard ceiling, but it needs no app registration and no OAuth.
3. **Treat the credential as radioactive in error paths.** A `requests` exception repr can carry the cookie. Throw the original away in the except clause instead of logging or chaining it, or you leak a live session into stderr.
4. **`localhost` means something different inside a container.** Host services need `host.docker.internal` or a real IP, and a changed `.env` needs `up -d`, not `restart`. Both are standard Docker, both still cost an afternoon.
5. **Local embeddings keep the data yours.** Running `nomic-embed-text` through Ollama means the index, the queries, and the reading history all stay on hardware I own. No per-call cost, and nothing to leak.

## Conclusion

Last time, reddit-kb was an interface: typed signatures, empty bodies, a stub labeled PRAW that turned out to be a dead end. This time it is a thing that runs. Saved items come in over a cookie, get embedded on my own GPU, land in a vector store I can point any MCP client at, and come back when I half-remember a comment from a year ago.

None of the individual pieces are clever. A JSON endpoint, a local embedding model, a vector database, and a thin MCP wrapper. The interesting part was the constraint. The documented way in was closed, so the build had to route around it, and routing around it is what made the whole thing local and mine in the first place. The repo is [on GitHub](https://github.com/lh1207/reddit-kb) if you want to point it at your own junk drawer.
