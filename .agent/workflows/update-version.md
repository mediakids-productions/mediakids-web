---
description: Update cache busting version before publishing a PR
---

# Update Cache Version

Use this when CSS or JS changes must be forced fresh for visitors.

## Rule

Update cache version inside the task branch and PR. Do not push directly to `main`.

## Mac / Cross-Platform

From repo root:

```bash
python3 .agent/scripts/bump_version.py
```

With the bundled Codex Python on the main Mac:

```bash
/Users/thos000150/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 .agent/scripts/bump_version.py
```

Dry run:

```bash
python3 .agent/scripts/bump_version.py --dry-run
```

## Windows

The existing PowerShell helper can still be used:

```powershell
.\update-version.ps1
```

If PowerShell is unavailable, use Python:

```powershell
python .agent\scripts\bump_version.py
```

## Notes

- The version format is `YYYYMMDDHHMM`.
- The script updates only `js/version.js`.
- Include the version change in the same branch/PR as the CSS/JS change.
