const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const env = { ...process.env, VITE_API_URL: 'https://mayurfashionapi.vercel.app' };

console.log('Building Mayur-Fashion frontend...');
execSync('npm install', { cwd: path.join(__dirname, 'Mayur-Fashion'), stdio: 'inherit' });
execSync('npm run build', { cwd: path.join(__dirname, 'Mayur-Fashion'), stdio: 'inherit', env });

console.log('Building admin-panel...');
execSync('npm install', { cwd: path.join(__dirname, 'admin-panel'), stdio: 'inherit' });
execSync('npm run build', { cwd: path.join(__dirname, 'admin-panel'), stdio: 'inherit', env });

console.log('Copying admin-panel/dist to Mayur-Fashion/dist/admin...');
const adminDistSrc = path.join(__dirname, 'admin-panel', 'dist');
const adminDistDest = path.join(__dirname, 'Mayur-Fashion', 'dist', 'admin');

// Ensure destination exists
fs.rmSync(adminDistDest, { recursive: true, force: true });
fs.cpSync(adminDistSrc, adminDistDest, { recursive: true });

console.log('Creating serve.json for proper routing...');
const serveJson = {
  "rewrites": [
    {
      "source": "/admin",
      "destination": "/admin/index.html"
    },
    {
      "source": "/admin/assets/**",
      "destination": "/admin/assets/$1"
    },
    {
      "source": "/admin/**",
      "destination": "/admin/index.html"
    },
    {
      "source": "/assets/**",
      "destination": "/assets/$1"
    },
    {
      "source": "**",
      "destination": "/index.html"
    }
  ]
};

fs.writeFileSync(
  path.join(__dirname, 'Mayur-Fashion', 'dist', 'serve.json'),
  JSON.stringify(serveJson, null, 2)
);

console.log('Build complete!');
