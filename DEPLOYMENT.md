# Deployment Instructions

## Prerequisites
- Node.js 18+ installed
- Git repository initialized
- Vercel account (free tier works)

## Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd axiom-token-table
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Option 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Axiom Token Discovery Table"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "New Project"

4. Import your GitHub repository

5. Configure project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

6. Click "Deploy"

## Environment Variables (if needed)

No environment variables are required for this project as it uses mock data.

## Post-Deployment

1. Test the deployed application
2. Run Lighthouse audit on the deployed URL
3. Verify mobile responsiveness (320px - 4K)
4. Test real-time price updates
5. Check all interactive features (sorting, filtering, modals, etc.)

## Creating the Demo Video

### Recording the Video

1. Use screen recording software (QuickTime, Loom, OBS, etc.)
2. Record in 1080p or higher
3. Show the following features:
   - Overview of the main table
   - Tab switching (New Pairs, Final Stretch, Migrated)
   - Sorting functionality (click column headers)
   - Search functionality
   - Real-time price updates (wait a few seconds to show color changes)
   - Click on a token to show the modal
   - Show responsive design (resize browser to mobile view)
   - Hover effects and tooltips

### Video Structure (1-2 minutes)

```
0:00-0:10  Introduction and overview
0:10-0:25  Tab navigation and filtering
0:25-0:40  Sorting and search
0:40-0:55  Real-time updates demo
0:55-1:10  Token details modal
1:10-1:20  Responsive design
1:20-1:30  Performance highlights
```

### Uploading to YouTube

1. Go to [YouTube Studio](https://studio.youtube.com)
2. Click "Create" → "Upload videos"
3. Upload your video
4. Set visibility to "Unlisted" or "Public"
5. Title: "Axiom Token Discovery Table - Technical Demo"
6. Description: Include deployed URL and key features
7. Copy the video link and add it to the README

## Updating README

After deployment, update the README.md with:

```markdown
## 🔗 Deployment

**Live Demo**: https://your-app.vercel.app

**Video Demo**: https://youtube.com/watch?v=your-video-id

**GitHub Repository**: https://github.com/your-username/axiom-token-table
```

## Performance Checklist

- [ ] Lighthouse Performance Score ≥ 90 (Mobile)
- [ ] Lighthouse Performance Score ≥ 90 (Desktop)
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 2.5s
- [ ] Cumulative Layout Shift = 0
- [ ] All interactions < 100ms
- [ ] No console errors in production
- [ ] Responsive on all devices (320px - 4K)

## Troubleshooting

### Build fails on Vercel
- Check Node.js version (should be 18+)
- Verify all dependencies are in package.json
- Run `npm run build` locally to test

### Slow performance
- Check bundle size: `npm run build` shows bundle analysis
- Ensure code splitting is working
- Verify no console.log in production

### Deployment URL not working
- Wait 1-2 minutes for deployment to complete
- Check Vercel dashboard for deployment status
- Verify build logs for errors

