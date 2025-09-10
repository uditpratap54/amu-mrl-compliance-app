# Simple GitHub Pages Deployment Script
Write-Host "🚀 Starting deployment process..." -ForegroundColor Green

# Build the application
Set-Location "client"
Write-Host "📦 Building application..." -ForegroundColor Yellow
npm run build

# Copy built files to root
Set-Location ".."
Write-Host "📋 Copying files..." -ForegroundColor Yellow
Copy-Item "client\dist\*" "." -Recurse -Force

# Create .nojekyll file for GitHub Pages
New-Item -Name ".nojekyll" -ItemType File -Force

# Git operations
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git add .
git commit -m "Deploy website to GitHub Pages"
git push origin main

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your website will be available at: https://uditpratap54.github.io/amu-mrl-compliance-app/" -ForegroundColor Cyan
