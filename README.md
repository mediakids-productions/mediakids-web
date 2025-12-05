# MediaKids Academy Website

## 📁 โครงสร้างโปรเจค

```
/global_teach_thailand/
├── index.html              # หน้าแรก
├── 404.html                # หน้า error
├── /about/index.html       # หน้า About Us
├── /programs/index.html    # หน้า Programs
├── /schools/index.html     # หน้า Schools
├── /jobs/index.html        # หน้า Jobs
├── /faq/index.html         # หน้า FAQ
├── /contact/index.html     # หน้า Contact
├── /curriculum/index.html  # หน้า Curriculum
├── /activity/index.html    # หน้า Activity
│
├── /assets/
│   └── /images/
│       ├── /hero/          # รูป slideshow หน้าแรก
│       ├── /partners/      # โลโก้พาร์ทเนอร์
│       ├── /posts/         # รูปบทความ
│       ├── /testimonials/  # รูป testimonial
│       ├── /journey/       # รูป journey steps
│       ├── /programs/      # รูปโปรแกรม
│       └── /icons/         # โลโก้, favicon
│
├── /css/
│   └── style.css           # CSS หลัก
│
└── /js/
    ├── config.js           # ⭐ ข้อมูลบริษัท (แก้ที่นี่)
    ├── components.js       # Header/Footer
    └── script.js           # Logic ต่างๆ
```

## 🎯 วิธีสั่งแก้ไข

### แก้ข้อมูลบริษัท
```
"เปลี่ยนเบอร์โทรใน config เป็น 02-xxx-xxxx"
"เพิ่ม LINE ID ใน config"
```

### แก้หน้าเว็บ
```
"แก้หน้า about - เปลี่ยนข้อความ..."
"เพิ่มรูปในหน้า programs"
"แก้หน้าแรก - เปลี่ยน hero text"
```

### แก้ Header/Footer (ทุกหน้า)
```
"แก้เมนู navigation"
"เปลี่ยนสีปุ่ม Apply Now"
"แก้ข้อความใน footer"
```

### แก้สี/ฟอนต์
```
"เปลี่ยนสีหลักเป็นสีเขียว"
"เปลี่ยน font เป็น..."
```

## ⚠️ ข้อควรระวัง
- **อย่าลบ** `/assets/` หรือ `/js/`
- **อย่าแก้** `components.js` โดยไม่จำเป็น (มีผลทุกหน้า)
- **Backup ก่อน** push ขึ้น GitHub
