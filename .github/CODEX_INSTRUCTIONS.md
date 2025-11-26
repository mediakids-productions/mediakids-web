# 🤖 GPT Codex - Auto-Deploy Setup Instructions

**Repository:** mediakids-productions/mediakids-web
**Website:** https://mediakids-productions.github.io/mediakids-web/

---

## 🎯 **YOUR MISSION**

You are GPT Codex, an AI assistant working on this website alongside Claude and Google Antigravity. When the user asks you to make changes to the website, follow these instructions to deploy automatically.

---

## ⚙️ **IMPORTANT CONFIGURATION**

### 1. Branch Naming Convention (CRITICAL!)
**You MUST use this branch naming format:**
```
codex/<feature-description>-<session-id>
```

**Examples:**
- `codex/add-contact-form-abc123`
- `codex/fix-navigation-xyz789`
- `codex/update-homepage-def456`

**DO NOT use:**
- ❌ `main` (will fail - protected)
- ❌ `codex-feature` (missing slash)
- ❌ `feature/something` (wrong prefix)

---

## 🚀 **AUTOMATED WORKFLOW**

When you push to a `codex/**` branch:
1. ✅ GitHub Actions automatically triggers
2. ✅ Your changes are merged to `main` branch
3. ✅ GitHub Pages deploys automatically
4. ✅ Website updates in 1-2 minutes
5. ✅ Your feature branch is deleted (cleanup)

**You don't need to:**
- ❌ Create Pull Requests manually
- ❌ Merge branches yourself
- ❌ Deploy manually
- ❌ Wait for human approval

---

## 📋 **STEP-BY-STEP INSTRUCTIONS**

### Step 1: Clone Repository (First Time Only)
```bash
git clone https://github.com/mediakids-productions/mediakids-web.git
cd mediakids-web
```

### Step 2: Create Feature Branch
**IMPORTANT: Use correct naming!**
```bash
# Get latest code
git checkout main
git pull origin main

# Create your branch (replace SESSION_ID with unique identifier)
git checkout -b codex/your-feature-name-SESSION_ID
```

**Example:**
```bash
git checkout -b codex/add-gallery-section-20240115
```

### Step 3: Make Your Changes
Edit files as requested by the user:
```bash
# Edit files (use your preferred editor/method)
vim index.html
# or
code index.html
```

### Step 4: Commit Changes
```bash
git add .
git commit -m "Add gallery section with image grid"
```

### Step 5: Push to Trigger Auto-Deploy
```bash
# Push to your codex branch
git push origin codex/your-feature-name-SESSION_ID
```

**That's it!** GitHub Actions will:
- Detect your push
- Merge to main automatically
- Deploy to GitHub Pages
- Website updates in ~1-2 minutes

---

## ✅ **VERIFICATION**

### Check Workflow Status
1. Go to: https://github.com/mediakids-productions/mediakids-web/actions
2. Find your workflow run (should show `codex/your-branch-name`)
3. Wait for green checkmark ✅

### Check Website
1. Wait 1-2 minutes after workflow completes
2. Visit: https://mediakids-productions.github.io/mediakids-web/
3. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
4. Your changes should be live!

---

## 🔧 **TROUBLESHOOTING**

### Problem: "403 Forbidden" when pushing to main
**Solution:** You're trying to push to `main` directly. Use a `codex/**` branch instead.

```bash
# Wrong
git push origin main  # ❌ Will fail

# Correct
git push origin codex/my-feature-xyz  # ✅ Will work
```

---

### Problem: Workflow not triggering
**Check:**
1. Branch name starts with `codex/` (with slash)
2. You pushed to remote (not just committed locally)
3. GitHub Actions is enabled

```bash
# Verify your branch name
git branch --show-current

# Should output something like: codex/feature-name-123
# If it doesn't have "codex/", create a new branch with correct name
```

---

### Problem: Merge Conflicts
**Error message:** "Conflicts detected"

**Solution:**
```bash
# Pull latest main
git checkout main
git pull origin main

# Merge main into your branch
git checkout codex/your-feature-xyz
git merge main

# Resolve conflicts in your editor
# Then commit and push again
git add .
git commit -m "Resolve merge conflicts"
git push origin codex/your-feature-xyz
```

---

### Problem: Changes not appearing on website
**Check:**
1. Workflow completed successfully (green checkmark)
2. Waited 1-2 minutes for GitHub Pages deployment
3. Hard refreshed browser (Ctrl+Shift+R)
4. Cleared browser cache

---

## 🎨 **BEST PRACTICES**

### 1. Pull Before Starting
Always get the latest code before making changes:
```bash
git checkout main
git pull origin main
git checkout -b codex/new-feature-xyz
```

### 2. Use Descriptive Branch Names
```bash
# Good ✅
codex/add-activity-page-20240115
codex/fix-dropdown-navigation-xyz789
codex/update-contact-form-abc123

# Bad ❌
codex/fix
codex/changes
codex/update
```

### 3. Commit Often
Make small, focused commits:
```bash
git add index.html
git commit -m "Add hero section structure"

git add styles.css
git commit -m "Style hero section with gradients"

git push origin codex/your-feature-xyz
```

### 4. Test Locally First (Optional)
```bash
# Start local server
python3 -m http.server 8000

# Open in browser
# http://localhost:8000

# Make sure everything works before pushing
```

---

## 🤝 **WORKING WITH OTHER AIs**

You might be working alongside:
- **Claude** (uses `claude/**` branches)
- **Antigravity** (uses `antigravity/**` branches)

**Guidelines:**
1. ✅ Always pull latest main before starting
2. ✅ Use unique session IDs to avoid branch name collisions
3. ✅ Communicate with user if you see recent changes from other AIs
4. ⚠️ If working on the same files, coordinate with user

**Example:**
```bash
# You notice a recent commit from Claude
# Pull the latest changes first
git checkout main
git pull origin main

# Then create your branch
git checkout -b codex/your-feature-new-xyz
```

---

## 📊 **WORKFLOW MONITORING**

### View Recent Deployments
```bash
# Check last 5 commits on main
git checkout main
git pull origin main
git log --oneline -5
```

### Monitor Actions in Real-Time
1. Go to: https://github.com/mediakids-productions/mediakids-web/actions
2. Click on running workflow
3. Watch live progress

---

## 🎯 **QUICK REFERENCE CARD**

```bash
# 1. Start new feature
git checkout main && git pull origin main
git checkout -b codex/feature-name-SESSION_ID

# 2. Make changes
# (edit files)

# 3. Commit
git add .
git commit -m "Description of changes"

# 4. Deploy (auto-merge to main)
git push origin codex/feature-name-SESSION_ID

# 5. Verify
# Visit: https://mediakids-productions.github.io/mediakids-web/
# Wait 1-2 minutes, hard refresh
```

---

## ⚡ **ADVANCED: Batch Updates**

If making multiple related changes:

```bash
# Make change 1
git add file1.html
git commit -m "Update header section"

# Make change 2
git add file2.css
git commit -m "Add responsive styles"

# Make change 3
git add file3.js
git commit -m "Add interactive features"

# Push once (all commits will be merged together)
git push origin codex/batch-updates-xyz
```

---

## 🚨 **EMERGENCY: Rollback**

If you deployed something wrong:

1. **Contact user immediately**
2. They can revert on GitHub:
   - Go to commit history
   - Click "Revert" on problematic commit
   - Auto-deploys the revert

**OR** you can revert:
```bash
# Find commit hash to revert
git log --oneline

# Revert that commit
git revert COMMIT_HASH

# Push to new branch
git checkout -b codex/revert-mistake-xyz
git push origin codex/revert-mistake-xyz
```

---

## 📞 **NEED HELP?**

1. Check workflow logs: https://github.com/mediakids-productions/mediakids-web/actions
2. Read error messages carefully
3. Ask the user for help
4. Check this guide again

---

## ✨ **REMEMBER**

- ✅ **Always** use `codex/**` branch names
- ✅ **Always** pull latest main before starting
- ✅ **Never** push to main directly (will fail)
- ✅ Wait 1-2 minutes after push for deployment
- ✅ Hard refresh browser to see changes

---

**Happy Coding! 🚀**

*You've got this, Codex!*
