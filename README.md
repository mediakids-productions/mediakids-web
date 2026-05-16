# MediaKids Academy Website

Static website for MediaKids Academy.

## Start Here

For AI/Codex work, read:

```text
AI_INSTRUCTIONS.md
.agent/workflows/codex-handoff.md
```

If using Codex on the main Mac, use the local skill:

```text
mediakids-webmaster
```

## Main Mac Paths

```text
/Users/thos000150/Documents/Work/MK web/mediakids-web
/Users/thos000150/Documents/Work/MK web/_incoming-images
/Users/thos000150/Documents/Work/MK web/_processed-images
```

## Project Structure

```text
index.html                         # Homepage
404.html
about/index.html
activity/index.html
blogs/
curriculum/index.html
programs/index.html
schools/index.html
jobs/index.html
faq/index.html
contact/index.html
assets/images/
css/style.css
js/components.js                   # Shared header/footer and basePath
js/script.js
js/version.js                      # Cache busting
js/holiday-popup-config.js         # Homepage popup config
js/holiday-popup.js                # Homepage popup renderer
.agent/workflows/
docs/handbooks/
```

## Safe Workflow

1. Sync latest GitHub `main`.
2. Create a branch.
3. Plan in Thai before editing.
4. Make scoped changes.
5. Preview locally.
6. Open a PR.
7. Merge/publish only after the owner says `อนุมัติ เอาขึ้นจริง`.

Never push directly to `main`.

## Useful Guides

- Team guide: `docs/handbooks/MediaKids-Team-Website-Guide.md`
- Mac owner guide: `docs/handbooks/MediaKids-Mac-Owner-Guide.md`
- UI rules: `.agent/workflows/ui-design-system.md`
- Image/media rules: `.agent/workflows/media-workflow.md`
- External worker rules: `.agent/workflows/external-worker.md`
- Popup workflow: `.agent/workflows/manage-popup.md`

## Image Workflow

On the main Mac, put new original photos in:

```text
/Users/thos000150/Documents/Work/MK web/_incoming-images
```

Web-ready images belong in the repo, usually:

```text
assets/images/galleries/YYYY/album-slug/
```

Originals should be archived outside the repo in:

```text
/Users/thos000150/Documents/Work/MK web/_processed-images
```
