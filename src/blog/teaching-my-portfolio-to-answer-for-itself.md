---
title: "Teaching my portfolio to answer for itself"
description: "How I rebuilt levihuff.net around one canonical identity, visible quick answers, linked JSON-LD, and a generated llms.txt without pretending any of it guarantees AI rankings."
date: 2026-08-17T12:00:00-04:00
tags: [ai, geo, aeo, eleventy, json-ld, llms-txt, seo]
layout: post.njk
thumbnail: /images/blog/teaching-my-portfolio-to-answer-for-itself.webp
---

![Code displayed on a monitor in a dark room with warm yellow light](/images/blog/teaching-my-portfolio-to-answer-for-itself.webp)

Photo by [Harshit Katiyar](https://unsplash.com/@harshitkatiyar?utm_source=levihuff.net&utm_medium=referral) on [Unsplash](https://unsplash.com/photos/computer-screen-displaying-lines-of-code-5sLNGV2EFRM?utm_source=levihuff.net&utm_medium=referral).

My portfolio already contained the facts I wanted people to find. My infrastructure work was on the infrastructure pages. My experience was on the About page. Projects had their own cards, blog posts had metadata, and the resume filled in the rest.

The problem was that those facts did not form one clear answer.

Ask a direct question like "What kind of IT work does Levi Huff do?" and a person could browse several pages and assemble the answer. A search engine, an AI retrieval system, or any other machine reader had to decide whether all of those fragments described the same person, which page was authoritative, and which wording was current.

I rebuilt the site so it can answer those questions more directly. The implementation has four parts: one structured source of truth, visible answer-first content, a linked [Schema.org](https://schema.org/) identity graph, and a generated `/llms.txt` guide. None of those pieces guarantees a citation or ranking. Together, they make the site more internally consistent and give machines fewer opportunities to guess.

## GEO and AEO without the sales pitch

Generative engine optimization and answer engine optimization are broad labels. They can quickly turn into a checklist of speculative files, duplicated summaries, and promises nobody can verify.

I used a narrower definition for this project:

> Make the site's important facts explicit, consistent, attributable, and easy to retrieve.

That definition gave me work I could test. It also kept the project useful even if a particular AI crawler never reads one of the new signals. Clear visible answers help people. Consistent structured data helps conventional search tooling. A generated content guide is useful to any agent or developer that chooses to read it.

The goal was not to write a second portfolio for robots. It was to make the existing portfolio stop contradicting or obscuring itself.

## One source of truth for one person

The first change was moving the core professional profile into `src/_data/site.json`. Eleventy makes that data available to every template, so the same values can drive visible pages, metadata, and structured data.

The file now owns facts such as:

- professional title and summary
- city, state, and country
- credentials
- technical topics
- profile image
- GitHub, LinkedIn, and Handshake identities

A simplified version looks like this:

```json
{
  "name": "Levi Huff",
  "jobTitle": "IT infrastructure professional",
  "location": {
    "city": "Washington Court House",
    "region": "Ohio",
    "country": "US"
  },
  "knowsAbout": [
    "Active Directory",
    "PowerShell",
    "Windows deployment",
    "Proxmox",
    "Docker"
  ]
}
```

The exact list will change as my work changes. The important decision is ownership: templates consume these facts instead of inventing their own versions.

That already caught a real inconsistency. `humans.txt` and the rest of the profile did not agree on my location. It was a small discrepancy that most visitors would never notice, but machine-readable identity is only useful when the machine-readable files describe the same identity. Moving the location into the shared data layer made the correct version explicit.

## Put direct answers on the visible page

Structured data cannot rescue vague page copy. If someone asks what I specialize in, the best answer should exist in the page a person can read.

I added a quick-answers section to the [About page](/about/#quick-answers) covering the questions the portfolio should answer without a scavenger hunt:

- Who is Levi Huff?
- What infrastructure work does he specialize in?
- What professional experience does he have?
- What education and certifications does he have?
- What roles is he looking for?
- Where can someone verify the work?

Those questions and answers live in `src/_data/answers.json`, not inside the template. The About page loops over the data and renders ordinary HTML. That matters for two reasons.

First, the answers are written for people. They are visible, linkable, and held to the same design and accessibility rules as the rest of the page. There is no hidden block of keyword copy that exists only for a crawler.

Second, the data file gives the answers a clear maintenance boundary. I can update a credential or role preference once without editing layout code. Tests also validate that every question and answer is non-empty and that the questions are distinct.

Answer-first content sounds like an SEO technique, but it is mostly a writing constraint. State the answer, then provide the evidence and detail around it. That is better for a recruiter scanning the page, a screen-reader user navigating headings, a search result trying to extract a passage, and an AI tool looking for a grounded response.

## Link the entity graph instead of duplicating it

The site already emitted JSON-LD, but individual structured-data blocks can still describe disconnected objects. A `Person` on the homepage, an author inside a `BlogPosting`, and an author inside an infrastructure case study are not automatically the same entity just because the visible name matches.

The fix was a stable identifier:

```text
https://levihuff.net/about/#person
```

Every page now receives a `WebSite` and `Person` graph from the base layout. Authored work refers back to that person with `@id` instead of defining another copy:

```json
{
  "@type": "BlogPosting",
  "author": {
    "@id": "https://levihuff.net/about/#person"
  },
  "isPartOf": {
    "@id": "https://levihuff.net/#website"
  }
}
```

The About page also declares a [`ProfilePage`](https://schema.org/ProfilePage) whose `mainEntity` points to the same person. Blog posts show a visible byline linked to `/about/`, so the human-facing authorship and structured authorship agree.

This is the part of the project that felt most like infrastructure work. The value is not any single property. It is referential integrity. One identifier ties the website, profile, posts, and case studies into a graph instead of leaving every page to create its own Levi-shaped record.

## Generate the AI-readable guide

I also added [`/llms.txt`](/llms.txt), a plain-text map of the site following the emerging [llms.txt proposal](https://llmstxt.org/). It introduces the portfolio, points to the authoritative profile and contact pages, lists technical work, includes the blog archive, and links the sitemap and Atom feed.

I deliberately treat it as a discovery aid, not a ranking switch. The proposal describes a concise Markdown guide that an LLM or agent can choose to read at inference time. It does not define how every model processes the file, and publishing one does not prove that a provider will use it.

The useful engineering decision was generating it instead of maintaining it by hand:

{% raw %}
```njk
{% for entry in infra %}
- [{{ entry.name }}]({{ site.url }}/infrastructure/{{ entry.slug }}/): {{ entry.summary }}
{% endfor %}

{% for post in collections.posts | reverse %}
- [{{ post.data.title }}]({{ site.url }}{{ post.url }}): {{ post.data.description }}
{% endfor %}
```
{% endraw %}

The template consumes the same infrastructure data and Eleventy post collection that build the visible site. When a project summary changes, the guide changes. When I publish a post, the guide gains the post. I do not have to remember a second content update.

This article is a useful test of that design. If the build is healthy, the post you are reading appears in `/llms.txt` automatically.

I also advertise the guide from the base layout:

```html
<link rel="alternate"
      type="text/plain"
      title="Levi Huff: AI-readable site guide"
      href="/llms.txt">
```

That does not force discovery, but it makes the relationship explicit in every normal page.

## Test the claims the site makes

The project added content and graph invariants to the Vitest suite. I did not want a future template cleanup to silently turn the entity graph back into disconnected records or leave the generated guide stale.

The tests now verify that:

- every JSON-LD block parses as valid JSON
- the homepage `Person` contains the expected canonical identifier and profile topics
- the About page contains visible direct answers and `ProfilePage` data
- blog posts and infrastructure pages refer to the same `Person` identifier
- every public page carries the canonical `WebSite` record
- `/llms.txt` is generated and contains real site content
- answer data follows its schema and does not repeat questions
- internal links still resolve in the production build

The finished branch passed 137 local tests and all 11 remote CI and security checks. The change touched 11 files because the work crossed data, templates, content, and validation. That spread is exactly why the tests matter. A structured-data project can look correct in one rendered page while still being inconsistent across the rest of the site.

I also built it in an isolated Git worktree. Another blog branch and untracked local material were already present in the main workspace, so the worktree gave this change its own branch and dependency state without asking me to clean up unrelated work first. The isolation was not part of GEO or AEO, but it kept the implementation boundary honest.

## What I would not claim

There is no before-and-after traffic graph in this post. The site has not gathered enough evidence to say these changes increased citations, applications, or search visibility. I am not going to turn a clean implementation into a result I cannot measure yet.

I also would not reduce the project to `/llms.txt`. A hand-written file that disagrees with the visible site would make the core problem worse. The stronger foundation is the shared data, visible answers, stable identifiers, and tests. The text guide sits on top of those layers and inherits their consistency.

The same caution applies to structured data. JSON-LD can state relationships clearly, but it does not make weak evidence strong. If I claim experience with a technology, the portfolio still needs a project, work example, or post that supports the claim.

## The real result is less ambiguity

The site now has a clearer answer to a basic question: who owns this work, and where is the authoritative description of that person?

A visitor can read the answer on the About page. A structured-data consumer can follow one identifier through the website, profile, posts, and infrastructure case studies. An agent that supports the proposal can read a concise `/llms.txt` map generated from live content. Tests make those relationships part of the build contract.

That is the useful version of AI optimization for a personal site. It is not a layer of magic metadata pasted over inconsistent content. It is information architecture with stricter accountability: one fact should have one owner, one person should have one identity, and every summary should lead back to evidence a human can inspect.
