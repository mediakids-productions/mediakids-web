# MediaKids Academy - Cache Busting Version Update Script
# Run this script before deploying to update the BUILD_VERSION timestamp
# Usage: powershell -ExecutionPolicy Bypass -File .\update-version.ps1

$ErrorActionPreference = "Stop"

# Generate new version based on current timestamp (YYYYMMDDHHMM format)
$version = Get-Date -Format "yyyyMMddHHmm"
$versionFile = Join-Path $PSScriptRoot "js\version.js"

# Check if version.js exists
if (-not (Test-Path $versionFile)) {
    Write-Host "Error: version.js not found at $versionFile" -ForegroundColor Red
    exit 1
}

# Read the file and update BUILD_VERSION
$content = Get-Content $versionFile -Raw -Encoding UTF8
$oldVersion = [regex]::Match($content, "BUILD_VERSION = '(\d+)'").Groups[1].Value
$newContent = $content -replace "BUILD_VERSION = '\d+'", "BUILD_VERSION = '$version'"

# Write the updated content
Set-Content $versionFile $newContent -NoNewline -Encoding UTF8

Write-Host ""
Write-Host "MediaKids Cache Busting Updated!" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Previous Version: $oldVersion" -ForegroundColor Yellow
Write-Host "  New Version:      $version" -ForegroundColor Green
Write-Host ""
Write-Host "All CSS/JS files will now use the new version!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. git add ."
Write-Host "  2. git commit -m 'Update cache version'"
Write-Host "  3. git push"
Write-Host ""
