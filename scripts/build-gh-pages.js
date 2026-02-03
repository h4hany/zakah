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

// Main build process
const distStandalone = path.join(__dirname, '..', 'dist-standalone');
const dist = path.join(__dirname, '..', 'dist');

console.log('Copying standalone app files to dist...');
copyDir(distStandalone, dist);

console.log('Cleaning up dist-standalone...');
fs.rmSync(distStandalone, { recursive: true, force: true });

console.log('✅ GitHub Pages build complete!');

