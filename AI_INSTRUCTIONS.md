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
- `.agent/workflows/website-update-report.md` after website-facing work, if the owner wants a boss-ready report
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
8. Merge or publish only after the owner clearly approves. Plain Thai commands are valid, such as `อนุมัติงานระบบ Codex`, `อนุมัติงานหน้าเว็บ`, `อนุมัติงานรูป activity`, or `อนุมัติทุกงานที่พร้อม`.
9. Do not delete original images. Archive them outside the repo after processing.
10. Keep new UI aligned with the homepage and `curriculum/` Apple/Liquid Glass style.
11. For new website design, layout, or visual-direction work, generate a GPT Image 2 preview/mockup first when available, show the owner the visual direction, and wait for approval before editing website files. If GPT Image 2 is unavailable, create the best available visual mockup or ask the owner whether to proceed with a text-only design plan. Skip this for small text edits, bug fixes, or clearly specified content swaps.
12. After website-facing changes, ask whether the owner wants a boss-ready website update report. Do not ask for internal setup tasks such as skills, SSH, workflow docs, or handbooks unless the owner requests it.

## Clone and Continuity Rules

When someone clones this repository on another computer or opens it in another AI tool, all committed repository files come with the clone. This includes `AI_INSTRUCTIONS.md`, `.agent/workflows/*.md`, `docs/handbooks/*`, and website files.

Local Codex skills, such as `mediakids-webmaster`, are installed on the owner's Mac and are not part of a normal Git clone unless they have separately been installed on that machine. If the skill is missing, the AI must follow this repository's Markdown workflow files as the source of truth.

If workflow updates are only on a branch or PR, they are available only after checking out that branch, or after the PR is merged into `main`. A fresh clone of `main` contains only what has been merged into `main`.

## Main Mac Short Continuation

On the owner's main Mac, the workspace root may contain local continuity files outside this repo:

- `/Users/thos000150/Documents/Work/MK web/AGENTS.md`
- `/Users/thos000150/Documents/Work/MK web/MEDIAKIDS_CURRENT.md`

When the owner opens a new Codex chat, switches Codex/OpenAI account, hits a limit, or types only `ทำงานต่อ`, read those local files first if available. Then read this file and `.agent/workflows/codex-handoff.md`.

Before ending a meaningful work session on the main Mac, update `MEDIAKIDS_CURRENT.md` with the latest branch, what changed, whether changes were pushed, any PR/approval status, and what the owner needs to decide next.

## Preview Permission

After website-facing work is complete, do not automatically spend tokens opening or checking the preview. First ask the owner:

```text
งานเสร็จแล้วครับ ต้องการตรวจหน้าเว็บเอง หรือให้ผมตรวจ preview ให้ก่อน?
```

If the owner chooses to check personally, provide the local preview URL or page path and wait. If the owner asks the AI to check, then run the local preview and inspect the affected pages. Internal documentation/workflow-only changes do not need website preview unless the owner asks.

## Owner-Friendly Commands

The owner is not expected to use programmer terms such as branch, PR, merge, or deploy. Treat normal Thai instructions as valid when the intent is clear.

- `อนุมัติงานระบบ Codex` means approve only the Codex/workflow/docs PR, such as `setup-mediakids-workflow`.
- `อนุมัติงานหน้าเว็บ` means approve the website-facing PR that was just reviewed.
- `อนุมัติงานรูป activity` means approve the activity/photo update PR.
- `อนุมัติงาน popup` means approve the popup update PR.
- `อนุมัติทุกงานที่พร้อม` means approve all reviewed PRs that are explicitly ready.
- `อย่าเพิ่งขึ้นจริง`, `ยังไม่เอาขึ้น`, or `แค่ทำตัวอย่างให้ดู` means do not merge or publish.

If more than one PR could match a plain-language approval, stop and ask which work should go live. Do not guess.

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
- If the owner asks for a website update report, use `.agent/workflows/website-update-report.md` and save it under `docs/reports/`.
