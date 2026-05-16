# MediaKids Mac Owner Guide

คู่มือนี้สำหรับเจ้าของเว็บที่ใช้ Mac เครื่องหลักนี้กับ Codex

## สิ่งที่ต้องจำสั้น ๆ

- ใช้ Mac เครื่องนี้เป็นเครื่องหลัก
- วางรูปที่ `_incoming-images`
- Codex จะจัดรูป แปลงรูป แก้เว็บ preview และเปิด PR ให้
- ขึ้นเว็บจริงได้หลังคุณพิมพ์อนุมัติชัดเจนเท่านั้น

## โฟลเดอร์หลัก

Repo:

```text
/Users/thos000150/Documents/Work/MK web/mediakids-web
```

โฟลเดอร์รับรูป:

```text
/Users/thos000150/Documents/Work/MK web/_incoming-images
```

โฟลเดอร์เก็บต้นฉบับหลังทำงาน:

```text
/Users/thos000150/Documents/Work/MK web/_processed-images
```

## วิธีอัปภาพจาก Mac

1. เอารูปทั้งหมดไปวางใน `_incoming-images`
2. สั่ง Codex เช่น:

```text
เอารูปใน incoming ไปทำอัลบั้ม Songkran 2026 หน้า activity
```

Codex จะ:

- ตรวจรูป
- แปลงเป็นรูปสำหรับเว็บ
- ย้ายรูปต้นฉบับไป `_processed-images`
- แก้เว็บ
- เปิด preview
- เปิด PR
- รอคุณอนุมัติก่อนขึ้นจริง

## ถ้าสั่งจากมือถือ

บอกก่อนว่า:

```text
ทำจากมือถือ
```

ถ้ารูปน้อย ส่งในแชตได้  
ถ้ารูปเยอะ ให้เอารูปลง Google Drive หรือรอกลับมาวางใน `_incoming-images`

## ถ้าเปิดแชตใหม่

พิมพ์:

```text
ทำงานเว็บ MediaKids ต่อบน Mac เครื่องเดิม โปรดอ่าน AI_INSTRUCTIONS.md และ .agent/workflows/codex-handoff.md ก่อน ถ้ามี skill mediakids-webmaster ให้ใช้ skill นั้นด้วย งานทุกอย่างต้อง sync GitHub, ทำ branch, preview, PR และรออนุมัติก่อนขึ้นจริง
```

## ถ้าเปลี่ยนบัญชีเพราะโควต้าเต็ม

ใช้ Mac user เดิม แล้วเปิด repo เดิม จากนั้นพิมพ์ prompt เดียวกับหัวข้อเปิดแชตใหม่

ถ้า skill ไม่โหลดในบัญชีใหม่ ให้ Codex อ่านไฟล์ใน repo แทน:

- `AI_INSTRUCTIONS.md`
- `.agent/workflows/codex-handoff.md`
- `.agent/workflows/media-workflow.md`
- `.agent/workflows/ui-design-system.md`

## วิธีขอคู่มือ

- ถ้าขอ `คู่มือ` จะได้คู่มือทีมงาน
- ถ้าขอ `คู่มือแมค` จะได้คู่มือสำหรับ Mac เครื่องนี้

## วิธีแก้กฎทีหลัง

บอก Codex ได้เลย เช่น:

```text
แก้กฎเว็บหน่อย ต่อไปเวลาอัปภาพอยากให้ thumbnail เล็กกว่านี้
```

Codex ต้องเสนอแผนก่อนแก้กฎ แล้วค่อยแก้ skill/workflow ให้

## คำสั่งอนุมัติขึ้นเว็บ

ใช้คำที่ชัดเจน:

```text
อนุมัติ เอาขึ้นจริง
```

ถ้ายังไม่พิมพ์แบบนี้ Codex ต้องไม่ merge หรือ publish
