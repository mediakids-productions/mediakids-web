---
description: Update cache busting version before deploying to GitHub Pages
---

# Updating Cache Version Before Deploy

Run this workflow whenever you've made changes to CSS/JS files and want to ensure users see the updates.

## Step 1: Update BUILD_VERSION
// turbo
```powershell
cd F:\global_teach_thailand
.\update-version.ps1
```

## Step 2: Commit and push changes
```powershell
git add .
git commit -m "Update cache version"
git push
```

## Notes
- The version update script automatically generates a timestamp-based version
- All CSS/JS files will use this new version via the dynamic loader system
- `version.js` is loaded fresh each time (with Date.now() timestamp) to ensure cache busting works
