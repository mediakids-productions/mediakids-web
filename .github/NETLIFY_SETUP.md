# 🚀 Netlify Deploy Preview Setup

## Overview
This repository is configured to automatically create **Deploy Previews** on Netlify for every branch push.

## ✅ Initial Setup (One-time)

### 1. Connect to Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** as the provider
4. Select repository: `mediakids-productions/mediakids-web`
5. Configure build settings:
   - **Branch to deploy:** `main`
   - **Build command:** (leave empty)
   - **Publish directory:** `.` or `/`
6. Click **"Deploy site"**

### 2. Enable Deploy Previews

1. In Netlify Dashboard → **Site settings**
2. Go to **Build & deploy** → **Deploy contexts**
3. Under **Deploy Previews**, select:
   - ✅ **"Any pull request against your production branch"**
   OR
   - ✅ **"All deploy contexts"** (recommended)
4. Click **"Save"**

### 3. Configure Branch Deploys (Optional but Recommended)

1. In **Build & deploy** → **Deploy contexts**
2. Under **Branch deploys**, select:
   - ✅ **"All branches"** or
   - ✅ **"Let me add individual branches"** → Add: `claude/**`, `codex/**`, `antigravity/**`
3. Click **"Save"**

## 🎯 How It Works

### Workflow for AI Assistants (Claude, Codex, Antigravity)

```
1. AI makes changes locally
   ↓
2. AI commits and pushes to branch (e.g., claude/add-feature-xyz)
   ↓
3. Netlify detects the push (within 10 seconds)
   ↓
4. Netlify builds and deploys preview (1-2 minutes)
   ↓
5. Netlify provides a unique preview URL:
   https://deploy-preview-123--your-site.netlify.app
   ↓
6. User reviews the preview
   ↓
7. If approved → Merge to main (auto or manual)
   ↓
8. Production site updates automatically
```

### For Users

**When AI finishes editing:**

```
AI: "✅ Changes complete!
     🔗 Preview: https://deploy-preview-123--mediakids-web.netlify.app

     Please review and let me know if I should merge to main."

You: (Open URL → Review changes → Make decision)

     ✅ "Looks good! Merge it."
     or
     ❌ "Please change X to Y"
```

## 📋 Deployment Status

### Check Deployment Status

**Option 1: Netlify Dashboard**
1. Go to [Netlify Deploys](https://app.netlify.com/)
2. Click on your site
3. View **"Deploys"** tab
4. See all deploy previews and their status

**Option 2: GitHub Integration**
1. Go to GitHub Pull Request or Commit
2. Scroll to **"Checks"** section
3. Look for **"Netlify"** check
4. Click **"Details"** → Opens preview URL

**Option 3: Netlify Badge (Optional)**

Add this to your README.md:
```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)
```

## 🧪 Testing the Setup

### Test Deploy Preview

1. Make a small change (e.g., add a comment in HTML)
2. Commit and push to a test branch:
   ```bash
   git checkout -b test/netlify-preview
   echo "<!-- Test comment -->" >> index.html
   git add index.html
   git commit -m "Test: Verify Netlify preview"
   git push origin test/netlify-preview
   ```
3. Wait 1-2 minutes
4. Check Netlify Dashboard for deploy preview
5. Open preview URL and verify changes

## 🔗 URLs

### Production URL
- **GitHub Pages:** https://mediakids-productions.github.io/mediakids-web/
- **Netlify:** https://your-site-name.netlify.app

### Preview URLs Format
- **Deploy Previews:** `https://deploy-preview-[number]--your-site.netlify.app`
- **Branch Deploys:** `https://[branch-name]--your-site.netlify.app`

## 🛠️ Configuration Files

### netlify.toml
Located at root: `/netlify.toml`

This file configures:
- Build settings
- Publish directory
- Headers (security, caching)
- Redirects (if needed)

## 📞 Troubleshooting

### Preview not showing up?

1. **Check Netlify Dashboard:**
   - Is the build running?
   - Did it fail? Check logs

2. **Check Deploy Contexts:**
   - Settings → Build & deploy → Deploy contexts
   - Ensure "Deploy previews" is enabled

3. **Check Build Logs:**
   - Netlify Dashboard → Deploys → Click on failed deploy
   - Read error messages

4. **Common Issues:**
   - ❌ Wrong publish directory → Check `netlify.toml`
   - ❌ Deploy previews disabled → Enable in settings
   - ❌ Branch name doesn't match → Check branch deploy settings

### Build failing?

1. Check `netlify.toml` configuration
2. Ensure all files are committed and pushed
3. Check Netlify build logs for specific errors

## 💡 Tips

1. **Always wait for preview before merging**
   - Prevents bugs in production
   - Easier to review visually

2. **Use preview URLs in comments**
   - Share with team members
   - Get feedback before merging

3. **Clean up old previews**
   - Netlify keeps previews for 7 days
   - Can be configured in settings

## 🎓 Learn More

- [Netlify Deploy Previews Documentation](https://docs.netlify.com/site-deploys/deploy-previews/)
- [Netlify Configuration](https://docs.netlify.com/configure-builds/file-based-configuration/)
- [Branch Deploys](https://docs.netlify.com/site-deploys/overview/#branch-deploy-controls)
