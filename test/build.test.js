import { describe, it, expect, beforeAll } from "vitest";
import { execSync } from "child_process";
import { existsSync, readFileSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const siteDir = resolve(root, "_site");

function findHtmlFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findHtmlFiles(full));
    } else if (entry.name.endsWith(".html")) {
      results.push(full);
    }
  }
  return results;
}

describe("build smoke test", () => {
  beforeAll(() => {
    execSync("npm run build", { cwd: root, stdio: "pipe" });
  }, 120_000);

  it("produces _site/index.html", () => {
    expect(existsSync(resolve(root, "_site/index.html"))).toBe(true);
  });

  it("produces _site/feed.xml", () => {
    expect(existsSync(resolve(root, "_site/feed.xml"))).toBe(true);
  });

  it("produces _site/sitemap.xml", () => {
    expect(existsSync(resolve(root, "_site/sitemap.xml"))).toBe(true);
  });

  it("produces _site/404.html", () => {
    expect(existsSync(resolve(root, "_site/404.html"))).toBe(true);
  });

  it("feed.xml has balanced CDATA sections", () => {
    const feed = readFileSync(resolve(root, "_site/feed.xml"), "utf8");
    const opens = (feed.match(/<!\[CDATA\[/g) || []).length;
    const closes = (feed.match(/\]\]>/g) || []).length;
    expect(opens).toBe(closes);
  });

  it("index.html contains core nav links", () => {
    const html = readFileSync(resolve(root, "_site/index.html"), "utf8");
    expect(html).toContain("/blog/");
    expect(html).toContain("/projects/");
    expect(html).toContain("/contact/");
  });

  it("sitemap.xml contains the site url", () => {
    const sitemap = readFileSync(resolve(root, "_site/sitemap.xml"), "utf8");
    expect(sitemap).toContain("levihuff.net");
  });

  // Page content coverage
  it("blog/index.html exists and contains nav and blog heading", () => {
    const html = readFileSync(resolve(siteDir, "blog/index.html"), "utf8");
    expect(html).toContain("/blog/");
    expect(html).toContain("/projects/");
    expect(html.toLowerCase()).toContain("blog");
  });

  it("projects/index.html exists and contains nav and projects heading", () => {
    const html = readFileSync(resolve(siteDir, "projects/index.html"), "utf8");
    expect(html).toContain("/blog/");
    expect(html).toContain("/projects/");
    expect(html.toLowerCase()).toContain("project");
  });

  it("contact/index.html exists and contains nav and contact heading", () => {
    const html = readFileSync(resolve(siteDir, "contact/index.html"), "utf8");
    expect(html).toContain("/blog/");
    expect(html).toContain("/contact/");
    expect(html.toLowerCase()).toContain("contact");
  });

  it("404.html contains nav links", () => {
    const html = readFileSync(resolve(siteDir, "404.html"), "utf8");
    expect(html).toContain("/blog/");
    expect(html).toContain("/projects/");
  });

  // Resume page is merged into About; the old URL must redirect
  it("resume/index.html is a redirect stub pointing at /about/", () => {
    const html = readFileSync(resolve(siteDir, "resume/index.html"), "utf8");
    expect(html).toMatch(/http-equiv=["']refresh["'][^>]*url=\/about\//i);
    expect(html).toMatch(/name=["']robots["'][^>]*noindex/i);
  });

  it("about/index.html carries the merged resume content", () => {
    const html = readFileSync(resolve(siteDir, "about/index.html"), "utf8");
    expect(html).toContain("CompTIA A+");
    expect(html).toContain("/files/Levi_Huff_Resume.pdf");
  });

  // Passthrough artifact checks — if these fail, a passthroughCopy was removed
  it("_site/robots.txt is present (passthrough)", () => {
    expect(existsSync(resolve(siteDir, "robots.txt"))).toBe(true);
  });

  it("_site/_headers is present (passthrough)", () => {
    expect(existsSync(resolve(siteDir, "_headers"))).toBe(true);
  });

  it("_site/humans.txt is present (passthrough)", () => {
    expect(existsSync(resolve(siteDir, "humans.txt"))).toBe(true);
  });

  // CSS output check — also asserts the production build ran (minified = 1-3 non-empty lines)
  it("_site/css/styles.css is the minified production build", () => {
    const cssPath = resolve(siteDir, "css/styles.css");
    expect(existsSync(cssPath)).toBe(true);
    const css = readFileSync(cssPath, "utf8");
    expect(css.trim().length).toBeGreaterThan(1000);
    const nonEmptyLines = css.split("\n").filter((l) => l.trim().length > 0);
    expect(nonEmptyLines.length, "CSS has too many lines — looks like a dev build, not minified").toBeLessThanOrEqual(5);
  });

  // Internal link integrity
  it("all root-relative href and src values resolve within _site/", () => {
    const htmlFiles = findHtmlFiles(siteDir);
    const broken = [];

    for (const file of htmlFiles) {
      const html = readFileSync(file, "utf8");
      const attrs = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(
        (m) => m[1]
      );
      for (const attr of attrs) {
        // Skip external, protocol-relative, fragment-only, and non-root-relative
        if (!attr.startsWith("/") || attr.startsWith("//")) continue;
        // Strip fragment and query string
        const urlPath = attr.split("#")[0].split("?")[0];
        if (!urlPath) continue;
        const candidate = resolve(siteDir, urlPath.replace(/^\//, ""));
        const exists =
          existsSync(candidate) ||
          existsSync(resolve(candidate, "index.html"));
        if (!exists) {
          broken.push(`${attr} in ${file.replace(siteDir, "")}`);
        }
      }
    }

    expect(broken, `Broken links:\n${broken.join("\n")}`).toHaveLength(0);
  });

  // Meta / OG tags
  it("index.html has a non-empty <title>", () => {
    const html = readFileSync(resolve(siteDir, "index.html"), "utf8");
    const match = html.match(/<title>([^<]*)<\/title>/i);
    expect(match, "no <title> found").toBeTruthy();
    expect(match[1].trim()).not.toBe("");
  });

  it("index.html has a meta description", () => {
    const html = readFileSync(resolve(siteDir, "index.html"), "utf8");
    expect(html).toMatch(/<meta\s[^>]*name=["']description["'][^>]*>/i);
  });

  it("index.html has og:title and og:description meta tags", () => {
    const html = readFileSync(resolve(siteDir, "index.html"), "utf8");
    expect(html).toMatch(/property=["']og:title["']/i);
    expect(html).toMatch(/property=["']og:description["']/i);
  });

  // Individual blog post pages
  it("at least one individual blog post page is built", () => {
    const blogDir = resolve(siteDir, "blog");
    const entries = readdirSync(blogDir, { withFileTypes: true });
    const postDirs = entries.filter(
      (e) => e.isDirectory() && existsSync(resolve(blogDir, e.name, "index.html"))
    );
    expect(postDirs.length).toBeGreaterThan(0);
  });

  // feed.xml has entries
  it("feed.xml contains at least one <entry> element", () => {
    const feed = readFileSync(resolve(siteDir, "feed.xml"), "utf8");
    expect(feed).toMatch(/<entry>/i);
  });

  it("blog post eager-loads first image and lazy-loads below-fold images", () => {
    const html = readFileSync(
      resolve(siteDir, "blog/owning-my-ai-memory/index.html"),
      "utf8"
    );
    const hero = html.match(/<img\b[^>]*owning-my-ai-memory-circuit-brain\.jpg[^>]*>/i);
    const graph = html.match(/<img\b[^>]*owning-my-ai-memory-vault-graph\.webp[^>]*>/i);
    const graphIndex = html.match(/<img\b[^>]*owning-my-ai-memory-vault-graph-index\.webp[^>]*>/i);
    expect(hero, "hero image not found").toBeTruthy();
    expect(graph, "vault graph image not found").toBeTruthy();
    expect(graphIndex, "vault graph index image not found").toBeTruthy();
    expect(hero[0]).toMatch(/\bfetchpriority="high"/);
    expect(hero[0]).not.toMatch(/\bloading="lazy"/);
    expect(graph[0]).toMatch(/\bloading="lazy"/);
    expect(graphIndex[0]).toMatch(/\bloading="lazy"/);
  });

  // img alt text
  it("no <img> element in built HTML is missing an alt attribute", () => {
    const htmlFiles = findHtmlFiles(siteDir);
    const missing = [];

    for (const file of htmlFiles) {
      const html = readFileSync(file, "utf8");
      const imgs = html.match(/<img\b[^>]*>/gi) || [];
      for (const img of imgs) {
        if (!/\balt=/i.test(img)) {
          missing.push(`${img.slice(0, 80)} in ${file.replace(siteDir, "")}`);
        }
      }
    }

    expect(missing, `<img> tags missing alt:\n${missing.join("\n")}`).toHaveLength(0);
  });

  // ── SEO regression guards ────────────────────────────────────────

  function isNoindexed(html) {
    return /<meta\s[^>]*name=["']robots["'][^>]*noindex/i.test(html);
  }

  function extractJsonLd(html) {
    return [...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
    )].map((m) => JSON.parse(m[1]));
  }

  it("every indexable page has title, description, canonical, and og tags", () => {
    const problems = [];
    for (const file of findHtmlFiles(siteDir)) {
      const html = readFileSync(file, "utf8");
      if (isNoindexed(html)) continue;
      const rel = file.replace(siteDir, "");

      const title = html.match(/<title>([^<]*)<\/title>/i);
      if (!title || !title[1].trim()) problems.push(`${rel}: missing <title>`);

      const checks = {
        "meta description": /<meta\s[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i,
        canonical: /<link\s[^>]*rel=["']canonical["'][^>]*href=["']https:\/\/[^"']+["']/i,
        "og:title": /<meta\s[^>]*property=["']og:title["'][^>]*content=["'][^"']+["']/i,
        "og:description": /<meta\s[^>]*property=["']og:description["'][^>]*content=["'][^"']+["']/i,
        "og:url": /<meta\s[^>]*property=["']og:url["'][^>]*content=["']https:\/\/[^"']+["']/i,
      };
      for (const [name, re] of Object.entries(checks)) {
        if (!re.test(html)) problems.push(`${rel}: missing ${name}`);
      }
    }
    expect(problems, `SEO tag gaps:\n${problems.join("\n")}`).toHaveLength(0);
  });

  it("no page title duplicates the | Levi Huff suffix", () => {
    const bad = [];
    for (const file of findHtmlFiles(siteDir)) {
      const html = readFileSync(file, "utf8");
      const title = html.match(/<title>([^<]*)<\/title>/i);
      if (title && /\|\s*Levi Huff\s*\|\s*Levi Huff/.test(title[1])) {
        bad.push(`${file.replace(siteDir, "")}: ${title[1]}`);
      }
    }
    expect(bad, `Duplicated title suffix:\n${bad.join("\n")}`).toHaveLength(0);
  });

  it("404.html is noindexed", () => {
    const html = readFileSync(resolve(siteDir, "404.html"), "utf8");
    expect(isNoindexed(html)).toBe(true);
  });

  it("index.html declares og:locale", () => {
    const html = readFileSync(resolve(siteDir, "index.html"), "utf8");
    expect(html).toMatch(/<meta\s[^>]*property=["']og:locale["'][^>]*content=["']en_US["']/i);
  });

  it("every JSON-LD block on every page parses as valid JSON", () => {
    const bad = [];
    for (const file of findHtmlFiles(siteDir)) {
      const html = readFileSync(file, "utf8");
      try {
        extractJsonLd(html);
      } catch (e) {
        bad.push(`${file.replace(siteDir, "")}: ${e.message}`);
      }
    }
    expect(bad, `Invalid JSON-LD:\n${bad.join("\n")}`).toHaveLength(0);
  });

  it("index.html has Person JSON-LD with knowsAbout and full sameAs", () => {
    const html = readFileSync(resolve(siteDir, "index.html"), "utf8");
    const person = extractJsonLd(html).find((b) => b["@type"] === "Person");
    expect(person, "no Person JSON-LD on homepage").toBeTruthy();
    expect(Array.isArray(person.knowsAbout)).toBe(true);
    expect(person.knowsAbout.length).toBeGreaterThan(0);
    expect(person.knowsAbout).toContain("Active Directory");
    expect(person.sameAs.length).toBeGreaterThanOrEqual(3);
  });

  it("every page carries the sitewide WebSite JSON-LD", () => {
    const missing = [];
    for (const file of findHtmlFiles(siteDir)) {
      const html = readFileSync(file, "utf8");
      // The resume redirect stub does not use base.njk
      if (!/<script type="application\/ld\+json">/.test(html)) {
        if (!isNoindexed(html)) missing.push(file.replace(siteDir, ""));
        continue;
      }
      const site = extractJsonLd(html).find((b) => b["@type"] === "WebSite");
      if (!site || !site.name || !site.url) missing.push(file.replace(siteDir, ""));
    }
    expect(missing, `Pages missing WebSite JSON-LD:\n${missing.join("\n")}`).toHaveLength(0);
  });

  it("a blog post has BlogPosting and BreadcrumbList JSON-LD", () => {
    const html = readFileSync(
      resolve(siteDir, "blog/tire-discounters-it-support/index.html"),
      "utf8"
    );
    const blocks = extractJsonLd(html);
    const post = blocks.find((b) => b["@type"] === "BlogPosting");
    expect(post, "no BlogPosting JSON-LD").toBeTruthy();
    expect(post.headline).toBeTruthy();
    expect(post.datePublished).toBeTruthy();
    const crumbs = blocks.find((b) => b["@type"] === "BreadcrumbList");
    expect(crumbs, "no BreadcrumbList JSON-LD").toBeTruthy();
    expect(crumbs.itemListElement.length).toBe(3);
  });

  it("a blog post emits article:tag OG meta from its tags", () => {
    const html = readFileSync(
      resolve(siteDir, "blog/tire-discounters-it-support/index.html"),
      "utf8"
    );
    const tags = [...html.matchAll(/<meta\s[^>]*property=["']article:tag["'][^>]*content=["']([^"']+)["']/gi)];
    expect(tags.length).toBeGreaterThan(0);
    expect(tags.map((m) => m[1])).toContain("mdt");
  });

  it("every infrastructure entry page has WebPage JSON-LD with about and breadcrumb", () => {
    const infraDir = resolve(siteDir, "infrastructure");
    const entries = readdirSync(infraDir, { withFileTypes: true }).filter((e) =>
      e.isDirectory()
    );
    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      const html = readFileSync(resolve(infraDir, entry.name, "index.html"), "utf8");
      const page = extractJsonLd(html).find((b) => b["@type"] === "WebPage");
      expect(page, `no WebPage JSON-LD in /infrastructure/${entry.name}/`).toBeTruthy();
      expect(page.name).toBeTruthy();
      expect(page.description).toBeTruthy();
      expect(Array.isArray(page.about)).toBe(true);
      expect(page.about.length).toBeGreaterThan(0);
      expect(page.breadcrumb["@type"]).toBe("BreadcrumbList");
    }
  });

  it("every sitemap URL resolves to a built, indexable page", () => {
    const sitemap = readFileSync(resolve(siteDir, "sitemap.xml"), "utf8");
    const urls = [...sitemap.matchAll(/<loc>https:\/\/levihuff\.net(\/[^<]*)<\/loc>/g)].map(
      (m) => m[1]
    );
    expect(urls.length).toBeGreaterThan(0);
    const problems = [];
    for (const url of urls) {
      const file = resolve(siteDir, url.replace(/^\//, ""), "index.html");
      if (!existsSync(file)) {
        problems.push(`${url}: no built page`);
        continue;
      }
      if (isNoindexed(readFileSync(file, "utf8"))) {
        problems.push(`${url}: noindexed page listed in sitemap`);
      }
    }
    expect(problems, `Sitemap problems:\n${problems.join("\n")}`).toHaveLength(0);
  });

  it("single-post tag pages are noindexed, multi-post tag pages are not", () => {
    // mdt appears on exactly one post; ai appears on several
    const single = readFileSync(resolve(siteDir, "tags/mdt/index.html"), "utf8");
    const multi = readFileSync(resolve(siteDir, "tags/ai/index.html"), "utf8");
    expect(isNoindexed(single)).toBe(true);
    expect(isNoindexed(multi)).toBe(false);
  });

  it("projects page inline data is jsonScript-escaped (no raw < in the serialized JSON)", () => {
    const html = readFileSync(resolve(siteDir, "projects/index.html"), "utf8");
    const match = html.match(/const projects = (.*);/);
    expect(match, "no `const projects = ...;` line found").toBeTruthy();
    const json = match[1];
    expect(json.length, "serialized projects data is empty").toBeGreaterThan(0);
    // jsonScript escapes every "<" to the \\u003c sequence, so a raw "<" is always a regression
    expect(json).not.toContain("<");
    // projects.json descriptions contain <strong>, so the escaped marker must
    // be present — this fails if the jsonScript filter is ever reverted to dump
    expect(json).toContain("\\u003c");
  });

  it("blog index inline posts data is jsonScript-escaped (no raw < in the array literal)", () => {
    const html = readFileSync(resolve(siteDir, "blog/index.html"), "utf8");
    const start = html.indexOf("const posts = [");
    expect(start, "no `const posts = [` found").toBeGreaterThan(-1);
    const end = html.indexOf("];", start);
    expect(end, "no closing `];` found after `const posts = [`").toBeGreaterThan(start);
    const region = html.slice(start + "const posts = [".length, end);
    expect(region.trim().length, "posts array literal is empty").toBeGreaterThan(0);
    // Any legitimate "<" in post data is escaped to the \\u003c sequence by
    // jsonScript, so a raw "<" inside the array literal is always a bug
    expect(region).not.toContain("<");
  });

  it("every indexable page has exactly one h1", () => {
    const bad = [];
    for (const file of findHtmlFiles(siteDir)) {
      const html = readFileSync(file, "utf8");
      if (isNoindexed(html)) continue;
      const count = (html.match(/<h1[\s>]/gi) || []).length;
      if (count !== 1) bad.push(`${file.replace(siteDir, "")}: ${count} h1 elements`);
    }
    expect(bad, `h1 problems:\n${bad.join("\n")}`).toHaveLength(0);
  });
});
