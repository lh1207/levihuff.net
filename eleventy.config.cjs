const pluginRss = require("@11ty/eleventy-plugin-rss").default;
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const path = require("path");
const { tagSlug, imageDimensions, dateReadable, dateIso, dateYMD, safeCdata, readingTime } = require("./src/filters");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  // Serve images/fonts/files from source during `eleventy --serve` instead of
  // re-copying on every incremental rebuild (avoids an Eleventy 3.1.6 benchmark
  // race when multiple passthrough targets copy in parallel).
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  // Markdown with heading anchors; syntax-highlight plugin patches the
  // highlight function into this instance via amendLibrary before each build.
  const mdLib = markdownIt({ html: true, linkify: true, typographer: true })
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.linkInsideHeader({
        symbol: '#',
        placement: "after",
        renderAttrs: (slug) => ({
          "aria-label": `Permalink to ${slug.replace(/-/g, " ")}`,
        }),
      }),
      slugify: (s) => s.toLowerCase().trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    });
  eleventyConfig.setLibrary("md", mdLib);
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/fonts");
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
  eleventyConfig.addFilter("tagSlug", tagSlug);
  eleventyConfig.addFilter("imageDimensions", imageDimensions);

  // Date filters
  eleventyConfig.addFilter("dateReadable", dateReadable);
  eleventyConfig.addFilter("dateIso", dateIso);
  eleventyConfig.addFilter("dateYMD", dateYMD);

  // Escape CDATA close sequence in feed content so XML stays valid
  eleventyConfig.addFilter("safeCdata", safeCdata);

  // Reading time estimate
  eleventyConfig.addFilter("readingTime", readingTime);

  // Add width/height to <img> tags that lack intrinsic dimensions
  eleventyConfig.addTransform("img-dimensions", function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    const inputDir = path.join(__dirname, "src");
    return content.replace(/<img\b([^>]*)>/g, (match, attrs) => {
      if (/\bwidth=/.test(attrs) && /\bheight=/.test(attrs)) return match;
      const srcMatch = attrs.match(/\bsrc="([^"]+)"/);
      if (!srcMatch || !srcMatch[1].startsWith("/")) return match;
      const dims = imageDimensions(srcMatch[1], inputDir);
      if (!dims) return match;
      return `<img${attrs} width="${dims.width}" height="${dims.height}">`;
    });
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
