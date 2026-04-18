---
name: changelog
description: Update CHANGELOG.md with commits grouped by date. Run before merging.
---

Update the project's CHANGELOG.md at the repository root.

**Git log** (format `date|subject`, newest first):
!`git log --pretty=format:"%ad|%s" --date=short`

**Current CHANGELOG.md:**
!`cat CHANGELOG.md 2>/dev/null || echo "(no changelog yet)"`

Follow these rules exactly:

1. Parse the git log above into groups by date.
2. Skip any commit whose subject starts with "Merge".
3. **No changelog yet** — write a new CHANGELOG.md:
   - First line: `# Changelog`
   - Then one `## YYYY-MM-DD` section per date, newest first
   - Under each date, one `- <subject>` bullet per commit
4. **Changelog exists** — find the most recent `## YYYY-MM-DD` heading already in the file.
   Collect every commit whose date is strictly newer than that heading's date.
   For each new date, insert a `## YYYY-MM-DD` section with its bullets immediately after the `# Changelog` heading (newest date first).
   Do not alter any existing content below the insertion point.
5. Write the result to `CHANGELOG.md` at the repository root using the Write tool.
