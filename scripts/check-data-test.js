const fs = require('fs');
const path = require('path');

function walk(dir, exts, fileList = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) walk(full, exts, fileList);
    else if (exts.includes(path.extname(it.name))) fileList.push(full);
  }
  return fileList;
}

const root = path.join(__dirname, '..', 'cypress');
if (!fs.existsSync(root)) {
  console.error('No cypress directory found.');
  process.exit(1);
}

const exts = ['.js', '.jsx', '.ts', '.tsx', '.html'];
const files = walk(root, exts);
let matches = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('data-test') || content.includes('data-cy')) {
    matches.push(file);
  }
}

if (matches.length === 0) {
  console.error('No data-test or data-cy attributes found in cypress tests/pages.');
  console.error('Please use stable selectors (data-test / data-cy) in your tests.');
  process.exit(1);
}

console.log('Found', matches.length, 'files using data-test/data-cy selectors. Sample:');
console.log(matches.slice(0, 10).join('\n'));
process.exit(0);
