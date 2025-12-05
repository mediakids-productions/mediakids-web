/**
 * Site Configuration
 * ===================
 * ไฟล์นี้เก็บข้อมูลที่ใช้บ่อยทั่วทั้งเว็บไซต์
 * แก้ไขที่นี่ที่เดียว จะเปลี่ยนทั้งเว็บ
 * 
 * ตัวอย่างคำสั่งสำหรับ AI:
 * - "เปลี่ยนเบอร์โทรใน config เป็น xxx"
 * - "เปลี่ยน email ใน config"
 * - "เพิ่ม LINE ID ใน socialLinks"
 */

const SITE_CONFIG = {
    // ข้อมูลบริษัท
    company: {
        name: "MediaKids Academy",
        tagline: "Your Professional Teaching Journey",
        phone: "",  // เพิ่มเบอร์โทรที่นี่
        email: "", // เพิ่ม email ที่นี่
        address: "" // เพิ่มที่อยู่ที่นี่
    },

    // Social Media Links
    socialLinks: {
        facebook: "",
        line: "",
        instagram: "",
        youtube: ""
    },

    // SEO Settings
    seo: {
        defaultTitle: "MediaKids Academy - Global Teach Thailand",
        defaultDescription: "Your trusted partner in English education. Professional teaching programs in Thailand.",
        defaultImage: "assets/images/icons/logo.png"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
}
