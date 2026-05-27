#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ANSI escape codes for styling console output
const styles = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

console.log(`\n${styles.bold}${styles.blue}=== Create MauDocs CLI ===${styles.reset}\n`);

// Default parameters
let fileName = 'index.html';
let folderName = 'docs';

// Parse arguments
const args = process.argv.slice(2);
args.forEach(arg => {
  if (arg.startsWith('--')) {
    // Flag specifies the folder name, e.g. --my-guide
    folderName = arg.slice(2);
  } else if (!arg.startsWith('-')) {
    // Positional argument specifies the file name, e.g. test.html
    fileName = arg;
  }
});

// Resolve paths
const destDir = path.resolve(process.cwd(), folderName);
const destFilePath = path.join(destDir, fileName);
const templatePath = path.join(__dirname, '../template/index.html');

// Verify template exists
if (!fs.existsSync(templatePath)) {
  console.error(`${styles.red}❌ Error: Template file not found at ${templatePath}${styles.reset}`);
  process.exit(1);
}

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Check if destination file already exists
if (fs.existsSync(destFilePath)) {
  console.log(`${styles.yellow}⚠️ Warning: File "${fileName}" already exists in the directory "${folderName}".${styles.reset}`);
  console.log(`If you want to overwrite it, please delete or rename it first.`);
  console.log(`Or run: ${styles.cyan}npx create-maudocs custom-name.html --custom-folder${styles.reset} to use different names.\n`);
  process.exit(0);
}

try {
  console.log(`Reading template source...`);
  let htmlContent = fs.readFileSync(templatePath, 'utf8');

  // Replace local script reference with the jsDelivr CDN link pointing to your repository
  const cdnUrl = 'https://cdn.jsdelivr.net/gh/mankhb2k/maudocs@main/template/components.js';
  console.log(`Injecting CDN script: ${styles.cyan}${cdnUrl}${styles.reset}...`);
  htmlContent = htmlContent.replace(
    '<script src="components.js"></script>',
    `<script src="${cdnUrl}"></script>`
  );

  console.log(`Writing template file to: ${styles.cyan}${destFilePath}${styles.reset}...`);
  fs.writeFileSync(destFilePath, htmlContent, 'utf8');

  console.log(`\n${styles.green}✨ Success! Beautiful MauDocs template created successfully in "${folderName}/"!${styles.reset}`);
  console.log(`\n${styles.bold}How to use:${styles.reset}`);
  console.log(`  1. Open ${styles.cyan}${folderName}/${fileName}${styles.reset} directly in your browser to view.`);
  console.log(`  2. Share the file or push it to GitHub Pages.`);
  console.log(`  3. Have your AI agent insert content between the comment tags:\n`);
  console.log(`     - ${styles.bold}Sidebar Links:${styles.reset} between ${styles.cyan}<!-- AI_AGENT:SIDEBAR_NAVIGATION_START -->${styles.reset} and ${styles.cyan}<!-- ..._END -->${styles.reset}`);
  console.log(`     - ${styles.bold}Main Content:${styles.reset} between ${styles.cyan}<!-- AI_AGENT:MAIN_CONTENT_START -->${styles.reset} and ${styles.cyan}<!-- ..._END -->${styles.reset}`);
  console.log(`\nEnjoy building! 🚀\n`);
} catch (error) {
  console.error(`${styles.red}❌ Error writing files: ${error.message}${styles.reset}`);
  process.exit(1);
}
