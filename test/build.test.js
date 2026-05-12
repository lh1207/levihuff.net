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

  // CSS output check
  it("_site/css/styles.css is non-empty", () => {
    const cssPath = resolve(siteDir, "css/styles.css");
    expect(existsSync(cssPath)).toBe(true);
    const css = readFileSync(cssPath, "utf8");
    expect(css.trim().length).toBeGreaterThan(0);
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
