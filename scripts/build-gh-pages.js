const fs = require('fs');
const path = require('path');

// Copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Fix absolute paths in HTML to relative paths
function fixHtmlPaths(htmlPath) {
  if (!fs.existsSync(htmlPath)) {
    return;
  }
  
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Replace absolute paths with relative paths
  // Fix /assets/ to ./assets/
  html = html.replace(/href="\/assets\//g, 'href="./assets/');
  html = html.replace(/src="\/assets\//g, 'src="./assets/');
  
  // Fix any other absolute paths that might start with /
  html = html.replace(/href="\/(?!\/)/g, 'href="./');
  html = html.replace(/src="\/(?!\/)/g, 'src="./');
  
  fs.writeFileSync(htmlPath, html, 'utf8');
}

// Main build process
const distStandalone = path.join(__dirname, '..', 'dist-standalone');
const dist = path.join(__dirname, '..', 'dist');

console.log('Copying standalone app files to dist...');
copyDir(distStandalone, dist);

console.log('Fixing asset paths in index.html...');
const indexPath = path.join(dist, 'index.html');
fixHtmlPaths(indexPath);

// Copy 404.html for SPA routing support
const public404 = path.join(__dirname, '..', 'public', '404.html');
const dist404 = path.join(dist, '404.html');
if (fs.existsSync(public404)) {
  console.log('Copying 404.html for SPA routing...');
  fs.copyFileSync(public404, dist404);
}

console.log('Cleaning up dist-standalone...');
fs.rmSync(distStandalone, { recursive: true, force: true });

console.log('✅ GitHub Pages build complete!');

