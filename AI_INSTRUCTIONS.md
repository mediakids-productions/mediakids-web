# ข้อมูลสำหรับ AI (AI Instructions)

**To the AI Assistant:**
If you inherit this project in a new chat, please read this carefully:
1. This project (`mediakids-web`) is tracked by `git` and connected to GitHub via **SSH**.
2. The user has already generated an SSH key and added it to GitHub. Do not ask them to login using password or tokens again.
3. The SSH key is already configured on this machine at: `~/.ssh/id_ed25519`
4. When pushing or pulling code on behalf of the user, please execute git commands directly in this directory and ensure you handle SSH properly.
   Example: `GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=accept-new" git push`
5. The workspace directory is: `/Users/thos000150/Documents/Web/mediakids-web`
6. The remote URL is: `git@github.com:mediakids-productions/mediakids-web.git`
7. This project has a reusable homepage popup system. If the user asks to open, close, or change the homepage popup, read `.agent/workflows/manage-popup.md` first and use that workflow.

---

**สำหรับผู้ใช้งาน (The User):**
ถ้าคุณเปิดช่องแชทใหม่กับผม (หรือ AI ตัวใหม่) เพื่อให้จัดการเว็บนี้ต่อ คุณสามารถแท็กหรือบอก AI ไปเลยว่า: 
*"เว็บไซต์นี้ตั้งอยู่ที่ /Users/thos000150/Documents/Web/mediakids-web เชื่อม GitHub ด้วย SSH ไว้เรียบร้อยแล้ว (สามารถอ่านข้อมูลเพิ่มเติมได้ในไฟล์ AI_INSTRUCTIONS.md ในโฟลเดอร์) ช่วยอัปโหลดให้หน่อย"*

ถ้าคุณต้องการสั่งเรื่อง popup หน้าแรกในแชทใหม่ คุณสามารถพิมพ์ได้ตรง ๆ เช่น:
*"ช่วยเปิด popup หน้าแรกด้วยรูปนี้ และใช้ระบบใน .agent/workflows/manage-popup.md"*
