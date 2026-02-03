# Testing Widget Embed Locally

## Quick Test Steps

### Option 1: Using the test script (Recommended)

```bash
npm run test:embed
```

This will:
1. Build the widget (`npm run build`)
2. Start a local server on port 3000 with proper MIME types
3. Open `http://localhost:3000/test-embed.html` in your browser

**The custom server fixes MIME type issues** that can occur with other servers.

### Option 2: Manual Steps

1. **Build the widget:**
   ```bash
   npm run build
   ```

2. **Start a local server** (choose one):

   **Using Python:**
   ```bash
   python3 -m http.server 8000
   ```
   Then open: `http://localhost:8000/test-embed.html`

   **Using Node.js (serve):**
   ```bash
   npx serve . -p 3000
   ```
   Then open: `http://localhost:3000/test-embed.html`

   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```
   Then open: `http://localhost:8000/test-embed.html`

3. **Open the test file:**
   - English: `http://localhost:3000/test-embed.html`
   - Arabic: `http://localhost:3000/test-embed-ar.html`

## What to Expect

1. **Floating Button**: You should see a gold floating button in the bottom-right (or bottom-left for Arabic) corner
2. **Click to Open**: Clicking the button opens the widget in a modal overlay
3. **Navigation**: Test navigating between Home → Excel → Form
4. **Back Button**: Use the back button in the header to return to home
5. **Language Switch**: Test switching between EN/AR
6. **Close Button**: Click the X button or click outside to close

## Test Files

- `test-embed.html` - English version with widget on bottom-right
- `test-embed-ar.html` - Arabic version with widget on bottom-left

## Important Notes

⚠️ **You MUST use a local server** - Opening the HTML file directly (`file://`) won't work due to CORS restrictions with the widget bundle.

The widget files are loaded from:
- `./dist/zakat-widget.css`
- `./dist/zakat-widget.js`

Make sure these files exist after running `npm run build`.

