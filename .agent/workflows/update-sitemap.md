---
description: Update sitemap and SEO files when creating new pages
---

# Update Sitemap Workflow

เมื่อสร้างหน้าใหม่หรืออัปเดตเนื้อหาสำคัญ ให้ทำตามขั้นตอนนี้:

## 1. เพิ่ม URL ใหม่ใน sitemap.xml

เปิดไฟล์ `sitemap.xml` และเพิ่ม URL ใหม่:

```xml
<url>
  <loc>https://www.mediakidsacademy.com/[path-to-new-page]/</loc>
  <lastmod>[YYYY-MM-DD]</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
```

**Priority Guidelines:**
- 1.0 = Homepage only
- 0.9 = Main pages (jobs, apply-now, about, teach-and-earn)
- 0.8 = Program pages (mep, iep, ecd, english-camps)
- 0.7 = Section indexes (curriculum/, blogs/, schools/, faq)
- 0.6 = Sub-pages (individual blogs, school pages, curriculum details)
- 0.5 = Internal pages (hr, consultants)

## 2. ตรวจสอบ _redirects (ถ้าจำเป็น)

ถ้าหน้าใหม่แทนที่หน้าเก่า หรือ URL เปลี่ยน ให้เพิ่ม redirect ใน `_redirects`:

```
/old-url/    /new-url/    301
```

## 3. Update Version (Optional)

// turbo
ถ้าต้องการ clear cache ให้รัน:
```powershell
.\update-version.ps1
```

## Files to Update

| ไฟล์ | ที่ตั้ง | หน้าที่ |
|------|--------|---------|
| sitemap.xml | Root | บอก Google ว่ามีหน้าอะไรบ้าง |
| _redirects | Root | Redirect URLs เก่าไปใหม่ |
| robots.txt | Root | บอก search engines ว่า crawl อะไรได้บ้าง |
