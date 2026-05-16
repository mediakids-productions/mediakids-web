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
   - Popup: `.agent/workflows/manage-popup.md`
   - Other computer or AI: `.agent/workflows/external-worker.md`
3. Run `git status --short --branch`.
4. Fetch the latest `main`.
5. Stop and ask if there are unknown local changes.
6. Create a task branch.
7. Explain the plan in Thai before editing.
8. Make the smallest useful changes.
9. Preview the affected pages locally.
10. Summarize the result in plain Thai.
11. Open a PR.
12. Wait for explicit approval before merging or publishing.

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

If approval is unclear, keep the work in the PR.

## New Chat Continuity

When a chat is full or the owner changes account on the same Mac, ask them to paste:

```text
ทำงานเว็บ MediaKids ต่อบน Mac เครื่องเดิม โปรดอ่าน AI_INSTRUCTIONS.md และ .agent/workflows/codex-handoff.md ก่อน ถ้ามี skill mediakids-webmaster ให้ใช้ skill นั้นด้วย งานทุกอย่างต้อง sync GitHub, ทำ branch, preview, PR และรออนุมัติก่อนขึ้นจริง
```

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
