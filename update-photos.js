const fs = require('fs');
const path = require('path');

const imgsDir = path.join(__dirname, 'imgs');
const indexPath = path.join(__dirname, 'index.html');

console.log('Scanning imgs/ directory...');

try {
  // Read all files in the imgs directory
  const files = fs.readdirSync(imgsDir);
  
  // Filter for common image extensions
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const photos = files
    .filter(file => validExtensions.includes(path.extname(file).toLowerCase()))
    .map(file => `"imgs/${file}"`);
    
  console.log(`Found ${photos.length} images.`);

  // Create the new array string for JavaScript
  const newArrayString = `const momentPhotos = [\n        ${photos.join(',\n        ')}\n      ];`;

  // Read index.html
  let htmlContent = fs.readFileSync(indexPath, 'utf-8');

  // Replace the old momentPhotos array using a regular expression
  const regex = /const momentPhotos = \[\s*[\s\S]*?\s*\];/;
  
  if (regex.test(htmlContent)) {
    htmlContent = htmlContent.replace(regex, newArrayString);
    
    // Save the updated index.html
    fs.writeFileSync(indexPath, htmlContent, 'utf-8');
    console.log('Successfully updated momentPhotos in index.html!');
  } else {
    console.log('Error: Could not find the momentPhotos array in index.html.');
  }
} catch (error) {
  console.error('An error occurred:', error);
}
