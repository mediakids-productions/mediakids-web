# MediaKids Team Website Guide

คู่มือนี้สำหรับทีมงานหรือคนอื่นที่ช่วยแก้เว็บ MediaKids จากคอมเครื่องอื่น, Windows, Claude, Cursor, ChatGPT หรือโปรแกรมอื่นที่ไม่ใช่ Mac หลักของเจ้าของเว็บ

## เริ่มต้นทุกครั้ง

ให้วาง prompt นี้ในโปรแกรม AI ก่อนเริ่มงาน:

```text
คุณกำลังช่วยดูแลเว็บ MediaKids repo mediakids-productions/mediakids-web ก่อนทำงานให้ clone/pull main ล่าสุด แล้วอ่าน AI_INSTRUCTIONS.md และ .agent/workflows/codex-handoff.md ห้าม push เข้า main โดยตรง ให้สร้าง branch ใหม่ ทำ preview หรือ screenshot ส่งให้เจ้าของดูก่อน และเปิด PR เท่านั้น งาน UI ต้องยึดหน้าแรกกับ curriculum เป็น Apple/Liquid Glass style งานรูปต้องแปลงเป็น web-ready images ห้ามเอารูปต้นฉบับขนาดใหญ่ทั้งหมดขึ้น GitHub
```

## Clone Repo

ถ้ายังไม่มี repo:

```bash
git clone https://github.com/mediakids-productions/mediakids-web.git
cd mediakids-web
```

ถ้าใช้ SSH และบัญชี GitHub มีสิทธิ์แล้ว:

```bash
git clone git@github.com:mediakids-productions/mediakids-web.git
cd mediakids-web
```

## กฎสำคัญ

- ห้าม push เข้า `main` โดยตรง
- ต้อง pull/fetch main ล่าสุดก่อนทำงาน
- ต้องสร้าง branch ใหม่ทุกงาน
- ต้อง preview หรือส่ง screenshot ให้เจ้าของดูก่อน
- ต้องเปิด PR
- ต้องรอเจ้าของอนุมัติก่อน merge
- งาน UI ต้องยึดหน้าแรกและ `curriculum/`
- ห้ามเอารูปต้นฉบับใหญ่ทั้งหมดขึ้น GitHub ถ้าไม่ได้รับอนุญาต

## Workflow มาตรฐาน

1. อ่าน `AI_INSTRUCTIONS.md`
2. อ่าน `.agent/workflows/codex-handoff.md`
3. อ่าน workflow เฉพาะงาน เช่น media หรือ UI
4. สร้าง branch ใหม่
5. แก้เฉพาะไฟล์ที่เกี่ยวข้อง
6. เปิด preview หรือถ่าย screenshot
7. เปิด PR
8. ส่ง PR link และสิ่งที่ต้องตรวจให้เจ้าของ

## งานรูปภาพ

- แปลงรูปเป็น web-ready images ก่อน
- ใช้ `.webp` เป็นหลัก
- ทำ thumbnail และ display image
- ตั้งชื่อไฟล์แบบอังกฤษและเรียงเลข
- เก็บรูปเว็บใน `assets/images/galleries/YYYY/album-slug/`
- เก็บต้นฉบับไว้นอก repo หรือ cloud archive

## งาน UI

ดีไซน์ต้องเป็น light premium Apple/Liquid Glass:

- สีหลัก: `#0066cc`, `#007AFF`, `#5AC8FA`
- ข้อความหลัก: `#1d1d1f`
- ข้อความรอง: `#86868b`, `#6b7280`
- ฟอนต์: Inter / Noto Sans Thai / Apple system font
- card ควรมี border จาง, shadow เบา, radius ใหญ่
- ห้ามทำ section สีเข้มหรือคนละธีมโดยไม่ถาม

## ส่งงานกลับเจ้าของ

ต้องส่งข้อมูลนี้:

- Branch name
- PR link
- หน้าที่แก้
- Screenshot หรือ preview note
- รูป/วิดีโอที่ใช้
- สิ่งที่เจ้าของต้องเช็กก่อนอนุมัติ

## รายงานสรุปให้หัวหน้า

หลังจากงานที่แก้เว็บจริง เช่น รูป อัลบั้ม UI วิดีโอ popup ความปลอดภัย SEO หรือ performance ให้ถามเจ้าของเว็บก่อนว่า:

```text
ต้องการให้ทำรายงานสรุปการอัปเดตเว็บไซต์สำหรับส่งหัวหน้าไหมครับ?
```

ถ้าเจ้าของต้องการ รายงานควรเขียนภาษาคน อ่านง่าย ไม่เน้นโค้ด และสรุปว่า:

- อัปเดตอะไร
- หน้าไหนหรือส่วนไหนเปลี่ยน
- มีประโยชน์ต่อผู้ใช้งานหรือภาพลักษณ์อย่างไร
- ตรวจสอบอะไรแล้ว
- มีข้อเสนอแนะถัดไปไหม

ไม่ต้องถามทำรายงานสำหรับงานระบบภายใน เช่น ตั้งค่า GitHub, skill, workflow หรือคู่มือ เว้นแต่เจ้าของขอเอง
