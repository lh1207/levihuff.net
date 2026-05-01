import { describe, it, expect } from "vitest";
import {
  tagSlug,
  dateReadable,
  dateIso,
  dateYMD,
  safeCdata,
  readingTime,
} from "../src/filters.js";

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
