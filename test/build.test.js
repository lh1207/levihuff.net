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
});
