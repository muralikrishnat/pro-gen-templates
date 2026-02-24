import fs from 'fs';
import path from 'path';

const targetDir = process.argv[2] || 'ui/v1';
let printString = '';
export function generateTree(targetDir = 'src') {
  const root = path.resolve(targetDir);

  console.log(`${path.basename(root)}/`);
  printString += `${path.basename(root)}/\n`;
  walk(root);
}

function walk(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  entries.forEach((entry, index) => {
    if (entry.name.startsWith('template-meta.json')) return; // Skip hidden files and directories
    const isLast = index === entries.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    console.log(prefix + connector + entry.name);
    printString += prefix + connector + entry.name + '\n';
    if (entry.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      walk(path.join(dir, entry.name), newPrefix);
    }
  });
}


// console.log(`${path.basename(targetDir)}/`);
generateTree(targetDir);
console.log(JSON.stringify(printString));
