# 🤖 Auto-Merge Workflows for AI Tools

This repository uses GitHub Actions to automatically merge changes from AI assistants (Claude, Codex, Antigravity) into the main branch and deploy to GitHub Pages.

---

## 📋 **Available Workflows**

### 1. **Direct Merge** ⚡ (Recommended - Simple & Fast)
**File:** `direct-merge.yml`

**What it does:**
- ✅ Automatically merges AI branches directly to `main`
- ✅ Checks for conflicts before merging
- ✅ Deletes feature branches after successful merge
- ✅ Triggers GitHub Pages deployment automatically
- ⏱️ **Fast:** Changes appear on website in ~1-2 minutes

**Use this if:**
- You want the simplest setup
- You trust your AI assistants
- You want fast deployments

---

### 2. **Auto-Merge with PR** 📝 (With Review History)
**File:** `auto-merge-and-deploy.yml`

**What it does:**
- ✅ Creates a Pull Request automatically
- ✅ Provides review history
- ✅ Auto-approves and merges PR
- ✅ Squash commits for clean history
- ⏱️ **Slightly slower:** ~30-60 seconds for PR creation

**Use this if:**
- You want PR history for auditing
- You need to review changes occasionally
- You want cleaner git history

---

## 🚀 **How It Works**

### Step 1: AI Pushes to Feature Branch
```bash
# AI assistant makes changes and pushes
git push origin claude/feature-name-sessionid
```

### Step 2: GitHub Actions Triggers
- Detects push to `claude/**`, `codex/**`, or `antigravity/**` branch
- Runs automatic merge workflow

### Step 3: Merge to Main
- Checks for conflicts
- Merges to `main` branch (or creates PR)
- Deletes feature branch

### Step 4: Auto-Deploy
- GitHub Pages automatically deploys from `main`
- Website updates in 1-2 minutes

---

## ⚙️ **Setup Instructions**

### Prerequisites
✅ GitHub repository with GitHub Pages enabled
✅ GitHub Actions enabled (should be on by default)

### Configuration

#### Option A: Use Direct Merge (Recommended)
**No additional setup needed!** Just push to a feature branch:
```bash
git push origin claude/my-feature-xyz
```

#### Option B: Use PR-Based Merge
Requires branch protection rules (see below)

---

## 🔧 **GitHub Settings Configuration**

### 1. Enable GitHub Actions
Go to: `Settings` → `Actions` → `General`
- ✅ Allow all actions and reusable workflows

### 2. Configure GitHub Pages
Go to: `Settings` → `Pages`
- **Source:** Deploy from a branch
- **Branch:** `main` / `root`
- Click **Save**

### 3. Branch Protection (Optional for PR-based)
Go to: `Settings` → `Branches` → `Add rule`

**For `main` branch:**
- Branch name pattern: `main`
- ✅ Require pull request reviews before merging (optional)
- ✅ Allow force pushes: **Enable** (for Actions)
- ✅ Allow deletions: **Disable**

---

## 📊 **Branch Naming Convention**

All AI tools should use this format:
```
<ai-name>/<feature-description>-<session-id>
```

**Examples:**
- `claude/add-activity-page-abc123`
- `codex/fix-navigation-xyz789`
- `antigravity/update-styles-def456`

This ensures:
✅ Workflows trigger correctly
✅ Easy to identify which AI made changes
✅ No conflicts between sessions

---

## 🎯 **Usage for Each AI Tool**

### Claude
```bash
# Claude automatically uses correct branch names
# Just push and workflow handles the rest
git push origin claude/feature-name-sessionid
```

### GPT Codex
```bash
# Use branch name starting with 'codex/'
git push origin codex/feature-name-sessionid
```

### Google Antigravity
```bash
# Use branch name starting with 'antigravity/'
git push origin antigravity/feature-name-sessionid
```

---

## 🔍 **Monitoring Workflows**

### Check Workflow Status
1. Go to **Actions** tab in GitHub
2. See recent workflow runs
3. Click on a run to see details

### View Deployment Status
1. Go to **Actions** tab
2. Look for "pages-build-deployment"
3. Green check = deployed successfully

---

## ⚠️ **Troubleshooting**

### Problem: Merge Conflicts
**Error:** "Conflicts detected"

**Solution:**
```bash
# Pull latest main
git checkout main
git pull origin main

# Merge main into your branch
git checkout your-feature-branch
git merge main

# Resolve conflicts, then push
git push origin your-feature-branch
```

### Problem: Workflow Not Triggering
**Check:**
1. Branch name starts with `claude/`, `codex/`, or `antigravity/`
2. GitHub Actions is enabled
3. Workflow files are in `.github/workflows/`

### Problem: Deploy Not Working
**Check:**
1. GitHub Pages is configured correctly
2. Source is set to `main` branch
3. Wait 1-2 minutes for deployment

---

## 📝 **Workflow Comparison**

| Feature | Direct Merge | PR-Based Merge |
|---------|--------------|----------------|
| Speed | ⚡ Fast (30s) | 🐢 Slower (60s) |
| Simplicity | ✅ Very Easy | ⚠️ Moderate |
| History | 📝 Merge commits | 📚 PR history |
| Review | ❌ No | ✅ Yes |
| Rollback | ⚙️ Git revert | ✅ Revert PR |

---

## 🎉 **Benefits**

✅ **Zero Manual Work** - Push and forget
✅ **Fast Deployments** - Live in 1-2 minutes
✅ **Multi-AI Support** - Claude, Codex, Antigravity work together
✅ **Automatic Cleanup** - Branches deleted after merge
✅ **Conflict Detection** - Won't merge if conflicts exist

---

## 📞 **Need Help?**

If something isn't working:
1. Check the **Actions** tab for error logs
2. Verify branch naming convention
3. Ensure GitHub Pages is configured
4. Check workflow file syntax

---

**Happy Coding! 🚀**
