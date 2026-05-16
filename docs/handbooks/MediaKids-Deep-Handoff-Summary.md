# MediaKids Deep Handoff Summary

วันที่จัดทำ: 17 พฤษภาคม 2026  
เอกสารนี้สรุปสิ่งที่เจ้าของเว็บต้องการ สิ่งที่ Codex ได้ทำให้แล้ว และวิธีกู้ระบบต่อถ้า Mac เครื่องหลักเสีย เปลี่ยนเครื่อง เปลี่ยนบัญชี หรือให้ AI/ทีมงานคนอื่นรับช่วงต่อ

## 1. ภาพรวมความต้องการของเจ้าของเว็บ

เจ้าของเว็บเป็นผู้ดูแลเว็บไซต์บริษัท MediaKids Academy และไม่ใช่โปรแกรมเมอร์ สิ่งที่ต้องการจาก Codex คือระบบทำงานที่ปลอดภัย ใช้ง่าย และลดภาระมากที่สุด โดยเฉพาะงานที่เกิดซ้ำ เช่น อัปภาพ เพิ่มอัลบั้ม แก้หน้าเว็บ เพิ่มวิดีโอ และคุมดีไซน์

สิ่งที่เจ้าของเว็บย้ำชัด:

- กลัว AI แก้เว็บพัง จึงต้องมี backup, branch, preview, PR และขออนุมัติก่อนขึ้นจริง
- ต้องการให้ Mac เครื่องนี้ทำงานลื่นที่สุด โดยไม่ต้องอธิบายซ้ำทุกครั้ง
- ถ้าเปิดแชตใหม่ เปลี่ยนบัญชีเพราะโควต้าเต็ม หรือสั่งจากมือถือ ต้องทำงานต่อเนื่องได้
- ถ้าให้ทีมงานหรือ AI อื่น เช่น Claude, Windows, คอมอื่น ช่วยทำ ต้องมีคู่มือและ prompt ที่บอกกฎชัดเจน
- งานรูปต้องรองรับจำนวนมาก หลายร้อยหรือหลายพันรูป โดยไม่ทำให้ GitHub repo บวมจนเสียระยะยาว
- รูปต้นฉบับต้องไม่หาย ไม่ถูกลบ และไม่ควรถูก commit เข้า GitHub เป็นค่าเริ่มต้น
- UI ต้องคุมให้เหมือนสไตล์ที่ชอบ คือหน้าแรกและหน้า `curriculum/` ที่เป็น Apple-inspired / Liquid Glass / clean / light premium
- ถ้าเพิ่มส่วนใหม่ในหน้าแรก ต้องใช้พื้นหลังและบรรยากาศเดียวกับหน้าแรก ไม่ใช่ section ที่ดูไม่กลืน
- ต้องรองรับวิดีโอจาก Google Drive, YouTube และ TikTok
- ต้องมีคู่มือ Word สำหรับเจ้าของเครื่อง Mac และคู่มือ Word สำหรับทีมงาน/คนอื่น

## 2. สถานะ repo และ GitHub

Repo:

```text
mediakids-productions/mediakids-web
```

Local path บน Mac เครื่องหลัก:

```text
/Users/thos000150/Documents/Work/MK web/mediakids-web
```

สถานะงานที่ทำ:

- สร้าง branch ชื่อ `setup-mediakids-workflow`
- ทำ local commit แล้ว:

```text
2048421 Set up MediaKids Codex workflow
```

- Push branch ขึ้น GitHub สำเร็จแล้ว
- ยังไม่ได้ merge เข้า `main`
- ยังไม่ได้ publish ขึ้นเว็บจริง

ลิงก์เปิด PR:

```text
https://github.com/mediakids-productions/mediakids-web/pull/new/setup-mediakids-workflow
```

หมายเหตุ: เครื่องนี้ไม่มี GitHub CLI (`gh`) จึงยังไม่ได้สร้าง PR ผ่าน terminal แต่ branch ถูก push แล้ว และเปิด PR จากลิงก์ได้ทันที

## 3. สิ่งที่ทำให้แล้วใน repo

### 3.1 ปรับไฟล์ handoff หลัก

ไฟล์:

```text
AI_INSTRUCTIONS.md
README.md
```

สิ่งที่เปลี่ยน:

- อัปเดต path ให้ตรงกับ Mac เครื่องนี้
- เพิ่มกฎหลักให้ AI อ่านก่อนทำงาน
- เพิ่ม prompt สำหรับเปิดแชตใหม่หรือเปลี่ยนบัญชี
- เพิ่ม prompt สำหรับทีมงาน/AI อื่น/คอมอื่น
- กำหนดว่า ถ้าถาม `คู่มือ` ให้ส่งคู่มือทีมงาน และถ้าถาม `คู่มือแมค` ให้ส่งคู่มือ Mac
- ย้ำว่าต้อง sync GitHub, branch, preview, PR และรออนุมัติก่อน merge/publish

### 3.2 เพิ่ม workflow files

เพิ่มไฟล์:

```text
.agent/workflows/codex-handoff.md
.agent/workflows/media-workflow.md
.agent/workflows/ui-design-system.md
.agent/workflows/external-worker.md
```

ปรับไฟล์เดิม:

```text
.agent/workflows/project-overview.md
.agent/workflows/update-version.md
.agent/workflows/update-sitemap.md
```

หน้าที่แต่ละไฟล์:

- `codex-handoff.md`: workflow ปลอดภัยหลักของ Codex/AI
- `media-workflow.md`: กฎรูป อัลบั้ม วิดีโอ และ popup
- `ui-design-system.md`: กฎ UI จากหน้าแรกและ curriculum
- `external-worker.md`: วิธีให้คนอื่นหรือ AI อื่นทำงานจากคอมอื่น
- `project-overview.md`: map ของโปรเจกต์แบบไม่สับสนกับ path เก่า
- `update-version.md`: วิธี bump cache version แบบ branch/PR ไม่ใช่ push main
- `update-sitemap.md`: ปรับให้ชี้ไป workflow version ใหม่

### 3.3 เพิ่ม scripts

เพิ่มไฟล์:

```text
.agent/scripts/prepare_images.py
.agent/scripts/bump_version.py
.agent/scripts/build_handbooks.py
```

หน้าที่:

- `prepare_images.py`: แปลงรูปเป็น web-ready `.webp`, ทำ thumb/display, สร้าง manifest, และย้ายต้นฉบับไป archive ได้
- `bump_version.py`: update `js/version.js` เป็น timestamp ปัจจุบันแบบ cross-platform
- `build_handbooks.py`: สร้าง Word docs จากคู่มือ Markdown

### 3.4 เพิ่มคู่มือ

เพิ่มไฟล์:

```text
docs/handbooks/MediaKids-Team-Website-Guide.md
docs/handbooks/MediaKids-Team-Website-Guide.docx
docs/handbooks/MediaKids-Mac-Owner-Guide.md
docs/handbooks/MediaKids-Mac-Owner-Guide.docx
```

ความหมาย:

- คู่มือทีมงาน ใช้เมื่อทีมงานหรือ AI อื่นขอ “คู่มือ”
- คู่มือ Mac ใช้เมื่อเจ้าของเครื่องขอ “คู่มือแมค”

## 4. สิ่งที่ทำให้แล้วนอก repo บน Mac เครื่องนี้

### 4.1 สร้าง Codex skill

สร้าง skill:

```text
/Users/thos000150/.codex/skills/mediakids-webmaster/
```

โครงสร้าง:

```text
SKILL.md
agents/openai.yaml
references/safe-edit.md
references/ui-design-system.md
references/image-gallery.md
references/media-embed.md
references/popup-workflow.md
references/handoff-new-chat.md
references/external-worker.md
scripts/prepare_images.py
```

หน้าที่:

- ให้ Codex บน Mac เครื่องนี้รู้วิธีทำงานกับเว็บ MediaKids โดยอัตโนมัติ
- บังคับ workflow: sync, branch, plan, preview, PR, owner approval
- แยก reference ย่อยเพื่อให้ Codex อ่านเฉพาะงานที่เกี่ยวข้อง
- รองรับงาน UI, รูป, วิดีโอ, popup, mobile, new chat, external worker

ข้อควรจำ:

- Skill นี้อยู่ local บน Mac เครื่องนี้ ไม่ได้อยู่ใน repo
- ถ้า Mac เครื่องนี้เสียหรือเปลี่ยนเครื่อง ต้องสร้าง skill ใหม่จากข้อมูลใน repo และเอกสารนี้
- ถึงไม่มี skill repo workflow files ยังพอให้ AI ตัวใหม่ทำงานต่อได้

### 4.2 สร้างโฟลเดอร์รูป

สร้างแล้ว:

```text
/Users/thos000150/Documents/Work/MK web/_incoming-images
/Users/thos000150/Documents/Work/MK web/_processed-images
```

ความหมาย:

- `_incoming-images`: วางรูปต้นฉบับสำหรับงานปัจจุบัน
- `_processed-images`: เก็บรูปต้นฉบับหลัง Codex แปลงและจัดเข้าระบบแล้ว

กฎ:

- `_incoming-images` เป็นถาดรับงานชั่วคราว ต้องสะอาดหลังจบงาน
- ห้ามลบต้นฉบับอัตโนมัติ
- ต้นฉบับควรถูกย้ายไป `_processed-images/[วันที่]-[ชื่องาน]/originals/`
- GitHub repo ควรเก็บเฉพาะรูปที่พร้อมใช้บนเว็บ

### 4.3 ตั้ง GitHub SSH

ทำแล้ว:

- สร้าง SSH key บน Mac เครื่องนี้
- เจ้าของเว็บนำ public key ไปเพิ่มใน GitHub แล้ว
- ทดสอบ SSH สำเร็จ
- เปลี่ยน remote จาก HTTPS เป็น SSH:

```text
git@github.com:mediakids-productions/mediakids-web.git
```

ผลลัพธ์:

- Mac เครื่องนี้ push branch ไป GitHub ได้แล้ว
- branch `setup-mediakids-workflow` ถูก push สำเร็จ

ข้อควรระวัง:

- ห้ามส่ง private key ให้ใคร
- ถ้าเปลี่ยนเครื่อง ให้สร้าง SSH key ใหม่แล้วเพิ่มใน GitHub อีกครั้ง

## 5. Workflow มาตรฐานที่ต้องรักษา

ทุกงานกับเว็บ MediaKids ควรทำตามนี้:

1. อ่าน skill `mediakids-webmaster` ถ้ามี
2. อ่าน `AI_INSTRUCTIONS.md`
3. อ่าน workflow ที่เกี่ยวข้อง
4. `git status --short --branch`
5. fetch/pull `main` ล่าสุด
6. ถ้ามีไฟล์ค้างที่ไม่รู้ที่มา ให้หยุดถาม
7. สร้าง branch ใหม่
8. อธิบายแผนภาษาไทยก่อนแก้
9. แก้เฉพาะไฟล์ที่เกี่ยวข้อง
10. เปิด local preview
11. ตรวจ desktop/mobile
12. สรุปให้เจ้าของดูแบบไม่ต้องอ่านโค้ด
13. เปิด PR
14. รอคำว่า `อนุมัติ เอาขึ้นจริง`
15. ค่อย merge/publish

## 6. Workflow รูปภาพ

เจ้าของเว็บทำแบบง่ายที่สุด:

1. วางรูปใน:

```text
/Users/thos000150/Documents/Work/MK web/_incoming-images
```

2. สั่ง Codex เช่น:

```text
เอารูปใน incoming ไปทำอัลบั้ม Songkran 2026 หน้า activity
```

Codex ต้อง:

- ตรวจจำนวนรูปและชนิดไฟล์
- แปลงเป็น `.webp`
- ทำ thumbnail และ display
- ตั้งชื่อไฟล์อังกฤษแบบเรียงเลข
- วางรูปเว็บไว้ใน repo:

```text
assets/images/galleries/YYYY/album-slug/
```

- สร้าง `gallery-manifest.json`
- ถ้ารูปเยอะมาก ใช้ data-driven gallery แทน HTML ยาว ๆ
- ย้ายต้นฉบับไป `_processed-images`
- เคลียร์ `_incoming-images`
- preview ก่อน PR

กฎสำคัญ:

- อย่า commit รูปต้นฉบับใหญ่ทั้งหมดเข้า GitHub
- ถ้า repo เสี่ยงใหญ่เกินไป ต้องเตือนก่อน
- ถ้ารูปจำนวนมากจริง ๆ อาจต้องใช้ Google Drive/CDN สำหรับ archive หรือภาพต้นฉบับ

## 7. Workflow UI

เจ้าของเว็บชอบดีไซน์:

- หน้าแรก
- หน้า `curriculum/`
- Apple-inspired
- Liquid Glass
- Light premium
- สะอาด หรู แต่ไม่หลุดธีมบริษัท

กฎ UI:

- หน้าแรกต้องใช้พื้นหลังเทาอ่อนถึงขาวแบบ `bg-hero-pattern`
- ใช้ soft blobs ฟ้า/เหลืองแบบจางเท่านั้น
- section ใหม่ในหน้าแรกต้องกลืนกับหน้าเดิม
- ห้ามทำ section สีเข้มหรือคนละธีมโดยไม่ถาม
- curriculum ใช้ glass card, blur, border จาง, shadow เบา
- ใช้สีหลัก `#0066cc`, `#007AFF`, `#5AC8FA`
- ข้อความหลัก `#1d1d1f`
- ข้อความรอง `#86868b`, `#6b7280`
- ฟอนต์ `Inter`, `Noto Sans Thai`, Apple system font, `Sukhumvit Set`

ถ้าต้องเพิ่ม UI ใหม่:

- ดู pattern หน้าเดิมก่อน
- เสนอแผนก่อน
- preview desktop/mobile
- ตรวจว่า text ไม่ล้น
- ห้าม card ซ้อน card โดยไม่จำเป็น

## 8. Workflow วิดีโอและ popup

วิดีโอ:

- YouTube: แปลงเป็น embed URL มาตรฐาน
- Google Drive: ต้องเช็กว่าลิงก์แชร์แบบ viewable ได้
- TikTok: ใช้ embed หรือ fallback เป็น thumbnail/link ถ้าโหลดหนักหรือไม่เสถียร

Popup:

- ใช้ระบบเดิม

```text
js/holiday-popup-config.js
js/holiday-popup.js
assets/images/popups/
```

- เปิด/ปิด/เปลี่ยนรูปผ่าน config เป็นหลัก
- ห้ามลบ renderer ถ้าแค่ปิด popup
- ห้าม crop หรือบิดรูปด้วย CSS เพื่อกลบปัญหารูป

## 9. Prompt สำคัญที่ต้องจำ

### 9.1 เปิดแชตใหม่หรือเปลี่ยนบัญชีบน Mac เครื่องเดิม

```text
ทำงานเว็บ MediaKids ต่อบน Mac เครื่องเดิม โปรดอ่าน AI_INSTRUCTIONS.md และ .agent/workflows/codex-handoff.md ก่อน ถ้ามี skill mediakids-webmaster ให้ใช้ skill นั้นด้วย งานทุกอย่างต้อง sync GitHub, ทำ branch, preview, PR และรออนุมัติก่อนขึ้นจริง
```

### 9.2 ให้ทีมงาน/Claude/AI อื่น/คอมอื่นทำ

```text
คุณกำลังช่วยดูแลเว็บ MediaKids repo mediakids-productions/mediakids-web ก่อนทำงานให้ clone/pull main ล่าสุด แล้วอ่าน AI_INSTRUCTIONS.md และ .agent/workflows/codex-handoff.md ห้าม push เข้า main โดยตรง ให้สร้าง branch ใหม่ ทำ preview หรือ screenshot ส่งให้เจ้าของดูก่อน และเปิด PR เท่านั้น งาน UI ต้องยึดหน้าแรกกับ curriculum เป็น Apple/Liquid Glass style งานรูปต้องแปลงเป็น web-ready images ห้ามเอารูปต้นฉบับขนาดใหญ่ทั้งหมดขึ้น GitHub
```

### 9.3 สั่งจากมือถือ

บอกก่อน:

```text
ทำจากมือถือ
```

จากนั้นสั่งสั้น ๆ ได้ เช่น:

```text
เพิ่มอัลบั้มงานวันเด็ก 80 รูป หน้า activity
```

Codex ต้องถามเฉพาะสิ่งจำเป็น เช่น รูปอยู่ที่ไหน ชื่ออัลบั้ม และจะลงหน้าไหน

## 10. ถ้า Mac เครื่องนี้เสียหรือเปลี่ยนเครื่องกะทันหัน

ให้ AI หรือคนใหม่ทำตามนี้:

1. เปิด GitHub repo:

```text
https://github.com/mediakids-productions/mediakids-web
```

2. clone repo:

```bash
git clone git@github.com:mediakids-productions/mediakids-web.git
```

ถ้ายังไม่มี SSH ให้ใช้ HTTPS ชั่วคราว:

```bash
git clone https://github.com/mediakids-productions/mediakids-web.git
```

3. อ่านไฟล์:

```text
AI_INSTRUCTIONS.md
.agent/workflows/codex-handoff.md
.agent/workflows/media-workflow.md
.agent/workflows/ui-design-system.md
.agent/workflows/external-worker.md
docs/handbooks/MediaKids-Mac-Owner-Guide.md
docs/handbooks/MediaKids-Team-Website-Guide.md
```

4. สร้างโฟลเดอร์ใหม่บนเครื่องใหม่:

Mac:

```text
/Users/[name]/Documents/Work/MK web/_incoming-images
/Users/[name]/Documents/Work/MK web/_processed-images
```

Windows:

```text
C:\Users\[name]\Pictures\mediakids-incoming-images
C:\Users\[name]\Pictures\mediakids-processed-images
```

5. สร้าง SSH key ใหม่บนเครื่องใหม่ และเพิ่ม public key ใน GitHub

6. สร้าง skill `mediakids-webmaster` ใหม่จาก repo workflow files ถ้าต้องใช้ Codex แบบลื่นเหมือนเครื่องเดิม

7. ห้าม push เข้า `main` ตรง ๆ ให้ทำ branch และ PR เสมอ

## 11. สิ่งที่ยังควรทำต่อ

งานที่เสร็จแล้วเป็นระบบพื้นฐาน ยังมีสิ่งที่ควรทำต่อ:

- เปิด PR จาก branch `setup-mediakids-workflow`
- review แล้ว merge เข้า `main` เมื่อเจ้าของอนุมัติ
- ทดสอบงานจริงชุดเล็ก เช่น อัปภาพ 3-5 รูปเข้าอัลบั้มทดลอง
- ติดตั้งหรือเตรียมเครื่องมือ render DOCX ถ้าต้องการ QA Word แบบภาพเต็ม เช่น LibreOffice
- ถ้าจะใช้ GitHub CLI ให้ติดตั้ง `gh` เพื่อให้ Codex เปิด PR ได้จาก terminal
- ถ้าจะใช้ external team บ่อย ให้ทดสอบคู่มือทีมงานกับคนจริง 1 รอบ

## 12. QA ที่ทำไปแล้ว

ตรวจแล้ว:

- Script รูป `prepare_images.py` ทำงานกับรูปตัวอย่าง 5 รูป
- ได้ thumbnail, display image และ `gallery-manifest.json`
- Preview หน้าแรกเปิดได้
- Preview หน้า `curriculum/` เปิดได้
- DOCX คู่มือเดิมเปิดโครงสร้างได้และไฟล์ไม่เสีย
- SSH GitHub authenticate สำเร็จ
- push branch ไป GitHub สำเร็จ

ข้อจำกัด:

- ยัง render DOCX เป็นภาพด้วย `render_docx.py` ไม่ได้ เพราะเครื่องนี้ไม่มี `soffice` / LibreOffice
- ยังไม่ได้เปิด PR ผ่าน CLI เพราะเครื่องนี้ไม่มี `gh`
- ยังไม่ได้ merge เข้า `main`

## 13. สรุปสั้นสำหรับ AI ตัวใหม่

เจ้าของเว็บต้องการระบบดูแลเว็บ MediaKids ที่ปลอดภัยและง่ายสำหรับคนไม่ใช่โปรแกรมเมอร์ งานสำคัญคืออัปภาพจำนวนมาก เพิ่มแกลเลอรี คุม UI ให้เหมือนหน้าแรกและ curriculum และเปิด PR/preview ก่อนขึ้นจริงเสมอ

งานที่ทำแล้วคือสร้าง branch `setup-mediakids-workflow`, เพิ่ม repo handoff docs, workflow docs, scripts, Word guides, local Codex skill `mediakids-webmaster`, image inbox/archive folders, และตั้ง GitHub SSH บน Mac เครื่องหลัก

หากรับงานต่อ ให้เริ่มจากอ่าน `AI_INSTRUCTIONS.md` และ `.agent/workflows/codex-handoff.md` แล้วทำงานผ่าน branch + preview + PR เท่านั้น ห้าม push หรือ merge เข้า `main` โดยไม่ได้รับอนุมัติจากเจ้าของ
