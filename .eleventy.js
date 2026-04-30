const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  // Markdown with heading anchors; syntax-highlight plugin patches the
  // highlight function into this instance via amendLibrary before each build.
  const mdLib = markdownIt({ html: true, linkify: true, typographer: true })
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.linkInsideHeader({
        symbol: '<span aria-hidden="true">#</span><span class="sr-only">Permalink to this section</span>',
        placement: "after"
      }),
      slugify: (s) => s.toLowerCase().trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    });
  eleventyConfig.setLibrary("md", mdLib);
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/images");
  // src/css is no longer passthrough-copied — Tailwind builds directly to _site/css/
  eleventyConfig.addPassthroughCopy("src/files");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("src/humans.txt");

  // Create blog posts collection
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/**/*.md");
  });

  // Deduplicated, sorted list of all tags used across posts — used to
  // paginate /tags/<slug>/ pages and build the /tags/ index.
  eleventyConfig.addCollection("tagList", function (collectionApi) {
    const tagSet = new Set();
    collectionApi.getFilteredByGlob("src/blog/**/*.md").forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });
    return [...tagSet].sort();
  });

  // Shared slug helper — same transform used by tag permalinks and tag links.
  const tagSlug = (tag) => tag.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "");
  eleventyConfig.addFilter("tagSlug", tagSlug);

  // Add date filters
  eleventyConfig.addFilter("dateReadable", function (date) {
    if (!date) return "";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (error) {
      return "";
    }
  });

  eleventyConfig.addFilter("dateIso", function (date) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      throw new Error(`[dateIso] Invalid date: "${date}". Fix the date: field in this post's frontmatter.`);
    }
    return d.toISOString();
  });

  eleventyConfig.addFilter("dateYMD", function (date) {
    if (!date) return "";
    try {
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    } catch (error) {
      return "";
    }
  });

  // Escape CDATA close sequence in feed content so XML stays valid
  eleventyConfig.addFilter("safeCdata", function (str) {
    if (!str) return "";
    return str.replace(/\]\]>/g, "]]]]><![CDATA[>");
  });

  // Add reading time filter
  eleventyConfig.addFilter("readingTime", function (content) {
    if (!content) return "";
    const text = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const words = text.split(" ").filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return minutes + " min read";
  });

  // Add global currentYear for footer
  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());

  // Add current date for sitemap
  eleventyConfig.addGlobalData("buildDate", new Date().toISOString().split('T')[0]);

  // Set input and output directories
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
