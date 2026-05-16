---
description: Instructions for people, Windows computers, Claude, or other AI tools working outside the main Mac
---

# External Worker Guide

Use this when someone works from another computer, Windows, Claude, ChatGPT, Cursor, or any tool outside the main Mac Codex setup.

## Required Prompt

Paste this into the other AI/tool before work begins:

```text
คุณกำลังช่วยดูแลเว็บ MediaKids repo mediakids-productions/mediakids-web ก่อนทำงานให้ clone/pull main ล่าสุด แล้วอ่าน AI_INSTRUCTIONS.md และ .agent/workflows/codex-handoff.md ห้าม push เข้า main โดยตรง ให้สร้าง branch ใหม่ ทำ preview หรือ screenshot ส่งให้เจ้าของดูก่อน และเปิด PR เท่านั้น งาน UI ต้องยึดหน้าแรกกับ curriculum เป็น Apple/Liquid Glass style งานรูปต้องแปลงเป็น web-ready images ห้ามเอารูปต้นฉบับขนาดใหญ่ทั้งหมดขึ้น GitHub
```

## Clone

HTTPS:

```bash
git clone https://github.com/mediakids-productions/mediakids-web.git
```

SSH:

```bash
git clone git@github.com:mediakids-productions/mediakids-web.git
```

Use SSH only after the worker's GitHub account/key has access to the repo.

## Windows Paths

Do not use the main Mac paths on Windows. Use a local folder such as:

```text
C:\Users\[name]\Documents\mediakids-web
```

For image inbox:

```text
C:\Users\[name]\Pictures\mediakids-incoming-images
```

## External Worker Rules

- Pull latest `main` first.
- Create a branch.
- Do not push directly to `main`.
- Send preview screenshots or a preview link.
- Open a PR.
- Wait for owner approval before merge.
- Keep UI aligned with homepage and `curriculum/`.
- Do not commit original large photos unless the owner explicitly asks.
- After public website changes, ask the owner whether they want a boss-ready update report. Do not ask for internal setup tasks unless requested.

## Minimum Handoff Back To Owner

Every external worker must report:

- Branch name
- PR link
- Pages changed
- Preview screenshots or local preview notes
- Any image/media source used
- Anything the owner must check before approving
- Whether the owner requested a boss-ready update report
