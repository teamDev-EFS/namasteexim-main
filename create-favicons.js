// Simple script to create favicon files
// Run this with Node.js to generate the favicon files

const fs = require("fs");
const path = require("path");

// Create a simple 32x32 PNG favicon
const createFavicon = (size, filename) => {
  // This is a minimal PNG creation - in a real scenario, you'd use a library like 'pngjs'
  // For now, we'll create a simple SVG that can be converted
  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" rx="${
    size / 4
  }" fill="url(#logoGradient)"/>
    <text x="${size / 2}" y="${
    size / 2 + size * 0.15
  }" font-family="Inter, sans-serif" font-size="${
    size * 0.6
  }" font-weight="bold" text-anchor="middle" fill="white">N</text>
  </svg>`;

  fs.writeFileSync(path.join(__dirname, "public", filename), svg);
  console.log(`Created ${filename}`);
};

// Create favicon files
createFavicon(32, "favicon-32x32.svg");
createFavicon(16, "favicon-16x16.svg");
createFavicon(180, "apple-touch-icon.svg");

console.log(
  "Favicon files created! You can now convert the SVG files to PNG using an online converter or image editor."
);
