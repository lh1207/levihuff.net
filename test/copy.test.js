import { expect, it } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const copy = require("@11ty/recursive-copy");

it("copies nested assets with glob inclusions, exclusions, and dotfiles", async () => {
  const root = mkdtempSync(join(tmpdir(), "site-copy-"));
  try {
    const source = join(root, "source");
    const destination = join(root, "destination");
    mkdirSync(join(source, "nested"), { recursive: true });
    for (const name of ["keep.png", "keep.svg", "skip.txt", "private.png", ".hidden.svg"]) {
      writeFileSync(join(source, "nested", name), name);
    }
    await copy(source, destination, {
      dot: true,
      filter: ["**/*.{png,svg}", "!**/private.*"],
    });
    expect(readdirSync(join(destination, "nested")).sort()).toEqual([
      ".hidden.svg", "keep.png", "keep.svg",
    ]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
