import { describe, it, expect } from "vitest";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const projects = require("../src/_data/projects.json");
const experience = require("../src/_data/experience.json");
const skills = require("../src/_data/skills.json");
const navigation = require("../src/_data/navigation.json");
const site = require("../src/_data/site.json");
const infra = require("../src/_data/infra.js");

describe("projects.json", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it("every project has required string fields", () => {
    for (const p of projects) {
      expect(typeof p.title, `title missing on "${p.title}"`).toBe("string");
      expect(p.title.trim()).not.toBe("");
      expect(typeof p.description).toBe("string");
      expect(typeof p.image).toBe("string");
      expect(typeof p.imageAlt).toBe("string");
    }
  });

  it("every project has numeric image dimensions", () => {
    for (const p of projects) {
      expect(typeof p.imageWidth, `imageWidth on "${p.title}"`).toBe("number");
      expect(typeof p.imageHeight, `imageHeight on "${p.title}"`).toBe("number");
      expect(p.imageWidth).toBeGreaterThan(0);
      expect(p.imageHeight).toBeGreaterThan(0);
    }
  });

  it("any project with a non-null link also has a non-empty linkLabel", () => {
    for (const p of projects) {
      if (p.link !== null && p.link !== undefined) {
        expect(typeof p.linkLabel, `linkLabel missing on "${p.title}"`).toBe("string");
        expect(p.linkLabel.trim()).not.toBe("");
      }
    }
  });

  it("paragraphs is an array of {label, text} objects", () => {
    for (const p of projects) {
      expect(Array.isArray(p.paragraphs), `paragraphs on "${p.title}"`).toBe(true);
      for (const para of p.paragraphs) {
        expect(typeof para.label).toBe("string");
        expect(typeof para.text).toBe("string");
      }
    }
  });
});

describe("infra.js", () => {
  const SECTIONS = ["infrastructure", "homelab", "ai-ops"];
  const KINDS = ["project", "service"];

  it("is a non-empty array", () => {
    expect(Array.isArray(infra)).toBe(true);
    expect(infra.length).toBeGreaterThan(0);
  });

  it("every entry has the required string fields", () => {
    for (const e of infra) {
      for (const field of ["slug", "name", "role", "status", "summary"]) {
        expect(typeof e[field], `${field} on "${e.name || e.slug}"`).toBe("string");
        expect(e[field].trim()).not.toBe("");
      }
    }
  });

  it("slugs are unique and url-safe", () => {
    const slugs = infra.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("section and kind are from the allowed sets", () => {
    for (const e of infra) {
      expect(SECTIONS, `section on "${e.slug}"`).toContain(e.section);
      expect(KINDS, `kind on "${e.slug}"`).toContain(e.kind);
    }
  });

  it("stack is a non-empty array of strings", () => {
    for (const e of infra) {
      expect(Array.isArray(e.stack), `stack on "${e.slug}"`).toBe(true);
      expect(e.stack.length).toBeGreaterThan(0);
      for (const tech of e.stack) {
        expect(typeof tech).toBe("string");
        expect(tech.trim()).not.toBe("");
      }
    }
  });

  it("details is an array of {label, text} objects", () => {
    for (const e of infra) {
      expect(Array.isArray(e.details), `details on "${e.slug}"`).toBe(true);
      for (const d of e.details) {
        expect(typeof d.label).toBe("string");
        expect(typeof d.text).toBe("string");
        expect(d.label.trim()).not.toBe("");
        expect(d.text.trim()).not.toBe("");
      }
    }
  });

  it("links is an array of {label, url} objects with root-relative or https urls", () => {
    for (const e of infra) {
      expect(Array.isArray(e.links), `links on "${e.slug}"`).toBe(true);
      for (const link of e.links) {
        expect(typeof link.label).toBe("string");
        expect(link.label.trim()).not.toBe("");
        expect(typeof link.url).toBe("string");
        expect(link.url).toMatch(/^(\/|https:\/\/)/);
      }
    }
  });

  it("featured is a boolean on every entry", () => {
    for (const e of infra) {
      expect(typeof e.featured, `featured on "${e.slug}"`).toBe("boolean");
    }
  });

  it("no entry copy contains em dashes", () => {
    const text = JSON.stringify(infra);
    expect(text).not.toContain("—");
  });
});

describe("experience.json", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(experience)).toBe(true);
    expect(experience.length).toBeGreaterThan(0);
  });

  it("every entry has company, focusAreas, and description", () => {
    for (const e of experience) {
      expect(typeof e.company).toBe("string");
      expect(e.company.trim()).not.toBe("");
      expect(typeof e.focusAreas).toBe("string");
      expect(e.focusAreas.trim()).not.toBe("");
      expect(typeof e.description).toBe("string");
      expect(e.description.trim()).not.toBe("");
    }
  });
});

describe("skills.json", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
  });

  it("every group has a heading and non-empty items array", () => {
    for (const group of skills) {
      expect(typeof group.heading).toBe("string");
      expect(group.heading.trim()).not.toBe("");
      expect(Array.isArray(group.items)).toBe(true);
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it("every skill item has label and text strings", () => {
    for (const group of skills) {
      for (const item of group.items) {
        expect(typeof item.label).toBe("string");
        expect(typeof item.text).toBe("string");
        expect(item.label.trim()).not.toBe("");
        expect(item.text.trim()).not.toBe("");
      }
    }
  });
});

describe("navigation.json", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(navigation)).toBe(true);
    expect(navigation.length).toBeGreaterThan(0);
  });

  it("every nav item has a non-empty label and a root-relative url", () => {
    for (const item of navigation) {
      expect(typeof item.label).toBe("string");
      expect(item.label.trim()).not.toBe("");
      expect(typeof item.url).toBe("string");
      expect(item.url).toMatch(/^\//);
    }
  });

  it("contains the core pages", () => {
    const urls = navigation.map((n) => n.url);
    expect(urls).toContain("/");
    expect(urls).toContain("/blog/");
    expect(urls).toContain("/contact/");
    expect(urls).toContain("/projects/");
  });

  it("has no duplicate urls", () => {
    const urls = navigation.map((n) => n.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe("site.json", () => {
  it("has a non-empty name string", () => {
    expect(typeof site.name).toBe("string");
    expect(site.name.trim()).not.toBe("");
  });

  it("has a url starting with https://", () => {
    expect(typeof site.url).toBe("string");
    expect(site.url).toMatch(/^https:\/\//);
  });

  it("has an email containing @", () => {
    expect(typeof site.email).toBe("string");
    expect(site.email).toContain("@");
  });

  it("has a social object with github and linkedin urls", () => {
    expect(site.social).toBeDefined();
    expect(site.social.github).toMatch(/^https:\/\/github\.com\//);
    expect(site.social.linkedin).toMatch(/^https:\/\//);
  });
});
