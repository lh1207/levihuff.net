#!/bin/bash
# PostToolUse hook: after an Edit/Write touches vault/, auto-commit just the
# vault/ changes so the wiki's history stays granular and doesn't get bundled
# into unrelated site commits. No-ops for edits outside vault/ or outside git.
set -u

input=$(cat)
file_path=$(printf '%s' "$input" | node -e '
  let d = "";
  process.stdin.on("data", c => d += c).on("end", () => {
    try { process.stdout.write(JSON.parse(d).tool_input?.file_path || ""); }
    catch { /* no path, nothing to commit */ }
  });
')

case "$file_path" in
  vault/*|*/vault/*) ;;
  *) exit 0 ;;
esac

if ! cd "${CLAUDE_PROJECT_DIR:-}" 2>/dev/null; then
  exit 0
fi

[ -d .git ] || exit 0

git add -- vault/ 2>/dev/null
git diff --cached --quiet -- vault/ || git commit -m "vault: auto-commit $(date '+%Y-%m-%d %H:%M')" -- vault/ >/dev/null 2>&1
exit 0
