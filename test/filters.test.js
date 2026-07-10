import { describe, it, expect } from "vitest";
import {
  tagSlug,
  imageDimensions,
  dateReadable,
  dateIso,
  dateYMD,
  safeCdata,
  readingTime,
  jsonScript,
} from "../src/filters.js";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

describe("imageDimensions", () => {
  it("returns width and height for a site image path", () => {
    const dims = imageDimensions("/images/projects/proxmox-homelab.jpg", resolve(root, "src"));
    expect(dims).toEqual({ width: 1200, height: 800 });
  });
  it("returns null for a missing image", () => {
    expect(imageDimensions("/images/missing.jpg", resolve(root, "src"))).toBeNull();
  });
});

describe("tagSlug", () => {
  it("lowercases and hyphenates spaces", () => {
    expect(tagSlug("Hello World")).toBe("hello-world");
  });
  it("strips non-word characters", () => {
    expect(tagSlug("C++ & ASP.NET")).toBe("c-asp-net");
  });
  it("collapses multiple separators", () => {
    expect(tagSlug("sysadmin  --  linux")).toBe("sysadmin-linux");
  });
  it("trims leading and trailing hyphens", () => {
    expect(tagSlug("!test!")).toBe("test");
  });
  it("handles a plain single word", () => {
    expect(tagSlug("javascript")).toBe("javascript");
  });
});

describe("dateReadable", () => {
  it("returns a string containing the year", () => {
    // Use Date constructor with explicit year/month/day to avoid timezone shifts
    const result = dateReadable(new Date(2024, 0, 15)); // Jan 15 2024 local time
    expect(result).toContain("2024");
    expect(result).not.toBe("");
  });
  it("contains the month name for a known date", () => {
    expect(dateReadable(new Date(2024, 5, 1))).toContain("June");
  });
  it("formats YYYY-MM-DD frontmatter in UTC so the calendar day is stable", () => {
    expect(dateReadable("2026-06-23")).toBe("June 23, 2026");
    expect(dateReadable("2024-06-15")).toBe("June 15, 2024");
  });
  it("returns empty string for null", () => {
    expect(dateReadable(null)).toBe("");
  });
  it("returns empty string for undefined", () => {
    expect(dateReadable(undefined)).toBe("");
  });
  it("returns empty string for empty string", () => {
    expect(dateReadable("")).toBe("");
  });
});

describe("dateIso", () => {
  it("returns an ISO 8601 string for a valid ISO date", () => {
    const result = dateIso("2024-06-15");
    expect(result).toMatch(/^2024-06-15T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });
  it("returns empty string for null", () => {
    expect(dateIso(null)).toBe("");
  });
  it("returns empty string for empty string", () => {
    expect(dateIso("")).toBe("");
  });
  it("throws with [dateIso] prefix for an invalid date string", () => {
    expect(() => dateIso("not-a-date")).toThrow("[dateIso]");
  });
  it("throws for a date like 9999-99-99", () => {
    expect(() => dateIso("9999-99-99")).toThrow("[dateIso]");
  });
  it("accepts a Date object input and returns a valid ISO string", () => {
    const d = new Date(Date.UTC(2024, 5, 15)); // June 15 2024 UTC — timezone-safe
    expect(dateIso(d)).toBe("2024-06-15T00:00:00.000Z");
  });
});

describe("dateYMD", () => {
  it("returns YYYY-MM-DD for a UTC ISO date string", () => {
    expect(dateYMD("2024-06-01")).toBe("2024-06-01");
  });
  it("returns YYYY-MM-DD for another date", () => {
    expect(dateYMD("2025-12-31")).toBe("2025-12-31");
  });
  it("returns empty string for null", () => {
    expect(dateYMD(null)).toBe("");
  });
  it("returns empty string for empty string", () => {
    expect(dateYMD("")).toBe("");
  });
  it("output matches YYYY-MM-DD format", () => {
    expect(dateYMD("2024-03-07")).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
  it("accepts a Date object and returns YYYY-MM-DD", () => {
    const d = new Date(Date.UTC(2024, 5, 1)); // June 1 2024 UTC — timezone-safe
    expect(dateYMD(d)).toBe("2024-06-01");
  });
});

describe("safeCdata", () => {
  it("escapes the CDATA close sequence ]]>", () => {
    expect(safeCdata("foo]]>bar")).toBe("foo]]]]><![CDATA[>bar");
  });
  it("handles multiple occurrences", () => {
    expect(safeCdata("]]>]]>")).toBe("]]]]><![CDATA[>]]]]><![CDATA[>");
  });
  it("leaves safe strings unchanged", () => {
    expect(safeCdata("<p>Hello &amp; world</p>")).toBe("<p>Hello &amp; world</p>");
  });
  it("leaves a single ] or ]] unchanged", () => {
    expect(safeCdata("foo]bar")).toBe("foo]bar");
    expect(safeCdata("foo]]bar")).toBe("foo]]bar");
  });
  it("returns empty string for null", () => {
    expect(safeCdata(null)).toBe("");
  });
  it("returns empty string for empty string", () => {
    expect(safeCdata("")).toBe("");
  });
});

describe("readingTime", () => {
  it("returns '1 min read' for very short content", () => {
    expect(readingTime("Just a few words")).toBe("1 min read");
  });
  it("returns '1 min read' for exactly 200 words", () => {
    expect(readingTime(Array(200).fill("word").join(" "))).toBe("1 min read");
  });
  it("returns '2 min read' for 201 words", () => {
    expect(readingTime(Array(201).fill("word").join(" "))).toBe("2 min read");
  });
  it("strips HTML tags before counting words", () => {
    const html = "<p>" + Array(200).fill("word").join(" ") + "</p>";
    expect(readingTime(html)).toBe("1 min read");
  });
  it("returns empty string for null", () => {
    expect(readingTime(null)).toBe("");
  });
  it("returns empty string for empty string", () => {
    expect(readingTime("")).toBe("");
  });
  it("output always ends with 'min read'", () => {
    expect(readingTime(Array(600).fill("word").join(" "))).toMatch(/\d+ min read/);
  });
});

describe("jsonScript", () => {
  it("round-trips plain data through JSON.parse", () => {
    const input = { title: "Hello", tags: ["a", "b"], count: 3 };
    expect(JSON.parse(jsonScript(input))).toEqual(input);
  });
  it("round-trips an array of objects", () => {
    const input = [{ url: "/blog/foo/" }, { url: "/blog/bar/" }];
    expect(JSON.parse(jsonScript(input))).toEqual(input);
  });
  it("escapes < so the output contains no literal < character", () => {
    const output = jsonScript({ description: "a </script> tag" });
    expect(output).not.toContain("<");
  });
  it("serializes a string containing </script> without a literal </script>", () => {
    const output = jsonScript("close it: </script>");
    expect(output).not.toContain("</script>");
    expect(JSON.parse(output)).toBe("close it: </script>");
  });
});
