import { describe, expect, it } from "vitest";
import { chmodSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { tmpdir } from "node:os";

const require = createRequire(import.meta.url);
const { evaluateAudit } = require("../scripts/audit-dependencies.cjs");
const auditScript = join(process.cwd(), "scripts", "audit-dependencies.cjs");

const EXEMPT_URL = "https://github.com/advisories/GHSA-vfj7-8cjw-p6xm";

function advisory(overrides = {}) {
  return {
    name: "braces",
    dependency: "braces",
    url: EXEMPT_URL,
    severity: "high",
    range: "<=3.0.3",
    ...overrides,
  };
}

function report(vulnerabilities = {}) {
  return { auditReportVersion: 2, vulnerabilities };
}

function vulnerability(name, severity, via) {
  return { name, severity, via };
}

describe("evaluateAudit", () => {
  it("accepts a clean report", () => {
    expect(evaluateAudit(report())).toEqual({ ignored: [], blocking: [] });
  });

  it("accepts low and moderate findings after validating their advisory shape", () => {
    expect(
      evaluateAudit(
        report({
          low: vulnerability("low", "low", [advisory({ severity: "low", range: "<1.0.0" })]),
          moderate: vulnerability("moderate", "moderate", [advisory({ severity: "moderate", range: "<2.0.0" })]),
        }),
      ),
    ).toEqual({ ignored: [], blocking: [] });
  });

  it("ignores a high indirect chain when every leaf is the exempt braces advisory", () => {
    const result = evaluateAudit(
      report({
        app: vulnerability("app", "high", ["middle"]),
        middle: vulnerability("middle", "high", ["braces"]),
        braces: vulnerability("braces", "high", [advisory()]),
      }),
    );

    expect(result.ignored).toEqual(expect.arrayContaining(["app", "middle", "braces"]));
    expect(result.ignored).toHaveLength(3);
    expect(result.blocking).toEqual([]);
  });

  it("blocks a graph when a package has an exempt and a non-exempt leaf", () => {
    const result = evaluateAudit(
      report({
        app: vulnerability("app", "high", ["braces"]),
        braces: vulnerability("braces", "high", [
          advisory(),
          advisory({
            url: "https://github.com/advisories/GHSA-other",
          }),
        ]),
      }),
    );

    expect(result.ignored).toEqual([]);
    expect(result.blocking).toEqual(expect.arrayContaining(["app", "braces"]));
    expect(result.blocking).toHaveLength(2);
  });

  it.each([
    ["lookalike URL", { url: "https://github.com/advisories/GHSA-vfj7-8cjw-p6xm/" }],
    ["wrong package", { name: "other-package" }],
    ["wrong dependency", { dependency: "other-package" }],
    ["wrong range", { range: "<3.0.3" }],
    ["wrong severity", { severity: "moderate" }],
  ])("blocks a high finding for an advisory with a %s", (_description, override) => {
    const result = evaluateAudit(
      report({ braces: vulnerability("braces", "high", [advisory(override)]) }),
    );

    expect(result.ignored).toEqual([]);
    expect(result.blocking).toEqual(["braces"]);
  });

  it("blocks a standalone critical finding", () => {
    expect(
      evaluateAudit(report({ package: vulnerability("package", "critical", [advisory({ name: "package" })]) })),
    ).toEqual({ ignored: [], blocking: ["package"] });
  });

  it("blocks a critical package even when its recursive leaf is exempt", () => {
    const result = evaluateAudit(
      report({
        app: vulnerability("app", "high", ["middle"]),
        middle: vulnerability("middle", "critical", ["braces"]),
        braces: vulnerability("braces", "high", [advisory()]),
      }),
    );

    expect(result.ignored).toEqual(["app", "braces"]);
    expect(result.blocking).toEqual(["middle"]);
  });

  function runCliWithFakeNpm(output, status = 0) {
    const directory = mkdtempSync(join(tmpdir(), "levihuff-audit-"));
    const fakeNpm = join(directory, "npm");
    writeFileSync(
      fakeNpm,
      `#!/usr/bin/env node\nprocess.stdout.write(${JSON.stringify(output)});\nprocess.exit(${status});\n`,
    );
    chmodSync(fakeNpm, 0o755);
    try {
      return spawnSync(process.execPath, [auditScript], {
        cwd: join(process.cwd()),
        env: { ...process.env, PATH: `${directory}:${process.env.PATH}` },
        encoding: "utf8",
      });
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  }

  it("returns success for an npm audit report containing only the accepted advisory", () => {
    const result = runCliWithFakeNpm(JSON.stringify(report({ braces: vulnerability("braces", "high", [advisory()]) })), 1);

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("Audit passed");
  });

  it("returns failure for an unrelated high finding", () => {
    const result = runCliWithFakeNpm(JSON.stringify(report({ braces: vulnerability("braces", "high", [advisory({ url: "https://github.com/advisories/GHSA-other" })]) })), 1);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("Audit blocked");
  });

  it.each([
    ["non-JSON output", "npm failed to return JSON", 0],
    ["transport failure", "", 2],
  ])("returns failure for %s", (_description, output, status) => {
    const result = runCliWithFakeNpm(output, status);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("Audit failed");
  });

  it.each([
    ["missing report", undefined],
    ["unsupported audit version", { auditReportVersion: 1, vulnerabilities: {} }],
    ["error report", { auditReportVersion: 2, error: "audit failed", vulnerabilities: {} }],
    ["missing vulnerabilities", { auditReportVersion: 2 }],
    ["malformed vulnerability", report({ braces: { name: "braces", severity: "high", via: [] } })],
    ["unknown reference", report({ app: vulnerability("app", "high", ["missing"]) })],
    ["cycle", report({ a: vulnerability("a", "high", ["b"]), b: vulnerability("b", "high", ["a"]) })],
  ])("throws for %s", (_description, input) => {
    expect(() => evaluateAudit(input)).toThrow();
  });
});
