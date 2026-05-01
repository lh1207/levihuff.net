const tagSlug = (tag) =>
  tag.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "");

function dateReadable(date) {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return "";
  }
}

function dateIso(date) {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error(
      `[dateIso] Invalid date: "${date}". Fix the date: field in this post's frontmatter.`
    );
  }
  return d.toISOString();
}

function dateYMD(date) {
  if (!date) return "";
  try {
    return new Date(date).toISOString().split("T")[0];
  } catch (error) {
    return "";
  }
}

function safeCdata(str) {
  if (!str) return "";
  return str.replace(/\]\]>/g, "]]]]><![CDATA[>");
}

function readingTime(content) {
  if (!content) return "";
  const text = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text.split(" ").filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return minutes + " min read";
}

module.exports = { tagSlug, dateReadable, dateIso, dateYMD, safeCdata, readingTime };
