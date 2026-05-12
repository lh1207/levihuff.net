import { describe, it, expect } from "vitest";
import { createRequire } from "module";
import { readdirSync, readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve, extname } from "path";

const require = createRequire(import.meta.url);
const matter = require("gray-matter");

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const blogDir = resolve(root, "src/blog");
const imagesDir = resolve(root, "src/images");

const blogFiles = readdirSync(blogDir).filter((f) => extname(f) === ".md");

describe("blog post frontmatter", () => {
  it("finds at least one blog post", () => {
    expect(blogFiles.length).toBeGreaterThan(0);
  });

  it("every post has a non-empty title", () => {
    for (const file of blogFiles) {
      const { data } = matter(readFileSync(resolve(blogDir, file), "utf8"));
      expect(typeof data.title, `title missing in ${file}`).toBe("string");
      expect(data.title.trim(), `empty title in ${file}`).not.toBe("");
    }
  });

  it("every post has a valid date", () => {
    for (const file of blogFiles) {
      const { data } = matter(readFileSync(resolve(blogDir, file), "utf8"));
      expect(data.date, `date missing in ${file}`).toBeTruthy();
      expect(
        isNaN(new Date(data.date).getTime()),
        `invalid date in ${file}`
      ).toBe(false);
    }
  });

  it("every post has a non-empty description", () => {
    for (const file of blogFiles) {
      const { data } = matter(readFileSync(resolve(blogDir, file), "utf8"));
      expect(typeof data.description, `description missing in ${file}`).toBe(
        "string"
      );
      expect(data.description.trim(), `empty description in ${file}`).not.toBe(
        ""
      );
    }
  });

  it("every post specifies layout: post.njk", () => {
    for (const file of blogFiles) {
      const { data } = matter(readFileSync(resolve(blogDir, file), "utf8"));
      expect(data.layout, `layout missing in ${file}`).toBe("post.njk");
    }
  });

  it("every post has at least one tag", () => {
    for (const file of blogFiles) {
      const { data } = matter(readFileSync(resolve(blogDir, file), "utf8"));
      expect(Array.isArray(data.tags), `tags not an array in ${file}`).toBe(
        true
      );
      expect(data.tags.length, `no tags in ${file}`).toBeGreaterThan(0);
    }
  });

  it("every post has a non-empty thumbnail path", () => {
    for (const file of blogFiles) {
      const { data } = matter(readFileSync(resolve(blogDir, file), "utf8"));
      expect(typeof data.thumbnail, `thumbnail missing in ${file}`).toBe(
        "string"
      );
      expect(data.thumbnail.trim(), `empty thumbnail in ${file}`).not.toBe("");
    }
  });

  it("every post thumbnail file exists in src/images/", () => {
    for (const file of blogFiles) {
      const { data } = matter(readFileSync(resolve(blogDir, file), "utf8"));
      if (!data.thumbnail) continue;
      // thumbnail is root-relative e.g. /images/blog/foo.jpg → src/images/blog/foo.jpg
      const imgPath = resolve(root, "src", data.thumbnail.replace(/^\//, ""));
      expect(existsSync(imgPath), `missing image ${data.thumbnail} referenced in ${file}`).toBe(true);
    }
  });
});
