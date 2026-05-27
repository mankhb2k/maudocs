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

console.log(`\n${styles.bold}${styles.blue}=== Create Tailwind Docs CLI ===${styles.reset}\n`);

// Get destination filename, default to 'index.html'
const targetFileName = process.argv[2] || 'index.html';
const destPath = path.resolve(process.cwd(), targetFileName);

// Locate the template file
const templatePath = path.join(__dirname, '../template/index.html');

if (!fs.existsSync(templatePath)) {
  console.error(`${styles.red}❌ Error: Template file not found at ${templatePath}${styles.reset}`);
  process.exit(1);
}

// Check if destination file already exists
if (fs.existsSync(destPath)) {
  console.log(`${styles.yellow}⚠️ Warning: File "${targetFileName}" already exists in the current directory.${styles.reset}`);
  console.log(`If you want to overwrite it, please delete or rename it first.`);
  console.log(`Or run: ${styles.cyan}npx create-tailwind-docs custom-name.html${styles.reset} to use a different filename.\n`);
  process.exit(0);
}

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  fs.readdirSync(from).forEach(element => {
    const stat = fs.lstatSync(path.join(from, element));
    if (stat.isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else if (stat.isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

try {
  console.log(`Copying template to: ${styles.cyan}${destPath}${styles.reset}...`);
  fs.copyFileSync(templatePath, destPath);
  
  // Copy components folder recursively
  const componentsSrc = path.join(__dirname, '../template/components');
  const componentsDest = path.resolve(path.dirname(destPath), 'components');
  if (fs.existsSync(componentsSrc)) {
    console.log(`Copying components folder to: ${styles.cyan}${componentsDest}${styles.reset}...`);
    copyFolderSync(componentsSrc, componentsDest);
  }

  // Copy components.js file
  const componentsJsSrc = path.join(__dirname, '../template/components.js');
  const componentsJsDest = path.resolve(path.dirname(destPath), 'components.js');
  if (fs.existsSync(componentsJsSrc)) {
    console.log(`Copying components.js to: ${styles.cyan}${componentsJsDest}${styles.reset}...`);
    fs.copyFileSync(componentsJsSrc, componentsJsDest);
  }

  console.log(`\n${styles.green}✨ Success! Beautiful Tailwind Docs template and components created successfully!${styles.reset}`);
  console.log(`\n${styles.bold}How to use:${styles.reset}`);
  console.log(`  1. Open ${styles.cyan}${targetFileName}${styles.reset} directly in your browser to view.`);
  console.log(`  2. Share the files or push them to GitHub / configure GitHub Pages.`);
  console.log(`  3. Have your AI agent insert content between the comment tags:\n`);
  console.log(`     - ${styles.bold}Sidebar Links:${styles.reset} between ${styles.cyan}<!-- AI_AGENT:SIDEBAR_NAVIGATION_START -->${styles.reset} and ${styles.cyan}<!-- ..._END -->${styles.reset}`);
  console.log(`     - ${styles.bold}Main Content:${styles.reset} between ${styles.cyan}<!-- AI_AGENT:MAIN_CONTENT_START -->${styles.reset} and ${styles.cyan}<!-- ..._END -->${styles.reset}`);
  console.log(`\nEnjoy building! 🚀\n`);
} catch (error) {
  console.error(`${styles.red}❌ Error writing files: ${error.message}${styles.reset}`);
  process.exit(1);
}
