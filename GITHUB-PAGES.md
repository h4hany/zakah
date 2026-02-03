# GitHub Pages Deployment Guide

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Zakat Widget"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 3. Automatic Deployment

The GitHub Actions workflow will automatically:
- Build the widget when you push to `main` branch
- Deploy to GitHub Pages
- Make the widget available at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Using the Widget from GitHub Pages

Once deployed, you can embed the widget using:

```html
<link rel="stylesheet" href="https://YOUR_USERNAME.github.io/YOUR_REPO/zakat-widget.css">
<script src="https://YOUR_USERNAME.github.io/YOUR_REPO/zakat-widget.js"></script>
```

### Example

If your repo is `zakha` and username is `hany`:

```html
<link rel="stylesheet" href="https://hany.github.io/zakha/zakat-widget.css">
<script src="https://hany.github.io/zakha/zakat-widget.js"></script>
```

## Manual Deployment

If you prefer to deploy manually:

1. Build the widget:
   ```bash
   npm run build
   ```

2. Copy `dist/` contents to a `docs/` folder (or `gh-pages` branch)

3. Enable GitHub Pages to serve from `docs/` folder

## Testing Locally

Before deploying, test the build:

```bash
npm run build
npm run preview
```

Then visit `http://localhost:4173` to test the production build.

