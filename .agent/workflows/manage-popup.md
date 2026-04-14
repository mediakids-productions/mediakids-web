---
description: จัดการ popup หน้าแรกแบบมืออาชีพ เปิด ปิด หรือเปลี่ยน artwork โดยแก้เฉพาะ config และ asset
---

# Manage Homepage Popup

## เป้าหมาย

ระบบ popup หน้าแรกของโปรเจกต์นี้ต้องใช้งานง่ายในระยะยาว:

- เจ้าของสั่งได้ง่าย เช่น `ขึ้น popup รูปนี้`, `เปลี่ยน popup เป็นไฟล์นี้`, `ปิด popup`
- ตัว popup ต้องเป็นแบบ `artwork only`
- ห้ามมีกรอบ card ล้อมรูป
- มีแค่รูป popup และฉากหลังเบลอ
- ห้ามใช้ CSS crop hack หรือบิดสัดส่วนรูปในหน้าเว็บ
- ถ้ารูปต้นฉบับยังไม่พร้อมใช้เป็น popup ต้องเตรียม asset ให้พร้อมก่อนเปิดใช้งาน

---

## โครงสร้างไฟล์

| ไฟล์ | หน้าที่ |
|------|---------|
| `js/holiday-popup-config.js` | ไฟล์ตั้งค่าเดียวสำหรับเปิด/ปิด popup และชี้ไปยัง artwork ที่ใช้งานจริง |
| `js/holiday-popup.js` | renderer กลาง ห้ามใส่ campaign-specific logic |
| `css/style.css` | สไตล์ popup กลาง มีแค่ backdrop เบลอและ animation |
| `assets/images/popups/` | เก็บ popup-ready artwork |
| `index.html` | โหลด popup config และ popup renderer |

---

## หลักการทำงาน

1. `js/holiday-popup.js` ต้องเป็น generic renderer เสมอ
2. การเปิด/ปิด popup หรือเปลี่ยนรูป ต้องแก้ที่ `js/holiday-popup-config.js` เป็นหลัก
3. รูปที่ใช้จริงต้องเป็นไฟล์ที่พร้อมแสดงแล้ว
4. อย่าใช้วิธีครอปสดใน browser เพื่อซ่อนกรอบหรือเบลอที่ติดมากับรูป
5. ถ้ารูปที่เจ้าของให้มายังเป็น screenshot, artwork draft, หรือมี blur frame ติดมา ต้องเตรียมไฟล์ใหม่ก่อนเปิด

---

## รูปแบบ artwork ที่ถูกต้อง

ไฟล์ popup ที่พร้อมใช้งานควรเป็นแบบนี้:

- เป็นไฟล์ `.webp` หรือ `.png`
- ไม่มี card frame, mockup frame, หรือ blur frame ติดมาในไฟล์
- สัดส่วนเป็นโปสเตอร์แนวตั้งหรือแนวที่เหมาะกับ popup
- ขนาดเหมาะกับเว็บ เช่นกว้างประมาณ `700px` ถึง `1200px`
- ขนาดไฟล์ควรเล็กพอให้โหลดไว

ชื่อไฟล์ควรใช้ชื่อชัดเจน เช่น:

- `songkran-popup-poster.webp`
- `christmas-popup-2026.webp`
- `hiring-campaign-popup.webp`

---

## ขั้นตอนเมื่อเจ้าของบอกให้ "ขึ้น popup"

ให้ทำตามลำดับนี้:

1. ตรวจว่ารูปอยู่ใน `assets/images/popups/` แล้วหรือผู้ใช้เพิ่งให้ไฟล์มา
2. ตรวจว่ารูปนั้นเป็น popup-ready artwork จริง
3. ถ้ารูปยังมีกรอบ, เบลอ, mockup, หรือองค์ประกอบที่ไม่ควรมีในไฟล์จริง ให้เตรียม asset ให้ถูกก่อน
4. อัปเดต `js/holiday-popup-config.js`
5. ตั้งค่า:
   - `enabled: true`
   - `campaignId` ให้เป็น slug ใหม่ทุกแคมเปญ เพื่อ reset session dismissal
   - `imageSrc` ให้ชี้ไปไฟล์ artwork ใหม่
   - `imageAlt` ให้เป็นข้อความอธิบายสั้น ๆ
6. ถ้ามีการแก้ asset หรือ popup files ให้ bump version ใน `index.html`

ตัวอย่าง:

```javascript
window.HOLIDAY_POPUP_CONFIG = Object.freeze({
    enabled: true,
    campaignId: 'songkran-2026',
    imageSrc: 'assets/images/popups/songkran-popup-poster.webp',
    imageAlt: 'Happy Songkran greeting from MediaKids Academy',
    delayMs: 0
});
```

---

## ขั้นตอนเมื่อเจ้าของบอกให้ "ปิด popup"

ให้แก้แค่ config:

```javascript
window.HOLIDAY_POPUP_CONFIG = Object.freeze({
    enabled: false,
    campaignId: 'songkran-2026',
    imageSrc: 'assets/images/popups/songkran-popup-poster.webp',
    imageAlt: 'Happy Songkran greeting from MediaKids Academy',
    delayMs: 0
});
```

แนวทาง:

- ไม่ต้องลบ renderer
- ไม่ต้องลบ CSS
- ไม่ต้องลบ artwork เดิม
- ปิดด้วย `enabled: false` อย่างเดียว

---

## ขั้นตอนเมื่อเจ้าของบอกให้ "เปลี่ยนรูป popup"

1. เตรียม artwork ใหม่ใน `assets/images/popups/`
2. ตรวจว่ารูปพร้อมใช้งานจริง
3. เปลี่ยน `campaignId`
4. เปลี่ยน `imageSrc`
5. เปลี่ยน `imageAlt`
6. ถ้าแก้ไฟล์ popup หรือ asset ให้ bump version ใน `index.html`

---

## คำสั่งที่เจ้าของใช้สั่ง AI ได้ตรง ๆ

ตัวอย่างคำสั่ง:

- `เอารูปนี้ขึ้น popup หน้าแรก`
- `เปิด popup หน้าแรกด้วยไฟล์ songkran-popup-poster.webp`
- `ปิด popup หน้าแรก`
- `เปลี่ยน popup เป็นไฟล์ christmas-popup-2026.webp`
- `ตั้ง popup หน้าแรกให้ขึ้นทันทีเมื่อเข้าเว็บ`

เมื่อได้รับคำสั่งเหล่านี้ AI ควรเข้าใจว่า:

- ต้องใช้ระบบ popup กลางนี้
- ต้องแก้ `js/holiday-popup-config.js` ก่อน
- ต้องรักษา popup style แบบไม่มีกรอบ
- ต้องไม่ใส่ card shell รอบรูป

---

## สิ่งที่ห้ามทำ

- ห้ามย้าย logic campaign เข้า `js/holiday-popup.js`
- ห้ามทำ popup แบบมี card frame รอบรูป ถ้าเจ้าของไม่ได้ขอ
- ห้ามแก้เป็นวิธี crop สดใน CSS เพื่อกลบปัญหาภาพ
- ห้ามบิดสัดส่วนรูป
- ห้ามลบระบบ popup ทั้งชุดเวลาแค่ต้องการปิดชั่วคราว

---

## หมายเหตุสำคัญสำหรับ AI รอบถัดไป

ถ้าเจ้าของพูดประมาณนี้:

- `ขึ้น popup ให้หน่อย`
- `เอารูปนี้ขึ้นหน้าแรกเป็น popup`
- `เอา popup ออก`

ให้เปิด workflow นี้ก่อนและทำตามระบบนี้เป็นค่าเริ่มต้นทันที
