# MediaKids Web - AI Instructions

This file is the first handoff document for any AI agent working on the MediaKids Academy website.

## Project Identity

- Repository: `mediakids-productions/mediakids-web`
- Main Mac workspace: `/Users/thos000150/Documents/Work/MK web/mediakids-web`
- Main Mac image inbox: `/Users/thos000150/Documents/Work/MK web/_incoming-images`
- Main Mac processed-original archive: `/Users/thos000150/Documents/Work/MK web/_processed-images`
- Website type: static HTML/CSS/JS
- Primary shared files: `css/style.css`, `js/components.js`, `js/script.js`, `js/version.js`

## Mandatory Reading

Before editing, read the relevant workflow files:

- `.agent/workflows/codex-handoff.md` for the safe working process
- `.agent/workflows/media-workflow.md` for image, gallery, popup, and video work
- `.agent/workflows/ui-design-system.md` for UI changes
- `.agent/workflows/external-worker.md` when working from another computer, Windows, Claude, or a non-Codex tool
- `.agent/workflows/manage-popup.md` before any homepage popup work

If the local Codex skill `mediakids-webmaster` exists, use it first. If the skill is unavailable, this repo's workflow files are the source of truth.

## Non-Negotiable Rules

1. Communicate with the owner in Thai unless asked otherwise.
2. Plan before changing files, especially for UI, gallery, media, popup, or multi-file work.
3. Never push directly to `main`.
4. Sync from GitHub before starting work.
5. Create a branch for every task.
6. Preview the site locally before publishing work.
7. Open a PR for review.
8. Merge or publish only after the owner clearly approves, for example: `อนุมัติ เอาขึ้นจริง`.
9. Do not delete original images. Archive them outside the repo after processing.
10. Keep new UI aligned with the homepage and `curriculum/` Apple/Liquid Glass style.

## New Chat Prompt

If the owner starts a new chat or switches account on the same Mac, they can paste:

```text
ทำงานเว็บ MediaKids ต่อบน Mac เครื่องเดิม โปรดอ่าน AI_INSTRUCTIONS.md และ .agent/workflows/codex-handoff.md ก่อน ถ้ามี skill mediakids-webmaster ให้ใช้ skill นั้นด้วย งานทุกอย่างต้อง sync GitHub, ทำ branch, preview, PR และรออนุมัติก่อนขึ้นจริง
```

## Team / Other Computer Prompt

For another person, another computer, Windows, Claude, or another AI tool, use:

```text
คุณกำลังช่วยดูแลเว็บ MediaKids repo mediakids-productions/mediakids-web ก่อนทำงานให้ clone/pull main ล่าสุด แล้วอ่าน AI_INSTRUCTIONS.md และ .agent/workflows/codex-handoff.md ห้าม push เข้า main โดยตรง ให้สร้าง branch ใหม่ ทำ preview หรือ screenshot ส่งให้เจ้าของดูก่อน และเปิด PR เท่านั้น งาน UI ต้องยึดหน้าแรกกับ curriculum เป็น Apple/Liquid Glass style งานรูปต้องแปลงเป็น web-ready images ห้ามเอารูปต้นฉบับขนาดใหญ่ทั้งหมดขึ้น GitHub
```

## Manual Routing

- If someone asks for `คู่มือ`, provide the team guide: `docs/handbooks/MediaKids-Team-Website-Guide.md` or `.docx`.
- If the owner asks for `คู่มือแมค`, provide the Mac owner guide: `docs/handbooks/MediaKids-Mac-Owner-Guide.md` or `.docx`.
