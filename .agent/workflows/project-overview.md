---
description: Essential project knowledge for AI agents working on MediaKids Web
---

# MediaKids Project Overview

Read `AI_INSTRUCTIONS.md` first. This file is a quick project map; detailed operating rules live in:

- `.agent/workflows/codex-handoff.md`
- `.agent/workflows/media-workflow.md`
- `.agent/workflows/ui-design-system.md`
- `.agent/workflows/website-update-report.md`
- `.agent/workflows/external-worker.md`
- `.agent/workflows/manage-popup.md`

## Main Mac Paths

```text
/Users/thos000150/Documents/Work/MK web/mediakids-web
/Users/thos000150/Documents/Work/MK web/_incoming-images
/Users/thos000150/Documents/Work/MK web/_processed-images
```

## Repo Structure

```text
index.html
about/
activity/
blogs/
curriculum/
css/style.css
js/components.js
js/script.js
js/version.js
assets/images/
docs/handbooks/
.agent/workflows/
```

## Safety Rules

- Speak Thai with the owner unless asked otherwise.
- Sync latest GitHub `main` before editing.
- Create a branch for every task.
- Plan before changing files.
- Preview before PR.
- Never push directly to `main`.
- Merge/publish only after the owner clearly says `อนุมัติ เอาขึ้นจริง`.
- After public website changes, ask whether the owner wants a boss-ready update report. Skip this for internal setup work unless requested.

## High-Risk Files

- `js/components.js`: shared header/footer and basePath logic; affects every page.
- `css/style.css`: global styling; check homepage and mobile when touched.
- `js/version.js`: cache busting version; update when CSS/JS changes need forced refresh.
- `sitemap.xml` and `_redirects`: update only when pages/URLs change.

## UI Direction

Use the homepage and `curriculum/` as visual references:

- Light Apple-inspired style
- Soft white/gray backgrounds
- MediaKids blue/yellow accents
- Liquid Glass cards for curriculum-style pages
- No unrelated dark, beige, brown, or heavy purple sections unless the owner asks

## Images

- Use `_incoming-images` only as a temporary inbox.
- Commit web-ready images, not original large images.
- Archive originals in `_processed-images`.
- Use `.agent/scripts/prepare_images.py` for repeatable conversion.

## Boss-Ready Reports

For public website changes, use `.agent/workflows/website-update-report.md` if the owner wants a report for their manager. Save reports in `docs/reports/`.
