# Fixing GitHub Pages Deployment Issue

## Problem
Branch "master" is not allowed to deploy to GitHub Pages due to environment protection rules.

## Solutions

### Solution 1: Use `main` Branch (Recommended)

1. **Rename your branch from `master` to `main`:**
   ```bash
   git branch -m master main
   git push -u origin main
   ```

2. **Delete the old master branch on GitHub:**
   - Go to your repository on GitHub
   - Settings → Branches
   - Delete the `master` branch

3. **Set `main` as the default branch:**
   - Go to Settings → Branches
   - Change default branch to `main`

### Solution 2: Configure Environment Protection Rules

If you need to keep using `master` branch:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Environments**
3. Click on **github-pages** environment
4. Under **Deployment branches**, add `master` to the allowed branches
5. Or set it to "All branches" if you want to allow any branch

### Solution 3: Remove Environment Protection (Not Recommended)

1. Go to **Settings** → **Environments**
2. Click on **github-pages**
3. Remove any branch protection rules
4. This is less secure but will allow any branch to deploy

## Current Workflow Configuration

The workflow is now configured to:
- Only trigger on `main` branch pushes
- Use the `github-pages` environment
- Deploy automatically when you push to `main`

## After Fixing

Once you've applied one of the solutions above:

1. Push your changes to the correct branch
2. The workflow will automatically run
3. Check the **Actions** tab to see deployment progress
4. Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Verify Deployment

After deployment completes:
- Check the Actions tab for green checkmarks
- Visit your GitHub Pages URL
- Test the widget embed functionality

