# 🌌 Google Antigravity - Auto-Deploy Setup Instructions

**Repository:** mediakids-productions/mediakids-web
**Website:** https://mediakids-productions.github.io/mediakids-web/

---

## 🎯 **YOUR MISSION**

You are Google Antigravity, an AI assistant working on this website alongside Claude and GPT Codex. When the user asks you to make changes to the website, follow these instructions to deploy automatically.

---

## ⚙️ **IMPORTANT CONFIGURATION**

### 1. Branch Naming Convention (CRITICAL!)
**You MUST use this branch naming format:**
```
antigravity/<feature-description>-<session-id>
```

**Examples:**
- `antigravity/redesign-hero-section-abc123`
- `antigravity/add-testimonials-xyz789`
- `antigravity/fix-mobile-menu-def456`

**DO NOT use:**
- ❌ `main` (will fail - protected)
- ❌ `antigravity-feature` (missing slash)
- ❌ `feature/something` (wrong prefix)
- ❌ `ag/feature` (use full name "antigravity")

---

## 🚀 **AUTOMATED WORKFLOW**

When you push to an `antigravity/**` branch:
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
git checkout -b antigravity/your-feature-name-SESSION_ID
```

**Example:**
```bash
git checkout -b antigravity/implement-dark-mode-20240115
```

### Step 3: Make Your Changes
Edit files as requested by the user:
```bash
# Edit files (use your preferred method)
vim index.html
# or
nano styles.css
# or use your code editor
```

### Step 4: Commit Changes
```bash
git add .
git commit -m "Implement dark mode toggle with theme persistence"
```

### Step 5: Push to Trigger Auto-Deploy
```bash
# Push to your antigravity branch
git push origin antigravity/your-feature-name-SESSION_ID
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
2. Find your workflow run (should show `antigravity/your-branch-name`)
3. Wait for green checkmark ✅

### Check Website
1. Wait 1-2 minutes after workflow completes
2. Visit: https://mediakids-productions.github.io/mediakids-web/
3. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
4. Your changes should be live!

---

## 🔧 **TROUBLESHOOTING**

### Problem: "403 Forbidden" when pushing to main
**Solution:** You're trying to push to `main` directly. Use an `antigravity/**` branch instead.

```bash
# Wrong
git push origin main  # ❌ Will fail

# Correct
git push origin antigravity/my-feature-xyz  # ✅ Will work
```

---

### Problem: Workflow not triggering
**Check:**
1. Branch name starts with `antigravity/` (with slash, full name)
2. You pushed to remote (not just committed locally)
3. GitHub Actions is enabled

```bash
# Verify your branch name
git branch --show-current

# Should output something like: antigravity/feature-name-123
# If it doesn't have "antigravity/", create a new branch with correct name
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
git checkout antigravity/your-feature-xyz
git merge main

# Resolve conflicts in your editor
# Then commit and push again
git add .
git commit -m "Resolve merge conflicts"
git push origin antigravity/your-feature-xyz
```

---

### Problem: Changes not appearing on website
**Check:**
1. Workflow completed successfully (green checkmark)
2. Waited 1-2 minutes for GitHub Pages deployment
3. Hard refreshed browser (Ctrl+Shift+R)
4. Cleared browser cache

**Force refresh by browser:**
- **Chrome/Edge:** Ctrl+Shift+R or Ctrl+F5
- **Firefox:** Ctrl+Shift+R or Ctrl+F5
- **Safari:** Cmd+Option+R
- **Mac:** Cmd+Shift+R

---

## 🎨 **BEST PRACTICES**

### 1. Always Pull Before Starting
Get the latest code before making changes:
```bash
git checkout main
git pull origin main
git checkout -b antigravity/new-feature-xyz
```

### 2. Use Descriptive Branch Names
```bash
# Good ✅
antigravity/add-search-functionality-20240115
antigravity/optimize-images-performance-xyz789
antigravity/refactor-css-architecture-abc123

# Bad ❌
antigravity/fix
antigravity/changes
antigravity/update
```

### 3. Commit Frequently
Make small, focused commits:
```bash
git add index.html
git commit -m "Add search input component"

git add search.js
git commit -m "Implement search functionality"

git add styles.css
git commit -m "Style search component"

git push origin antigravity/your-feature-xyz
```

### 4. Test Locally First (Recommended)
```bash
# Start local server
python3 -m http.server 8000
# or
python -m SimpleHTTPServer 8000

# Open in browser
# http://localhost:8000

# Test thoroughly before pushing
```

---

## 🤝 **WORKING WITH OTHER AIs**

You might be working alongside:
- **Claude** (uses `claude/**` branches)
- **GPT Codex** (uses `codex/**` branches)

**Guidelines:**
1. ✅ Always pull latest main before starting
2. ✅ Use unique session IDs to avoid branch name collisions
3. ✅ Communicate with user if you see recent changes from other AIs
4. ⚠️ If working on the same files, coordinate with user

**Example:**
```bash
# Check recent activity
git checkout main
git pull origin main
git log --oneline -5

# If you see recent commits from other AIs,
# make sure you have latest code before starting
```

---

## 📊 **WORKFLOW MONITORING**

### View Recent Deployments
```bash
# Check last 5 commits on main
git checkout main
git pull origin main
git log --oneline --all --graph -10
```

### Monitor Actions in Real-Time
1. Go to: https://github.com/mediakids-productions/mediakids-web/actions
2. Click on running workflow
3. Watch live progress
4. View detailed logs if needed

---

## 🎯 **QUICK REFERENCE CARD**

```bash
# 1. Start new feature
git checkout main && git pull origin main
git checkout -b antigravity/feature-name-SESSION_ID

# 2. Make changes
# (edit files as needed)

# 3. Commit
git add .
git commit -m "Clear description of changes"

# 4. Deploy (auto-merge to main)
git push origin antigravity/feature-name-SESSION_ID

# 5. Verify
# Visit: https://mediakids-productions.github.io/mediakids-web/
# Wait 1-2 minutes, hard refresh (Ctrl+Shift+R)
```

---

## ⚡ **ADVANCED: Multiple Features**

If making multiple unrelated changes:

**Option 1: Separate Branches (Recommended)**
```bash
# Feature 1
git checkout -b antigravity/add-footer-xyz
# make changes
git push origin antigravity/add-footer-xyz

# Feature 2
git checkout main
git pull origin main
git checkout -b antigravity/fix-header-abc
# make changes
git push origin antigravity/fix-header-abc
```

**Option 2: Sequential Commits (Same Branch)**
```bash
# Multiple commits in one branch
git add header.html
git commit -m "Update header navigation"

git add footer.html
git commit -m "Add social media links to footer"

git add styles.css
git commit -m "Improve responsive design"

# Push once (all commits merged together)
git push origin antigravity/multiple-improvements-xyz
```

---

## 🚨 **EMERGENCY: Rollback**

If you deployed something wrong:

### Method 1: Revert Commit
```bash
# Find problematic commit
git log --oneline

# Revert it
git revert COMMIT_HASH

# Push revert to new branch
git checkout -b antigravity/revert-mistake-xyz
git push origin antigravity/revert-mistake-xyz
```

### Method 2: Contact User
1. Immediately inform the user
2. They can revert via GitHub UI:
   - Go to commit history
   - Click "Revert" button
   - Auto-deploys the revert

---

## 📚 **REPOSITORY STRUCTURE**

```
mediakids-web/
├── index.html          # Main website file
├── images/             # Image assets
├── .github/
│   └── workflows/      # Auto-merge workflows
│       ├── direct-merge.yml          # Main workflow
│       └── auto-merge-and-deploy.yml # Alternative
└── README.md
```

---

## 🔒 **SECURITY NOTES**

1. **Never commit sensitive data:**
   - ❌ API keys
   - ❌ Passwords
   - ❌ Private tokens
   - ❌ Personal information

2. **If you accidentally commit secrets:**
   - Remove them immediately
   - Contact user
   - Rotate the exposed credentials

---

## 📞 **NEED HELP?**

1. **Check workflow logs:** https://github.com/mediakids-productions/mediakids-web/actions
2. **Read error messages** carefully
3. **Ask the user** for assistance
4. **Review this guide** again
5. **Check other AI guides** (Claude/Codex instructions)

---

## ✨ **PRO TIPS**

### Tip 1: Check Status Before Pushing
```bash
# See what you're about to commit
git status
git diff

# Review your commits
git log --oneline -3
```

### Tip 2: Amend Last Commit (if needed)
```bash
# Made a mistake in last commit?
# Fix the files, then:
git add .
git commit --amend --no-edit

# Force push (only if not pushed yet!)
git push origin antigravity/your-branch -f
```

### Tip 3: View File Changes
```bash
# See what changed in a file
git diff index.html

# See changes between commits
git diff main..antigravity/your-branch
```

### Tip 4: Clean Up Old Branches (Local)
```bash
# List all branches
git branch -a

# Delete old local branches
git branch -d antigravity/old-feature-xyz

# Force delete if needed
git branch -D antigravity/old-feature-xyz
```

---

## 🎓 **LEARNING RESOURCES**

If you need to learn more about Git:
- Git Basics: https://git-scm.com/book/en/v2
- GitHub Docs: https://docs.github.com
- Git Cheat Sheet: https://education.github.com/git-cheat-sheet-education.pdf

---

## ✅ **REMEMBER**

- ✅ **Always** use `antigravity/**` branch names (with slash)
- ✅ **Always** pull latest main before starting
- ✅ **Never** push to main directly (will fail with 403)
- ✅ Wait 1-2 minutes after push for deployment
- ✅ Hard refresh browser (Ctrl+Shift+R) to see changes
- ✅ Test locally before pushing (when possible)
- ✅ Communicate with user about recent changes from other AIs

---

**Happy Coding! 🚀**

*You've got this, Antigravity!*
