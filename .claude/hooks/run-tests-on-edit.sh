#!/bin/bash
# PostToolUse hook: run npm test when an Edit/Write touches a build-critical
# path. Anything else (docs, agent config) exits fast without testing.
# On failure, exit 2 feeds the test output back to Claude as a blocking error.
set -u

input=$(cat)
file_path=$(printf '%s' "$input" | node -e '
  let d = "";
  process.stdin.on("data", c => d += c).on("end", () => {
    try { process.stdout.write(JSON.parse(d).tool_input?.file_path || ""); }
    catch { /* no path, no test run */ }
  });
')

# Match both repo-relative and absolute forms of the build-critical paths.
case "$file_path" in
  src/*|test/*|eleventy.config.cjs|tailwind.config.js|package.json) ;;
  */src/*|*/test/*|*/eleventy.config.cjs|*/tailwind.config.js|*/package.json) ;;
  *) exit 0 ;;
esac

if ! cd "${CLAUDE_PROJECT_DIR:-}" 2>/dev/null; then
  echo "run-tests-on-edit: CLAUDE_PROJECT_DIR ('${CLAUDE_PROJECT_DIR:-unset}') is not a directory; cannot run the npm test gate for $file_path." >&2
  exit 2
fi

out=$(npm test 2>&1)
status=$?
if [ "$status" -ne 0 ]; then
  {
    echo "npm test failed after editing $file_path (exit $status). Last 40 lines:"
    printf '%s\n' "$out" | tail -40
  } >&2
  exit 2
fi
exit 0
