import { describe, it, expect, beforeAll } from "vitest";
import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

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
});
