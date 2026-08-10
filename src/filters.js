const tagSlug = (tag) =>
  tag.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "");

const { existsSync, readFileSync } = require("fs");
const { resolve } = require("path");

function jpegDimensions(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    while (offset < buffer.length && buffer[offset] !== 0xff) offset += 1;
    while (offset < buffer.length && buffer[offset] === 0xff) offset += 1;
    if (offset >= buffer.length) return null;
    const marker = buffer[offset];
    offset += 1;
    if (marker === 0x00) continue;
    if (marker === 0xd8 || marker === 0xd9 || marker === 0x01) continue;
    if (marker >= 0xd0 && marker <= 0xd7) continue;
    if (offset + 2 > buffer.length) return null;
    const length = buffer.readUInt16BE(offset);
    if (length < 2 || offset + length > buffer.length) return null;
    if (
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf)
    ) {
      return {
        width: buffer.readUInt16BE(offset + 5),
        height: buffer.readUInt16BE(offset + 3),
      };
    }
    offset += length;
  }
  return null;
}

function webpDimensions(buffer) {
  const chunk = buffer.toString("ascii", 12, 16);
  if (chunk === "VP8X" && buffer.length >= 30) {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3),
    };
  }
  if (chunk === "VP8 " && buffer.length >= 30) {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }
  if (chunk === "VP8L" && buffer.length >= 25 && buffer[20] === 0x2f) {
    return {
      width: 1 + buffer[21] + ((buffer[22] & 0x3f) << 8),
      height: 1 + (buffer[22] >> 6) + (buffer[23] << 2) + ((buffer[24] & 0x0f) << 10),
    };
  }
  return null;
}

function imageBufferDimensions(buffer) {
  if (buffer.length >= 24 && buffer.toString("hex", 0, 8) === "89504e470d0a1a0a") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (buffer.length >= 10 && /^GIF8[79]a$/.test(buffer.toString("ascii", 0, 6))) {
    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }
  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    return jpegDimensions(buffer);
  }
  if (
    buffer.length >= 30 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return webpDimensions(buffer);
  }
  if (buffer.length >= 8 && buffer.readUInt32LE(0) === 0x00010000) {
    return {
      width: buffer[6] || 256,
      height: buffer[7] || 256,
    };
  }
  const svg = buffer.toString("utf8", 0, Math.min(buffer.length, 4096));
  if (/<svg\b/i.test(svg)) {
    const width = svg.match(/\bwidth=["']([\d.]+)(?:px)?["']/i);
    const height = svg.match(/\bheight=["']([\d.]+)(?:px)?["']/i);
    if (width && height) return { width: Number(width[1]), height: Number(height[1]) };
    const viewBox = svg.match(
      /\bviewBox=["'][-\d.]+[ ,]+[-\d.]+[ ,]+([\d.]+)[ ,]+([\d.]+)["']/i
    );
    if (viewBox) return { width: Number(viewBox[1]), height: Number(viewBox[2]) };
  }
  return null;
}

function imageDimensions(src, inputDir = "src") {
  if (!src || typeof src !== "string") return null;
  const rel = src.replace(/^\//, "");
  const full = resolve(inputDir, rel);
  if (!existsSync(full)) return null;
  try {
    return imageBufferDimensions(readFileSync(full));
  } catch {
    return null;
  }
}

function dateReadable(date) {
  if (!date) return "";
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    const opts = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    // YYYY-MM-DD frontmatter parses as UTC midnight; format in UTC so the
    // visible date matches the calendar day in datetime.
    if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
      opts.timeZone = "UTC";
    }
    return d.toLocaleDateString("en-US", opts);
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

// JSON-encode a value for embedding inside an inline <script> tag, escaping
// "<" so a "</script>" substring in the data can never close the tag early.
function jsonScript(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

module.exports = {
  tagSlug,
  imageDimensions,
  imageBufferDimensions,
  dateReadable,
  dateIso,
  dateYMD,
  safeCdata,
  readingTime,
  jsonScript,
};
