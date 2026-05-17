---
description: Safe handoff and operating rules for Codex or any AI working on MediaKids Web
---

# MediaKids Codex Handoff

## Default Mode

Use this workflow for all work on `mediakids-web`.

1. Read `AI_INSTRUCTIONS.md`.
2. Read the task-specific workflow:
   - UI: `.agent/workflows/ui-design-system.md`
   - Images/media: `.agent/workflows/media-workflow.md`
   - Boss-ready update report: `.agent/workflows/website-update-report.md`
   - Popup: `.agent/workflows/manage-popup.md`
   - Other computer or AI: `.agent/workflows/external-worker.md`
3. Run `git status --short --branch`.
4. Fetch the latest `main`.
5. Stop and ask if there are unknown local changes.
6. Create a task branch.
7. Explain the plan in Thai before editing.
8. Make the smallest useful changes.
9. After website-facing work, ask the owner whether they will check the page themselves or want the AI to inspect the preview. Do not open or inspect the preview until the owner answers.
10. Summarize the result in plain Thai.
11. If the task changed the public website, ask whether the owner wants a boss-ready update report.
12. Open a PR.
13. Wait for explicit approval before merging or publishing. Plain Thai owner commands are valid when the target work is clear.

## Boss-Ready Update Reports

After website-facing work, ask:

```text
ต้องการให้ผมทำรายงานสรุปการอัปเดตเว็บไซต์สำหรับส่งหัวหน้าไหมครับ?
```

Ask this for:

- New or updated page content
- Images, albums, galleries, videos, popup campaigns
- UI/UX changes
- Security, SEO, performance, accessibility, or broken-link fixes
- Website behavior visible to visitors

Do not ask this for internal setup work unless the owner requests it:

- Codex skills
- SSH/GitHub setup
- Workflow docs
- Handbooks
- Branch/PR maintenance

If the owner says yes, read `.agent/workflows/website-update-report.md`.

## Clone and Continuity

A normal Git clone brings down committed repository files only:

- website files
- `AI_INSTRUCTIONS.md`
- `.agent/workflows/*.md`
- docs and handbooks committed to the repo

Local Codex skills such as `mediakids-webmaster` do not come with a normal Git clone unless they have separately been installed on that machine. If the skill is missing, use the Markdown workflow files in this repo as the source of truth.

If a rule exists only on a branch or PR, another computer will see it only after checking out that branch, or after the PR is merged into `main`. A fresh clone of `main` contains only merged work.

## Preview Permission

For website-facing work, finish the implementation first, then ask:

```text
งานเสร็จแล้วครับ ต้องการตรวจหน้าเว็บเอง หรือให้ผมตรวจ preview ให้ก่อน?
```

- If the owner will check personally, provide the local preview URL or affected page path and wait.
- If the owner asks the AI to check, run the local preview and inspect the affected pages.
- Internal documentation/workflow-only work does not need a website preview unless the owner asks.

## Branch Naming

Use short, readable branch names:

- `setup-mediakids-workflow`
- `gallery-songkran-2026`
- `popup-songkran-2026`
- `ui-homepage-gallery`
- `video-activity-updates`

## Publishing Rule

Never push directly to `main`. Never merge without a clear owner command such as:

```text
อนุมัติ เอาขึ้นจริง
```

Owner-friendly commands are also valid:

- `อนุมัติงานระบบ Codex` means merge only the Codex/workflow/docs PR.
- `อนุมัติงานหน้าเว็บ` means merge the reviewed website-facing PR.
- `อนุมัติงานรูป activity` means merge the reviewed activity/photo PR.
- `อนุมัติงาน popup` means merge the reviewed popup PR.
- `อนุมัติทุกงานที่พร้อม` means merge all reviewed PRs that are explicitly ready.

Commands such as `อย่าเพิ่งขึ้นจริง`, `ยังไม่เอาขึ้น`, or `แค่ทำตัวอย่างให้ดู` mean do not merge or publish.

If approval is unclear, or if more than one PR could match the owner's words, keep the work in the PR and ask which work should go live. Do not guess.

## New Chat Continuity

On the main Mac, the owner wants to be able to type only:

```text
ทำงานต่อ
```

When that happens, first read the local workspace files if available:

- `/Users/thos000150/Documents/Work/MK web/AGENTS.md`
- `/Users/thos000150/Documents/Work/MK web/MEDIAKIDS_CURRENT.md`

Then read `AI_INSTRUCTIONS.md` and this handoff file, check Git status, fetch latest `main`, summarize the current state in plain Thai, and wait for the owner's next instruction. Do not edit files, preview, merge, publish, or deploy just because the owner said `ทำงานต่อ`.

For other computers or tools, use the longer prompt in `.agent/workflows/external-worker.md`.

Before ending a meaningful work session on the main Mac, update `/Users/thos000150/Documents/Work/MK web/MEDIAKIDS_CURRENT.md` with:

- latest branch
- what changed
- whether changes were pushed
- PR/approval status if known
- what the owner needs to decide next

## Mobile Commands

If the owner says they are working from mobile:

- Accept short natural-language instructions.
- Ask only for missing essentials: page, album name, source of images, and publish intent.
- For small image sets, attached files are OK.
- For large sets, use the Mac inbox or a Google Drive folder.
- Always preview before PR.

## GitHub Access

The main Mac may already have GitHub SSH configured. If the current clone uses HTTPS and push/PR fails, do not guess credentials. Ask the owner whether to switch remote to SSH:

```text
git@github.com:mediakids-productions/mediakids-web.git
```

External workers must set up their own GitHub access and work through PRs.
