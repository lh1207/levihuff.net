const { spawnSync } = require("node:child_process");

// Every known vulnerability blocks CI, including development dependencies.
// There are no advisory exceptions.
const severities = new Set(["info", "low", "moderate", "high", "critical"]);
const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

function evaluateAudit(report) {
  if (!isRecord(report) || report.error || report.auditReportVersion !== 2 || !isRecord(report.vulnerabilities)) {
    throw new Error("Invalid or unsupported npm audit report");
  }

  const vulnerabilities = report.vulnerabilities;
  const causes = new Map();
  function resolveCauses(name, visiting = new Set()) {
    if (visiting.has(name)) throw new Error(`Cyclic npm audit dependency: ${name}`);
    if (causes.has(name)) return causes.get(name);
    if (!Object.hasOwn(vulnerabilities, name)) throw new Error(`Missing npm audit dependency: ${name}`);
    const entry = vulnerabilities[name];
    if (!isRecord(entry) || entry.name !== name || !severities.has(entry.severity) || !Array.isArray(entry.via) || !entry.via.length) {
      throw new Error(`Invalid npm audit entry: ${name}`);
    }

    const next = new Set(visiting).add(name);
    const leaves = entry.via.flatMap((via) => {
      if (typeof via === "string") return resolveCauses(via, next);
      if (!isRecord(via) || !severities.has(via.severity) ||
          !["name", "dependency", "url", "range"].every((key) => typeof via[key] === "string" && via[key].length)) {
        throw new Error(`Invalid npm audit advisory: ${name}`);
      }
      return [via];
    });
    causes.set(name, leaves);
    return leaves;
  }

  const blocking = [];
  for (const name of Object.keys(vulnerabilities)) {
    resolveCauses(name);
    blocking.push(name);
  }
  return { blocking };
}

function main() {
  const result = spawnSync(process.platform === "win32" ? "npm.cmd" : "npm",
    ["audit", "--json"],
    { encoding: "utf8", maxBuffer: 16 * 1024 * 1024, timeout: 120_000 });
  if (result.error || ![0, 1].includes(result.status)) {
    throw new Error(`npm audit failed to run: ${result.error?.message || result.stderr || result.signal || result.status}`);
  }
  if (result.stderr) process.stderr.write(result.stderr);
  const report = JSON.parse(result.stdout);
  const { blocking } = evaluateAudit(report);
  if (result.status === 1 && !blocking.length) {
    throw new Error("npm audit exited unsuccessfully without findings");
  }
  if (blocking.length) {
    for (const name of blocking) console.error(JSON.stringify(report.vulnerabilities[name], null, 2));
    console.error(`Audit blocked: ${blocking.length} vulnerable package findings. No severity is exempt.`);
    process.exitCode = 1;
  } else {
    console.log("Audit passed: zero known vulnerabilities.");
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`Audit failed: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { evaluateAudit };
