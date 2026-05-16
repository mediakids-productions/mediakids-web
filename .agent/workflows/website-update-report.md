---
description: Create boss-ready website update reports after public website changes
---

# Website Update Report Workflow

Use this only after website-facing changes. Do not use it for internal setup work such as Codex skills, SSH, workflow docs, branch maintenance, or handbooks unless the owner explicitly asks.

## When To Ask

After finishing a public website task, ask in Thai:

```text
ต้องการให้ผมทำรายงานสรุปการอัปเดตเว็บไซต์สำหรับส่งหัวหน้าไหมครับ?
```

If the owner says yes, ask only the missing essentials:

- Report audience or tone if not obvious
- Short or detailed version
- What topics to emphasize, such as images, UI, safety, SEO, speed, visitor experience, or specific pages
- Whether they want Markdown only or Word as well

## Report Style

The report should be clean, readable, and executive-friendly:

- Thai language by default
- No code-heavy details unless needed
- Explain what changed and why it matters
- Emphasize business/user value: trust, clarity, freshness, safety, speed, easier navigation, stronger presentation
- Use a clean Apple-like structure: clear title, short summary, sectioned bullets, light professional tone

## Suggested Structure

```text
รายงานสรุปการอัปเดตเว็บไซต์ MediaKids

1. ภาพรวม
2. สิ่งที่อัปเดต
3. หน้า/ส่วนที่ได้รับผลกระทบ
4. ประโยชน์ที่เกิดขึ้น
5. สิ่งที่ตรวจสอบแล้ว
6. ข้อเสนอแนะหรือขั้นตอนถัดไป
```

For image/gallery work, include:

- Album name
- Page where it appears
- Number of images
- Whether images were optimized
- How the update improves the page

For UI work, include:

- Section/page updated
- Design direction
- Desktop/mobile checks
- How it matches MediaKids style

For safety/performance/SEO work, include:

- What was improved
- Risk reduced
- Visitor or search-engine benefit
- What was tested

## Output Location

Save reports under:

```text
docs/reports/
```

Use filenames like:

```text
2026-05-17-website-update-summary.md
2026-05-17-website-update-summary.docx
```

Create Word only when the owner wants a sendable document. Markdown is useful for AI handoff and future editing.

## Important

- Reports are optional.
- Do not delay PR/publishing just because no report was requested.
- Do not invent changes. Report only what was actually done and verified.
- Keep the report understandable for a non-technical manager.
