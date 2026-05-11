import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.js"],
    exclude: [".claude/**", "node_modules/**", "_site/**"],
  },
});
