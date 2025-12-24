---
description: Essential project knowledge for AI agents working on this website
---

# MediaKids Academy Website - Agent Quick Reference

## 🤝 วิธีทำงานกับเจ้าของโปรเจกต์

### กฎสำคัญที่ต้องปฏิบัติ:

1. **วางแผนก่อนทำงาน** - แจ้งแผนเป็นภาษาไทยให้เจ้าของเข้าใจก่อนเริ่มทุกครั้ง

2. **แบ่งงานเป็นเฟส** - ถ้างานต้องแก้ไขเยอะ ให้แยกเป็นเฟสย่อยๆ ไม่แก้ครั้งเดียวหลายจุดเกินไป (เพราะจะเกิดข้อผิดพลาดง่าย)

3. **ห้ามอัพ GitHub เอง** - ถามเจ้าของก่อนทุกครั้งก่อนจะ push ขึ้น GitHub

4. **สื่อสารเป็นภาษาไทย** - เจ้าของไม่เก่งเรื่องโค้ด สรุปให้เข้าใจง่าย

---

## 🔧 ระบบ basePath (สำคัญมาก - ทำให้ Navbar พัง!)

### ปัญหา:
เวลาสร้างหน้าใหม่ที่อยู่ลึกหลายระดับ (เช่น `blogs/ชื่อบล็อก/`) navbar จะพัง เพราะ path ไม่ถูกต้อง

### วิธีแก้:
**ทุกครั้งที่สร้างหน้าใหม่ที่ลึก 2 ระดับขึ้นไป ต้องเพิ่ม path ใน `js/components.js`**

```javascript
// Level 2 deep: ../../
else if (path.includes('/curriculum/sem1/') ||
    path.includes('/blogs/ชื่อบล็อกใหม่/') ||  // <-- เพิ่มตรงนี้
    path.includes('/teach-and-earn/apply/')) {
    basePath = '../../';
}
```

### ระดับความลึก:
| ระดับ | ตัวอย่าง | basePath |
|-------|----------|----------|
| 1 | `/about/`, `/jobs/`, `/blogs/` | `../` |
| 2 | `/blogs/ชื่อบล็อก/`, `/curriculum/sem1/` | `../../` |
| 3 | `/curriculum/sem1/ecd/` | `../../../` |

---

## 📦 ระบบ Cache Busting

### หลักการ:
เว็บนี้ใช้ระบบ Cache Busting แบบรวมศูนย์ผ่าน `js/version.js` และ Query String `?v=X.X.X`

### เวลาต้องอัพเดท Version (หลังแก้ไข CSS/JS):

**Step 1:** ไปที่ `js/version.js` เปลี่ยนเลข:
```javascript
const SITE_VERSION = '1.0.3';  // เปลี่ยนเลขนี้
```

**Step 2:** ค้นหาและเปลี่ยน Query Parameter ในทุกหน้า HTML:
```html
<!-- เปลี่ยนจาก -->
<link rel="stylesheet" href="css/style.css?v=1.0.2">

<!-- เป็น -->
<link rel="stylesheet" href="css/style.css?v=1.0.3">
```

### ⚠️ ข้อควรระวัง:
- **อย่าเปลี่ยน Path** - เปลี่ยนแค่เลขหลัง `?v=` เท่านั้น
- บางหน้าใช้ `./` บางหน้าใช้ `../` หรือ `../../` อย่าแก้ส่วนนี้
- ตรวจสอบให้ `style.css`, `components.js`, `script.js` ใช้เลขเดียวกัน

---

## 🏗️ โครงสร้างโปรเจกต์

```
f:\global_teach_thailand\
├── index.html              # หน้าแรก
├── css/style.css           # CSS หลัก
├── js/
│   ├── script.js           # Mega menu, scroll effects
│   ├── components.js       # Header/Footer + basePath
│   └── version.js          # เลขเวอร์ชัน
├── assets/images/
│   ├── general/            # รูปบริษัท (mk1-mk24.webp)
│   ├── camps/              # รูป English Camp
│   └── icons/              # Logo
└── blogs/                  # บล็อก (แต่ละบล็อกในโฟลเดอร์ของตัวเอง)
```

---

## 📝 สิ่งที่ต้องใส่ในทุกหน้าใหม่

### ใน `<head>`:
```html
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
<link rel="stylesheet" href="[basePath]css/style.css?v=1.0.2">
```

### ใน `<style>` (สำคัญ! แก้ scroll หนืด):
```css
html.lenis, html.lenis body {
    scroll-behavior: auto !important;
}
```

### ก่อนปิด `</body>`:
```html
<script src="[basePath]js/version.js?v=1.0.2"></script>
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script src="[basePath]js/components.js?v=1.0.2"></script>
<script src="[basePath]js/script.js?v=1.0.2"></script>

<!-- Lenis Smooth Scroll -->
<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
<script>
    const lenis = new Lenis({
        lerp: 0.1, orientation: 'vertical', gestureOrientation: 'vertical',
        smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
</script>
```

---

## 🎨 Design System (สไตล์ Apple)

| รายการ | ค่า |
|--------|-----|
| ฟอนต์ | Inter จาก Google Fonts |
| สีหลัก | `#0066cc` |
| สีข้อความ | `#1d1d1f` |
| สีข้อความรอง | `#86868b` |
| ระยะห่าง sections | `4rem` |
| h1 letter-spacing | `-0.03em` |
| h2 letter-spacing | `-0.02em` |
| รูปภาพบล็อก | กว้างล้นขอบ `calc(100% + 80px)` |
| ปุ่ม CTA | `border-radius: 980px` |

---

## ⚠️ ข้อผิดพลาดที่พบบ่อย

| ปัญหา | สาเหตุ |
|-------|--------|
| Navbar พัง | ลืมเพิ่ม path ใน `components.js` |
| Mega menu ไม่ทำงาน | ลืมใส่ AOS library |
| Scroll หนืด | ลืมใส่ Lenis CSS fix |
| รูปไม่ขึ้น | Path ผิด (ใช้ `../` แทน `../../`) |

---

## ✅ Checklist สร้างหน้าใหม่

- [ ] สร้างโฟลเดอร์และ `index.html`
- [ ] เพิ่ม basePath ใน `components.js`
- [ ] ใส่ AOS CSS และ JS ครบ
- [ ] ใส่ Lenis + CSS fix
- [ ] ใช้ path ที่ถูกต้อง (`../` หรือ `../../`)
- [ ] ใส่ `<div id="shared-header"></div>` และ `<div id="shared-footer"></div>`
- [ ] ทดสอบ navbar ทำงานปกติ

---

## 🔗 Workflow อื่นๆ

| คำสั่ง | หน้าที่ |
|--------|---------|
| `/create-blog` | สร้างบล็อกใหม่สไตล์ Apple |
| `/project-overview` | คู่มือนี้ |
