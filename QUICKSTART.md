# 🚀 Quick Start Guide

## Local Development (5 minutes)

### 1. Prerequisites
```bash
# Check Node.js version (should be 18+)
node --version

# If needed, install Node.js from nodejs.org
```

### 2. Clone & Setup
```bash
# Navigate to the project
cd /Users/abhimanyusarswat/Desktop/axiom-token-table

# Or if cloning from GitHub:
# git clone <your-repo-url>
# cd axiom-token-table

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Open in Browser
```
http://localhost:3000
```

The app should now be running! 🎉

## Quick Test (2 minutes)

1. ✅ See tokens loading with skeleton animation
2. ✅ Click different tabs (New Pairs, Final Stretch, Migrated)
3. ✅ Click a column header to sort
4. ✅ Type in search box to filter
5. ✅ Wait 5 seconds to see prices update with color flash
6. ✅ Click any token row to open modal
7. ✅ Resize browser to see mobile view

## Deployment to Vercel (10 minutes)

### Option A: Vercel CLI (Fastest)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel (opens browser)
vercel login

# Deploy to production
cd /Users/abhimanyusarswat/Desktop/axiom-token-table
vercel --prod

# Copy the deployment URL shown in terminal
# Example: https://axiom-token-table-xyz.vercel.app
```

### Option B: Vercel Dashboard
```bash
# 1. Push to GitHub first
git remote add origin <your-github-repo-url>
git push -u origin main

# 2. Go to vercel.com and sign in

# 3. Click "New Project"

# 4. Import your GitHub repository

# 5. Accept default settings and click "Deploy"

# 6. Wait 2-3 minutes for deployment

# 7. Copy your deployment URL
```

## Create Demo Video (15 minutes)

### Recording
```bash
# On macOS - use QuickTime
1. Open QuickTime Player
2. File > New Screen Recording
3. Select area to record (browser window)
4. Click Record

# On Windows - use built-in Game Bar
1. Press Windows + G
2. Click Record button
3. Record browser window

# Recommended: Use Loom (loom.com) for easy sharing
```

### Video Script (1-2 minutes)
```
[0:00-0:10] "Hi! This is my Axiom Trade token discovery table"
[0:10-0:20] "It shows real-time token data with live price updates"
[0:20-0:35] "I can switch between different token categories"
[0:35-0:45] "Click any column to sort the data"
[0:45-0:55] "Search functionality filters in real-time"
[0:55-1:05] "Click a token to see detailed information"
[1:05-1:15] "Watch prices update automatically with smooth transitions"
[1:15-1:30] "Fully responsive - works on all devices from 320px to 4K"
[1:30-1:45] "Built with Next.js 14, TypeScript, Redux, and React Query"
[1:45-2:00] "Optimized for performance with 90+ Lighthouse score. Thanks!"
```

### Upload to YouTube
```bash
# 1. Go to youtube.com/upload
# 2. Upload your video file
# 3. Set title: "Axiom Token Discovery Table - Technical Demo"
# 4. Set visibility: "Unlisted" (or Public)
# 5. Add description with deployment URL
# 6. Click "Publish"
# 7. Copy the video URL
```

## Update README with URLs

```bash
cd /Users/abhimanyusarswat/Desktop/axiom-token-table

# Open README.md and update these lines:
# **Live Demo**: https://your-app.vercel.app
# **Video Demo**: https://youtube.com/watch?v=your-video-id
# **GitHub Repository**: https://github.com/your-username/axiom-token-table

# Commit and push
git add README.md
git commit -m "Update README with deployment URLs"
git push
```

## Verify Everything Works

### Checklist
- [ ] Local dev server runs without errors
- [ ] Production build succeeds (`npm run build`)
- [ ] Deployed to Vercel successfully
- [ ] Deployment URL loads and works
- [ ] All features work on deployed version
- [ ] Video uploaded to YouTube
- [ ] README updated with all URLs
- [ ] Repository pushed to GitHub
- [ ] No console errors on deployed site
- [ ] Responsive on mobile (test on phone)

## Lighthouse Test

```bash
# After deployment:
1. Open deployed URL in Chrome
2. Open DevTools (F12)
3. Go to "Lighthouse" tab
4. Select all categories
5. Run test for Mobile
6. Run test for Desktop
7. Verify scores ≥ 90 for Performance

Expected scores:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100
```

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Git
git status           # Check status
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to GitHub

# Vercel
vercel               # Deploy preview
vercel --prod        # Deploy to production
vercel logs          # View deployment logs
```

## Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Build fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Vercel deployment fails
```bash
# Check build logs in Vercel dashboard
# Common fixes:
1. Delete node_modules and package-lock.json
2. npm install
3. npm run build (test locally)
4. Push changes
5. Redeploy
```

## Support

If you encounter issues:
1. Check console for errors
2. Review TESTING.md for detailed tests
3. See DEPLOYMENT.md for deployment help
4. Check ARCHITECTURE.md to understand structure

## Next Steps

After completing Quick Start:
1. ✅ Test all features locally
2. ✅ Deploy to Vercel
3. ✅ Create and upload video
4. ✅ Update README
5. ✅ Run Lighthouse audit
6. ✅ Submit GitHub repo, Vercel URL, and YouTube video

## Time Estimate

- Local setup: 5 minutes
- Testing: 10 minutes
- Deployment: 10 minutes
- Video recording: 15 minutes
- Total: ~40 minutes

Good luck! 🚀

