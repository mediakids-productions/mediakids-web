---
description: Image, gallery, video, and popup media rules for MediaKids Web
---

# Media Workflow

## Image Inbox

Main Mac inbox:

```text
/Users/thos000150/Documents/Work/MK web/_incoming-images
```

Processed original archive:

```text
/Users/thos000150/Documents/Work/MK web/_processed-images
```

The inbox is only a temporary drop-off area. Keep it clean after each completed task.

## Gallery Output

Put web-ready gallery images in the repo:

```text
assets/images/galleries/YYYY/album-slug/
```

Use names like:

```text
songkran-2026-001-thumb.webp
songkran-2026-001-display.webp
```

For very large galleries, prefer a data file such as:

```text
assets/data/galleries/songkran-2026.json
```

instead of writing hundreds or thousands of image tags directly into HTML.

## Image Processing Rules

- Do not commit original large image files by default.
- Archive originals outside the repo.
- Use `.webp` for web-ready photos when tooling supports it.
- Create at least thumbnail and display sizes.
- Never upscale images.
- Preserve aspect ratio.
- Use high visual quality; originals remain the true backup.
- If the repo may become too large, stop and warn the owner before committing.

## Image Script

Use:

```text
.agent/scripts/prepare_images.py
```

Recommended command on the main Mac:

```bash
/Users/thos000150/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 .agent/scripts/prepare_images.py \
  --input "/Users/thos000150/Documents/Work/MK web/_incoming-images" \
  --output "assets/images/galleries/2026/songkran" \
  --archive "/Users/thos000150/Documents/Work/MK web/_processed-images/2026-05-17-songkran/originals" \
  --slug songkran-2026 \
  --archive-originals
```

External workers can use their own Python with Pillow installed.

## Video Embeds

YouTube:
- Convert standard watch/share URLs to embed URLs.
- Use responsive iframe wrappers.

Google Drive:
- Confirm the link is viewable by anyone with the link.
- Use a preview URL only when sharing permissions are correct.
- If permission is unclear, ask before publishing.

TikTok:
- Use official embed patterns when stable.
- If embed is heavy or unreliable, use a thumbnail/link fallback.

## Popup

For homepage popup work, read `.agent/workflows/manage-popup.md` first.

Rules:
- Change `js/holiday-popup-config.js` for open/close/change-image tasks.
- Keep `js/holiday-popup.js` as a generic renderer.
- Do not add a card shell around artwork unless the owner explicitly asks.
- Popup artwork must be ready to display; do not crop or distort in CSS to hide problems.
