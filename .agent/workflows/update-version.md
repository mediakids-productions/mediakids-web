---
description: Update cache busting version before deploying to GitHub Pages
---

// turbo-all

# Updating Cache Version Before Deploy

Run this workflow whenever you've made changes to CSS/JS files and want to ensure users see the updates.

## Step 1: Update BUILD_VERSION

```powershell
cd F:\global_teach_thailand
.\update-version.ps1
```

## Step 2: Stage all changes

```powershell
git add -A
```

## Step 3: Commit changes

```powershell
git commit -m "Update cache version"
```

## Step 4: Push to GitHub

```powershell
git push origin main
```

## Notes
- The version update script automatically generates a timestamp-based version (YYYYMMDDHHMM)
- All CSS/JS files will use this new version via the dynamic loader system
- `version.js` is loaded fresh each time (with Date.now() timestamp) to ensure cache busting works
- Cloudflare Pages will auto-deploy after push
