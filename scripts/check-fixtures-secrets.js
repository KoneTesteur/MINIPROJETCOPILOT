const fs = require('fs');
const path = require('path');

function walkFiles(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) walkFiles(full, list);
    else list.push(full);
  }
  return list;
}

const fixturesDir = path.join(__dirname, '..', 'cypress', 'fixtures');
const files = walkFiles(fixturesDir);
const patterns = [
  /AKIA[0-9A-Z]{16}/g, // AWS access key
  /-----BEGIN PRIVATE KEY-----/g,
  /api[_-]?key\s*[:=]\s*['\"][0-9a-zA-Z-_]{8,}['\"]/gi,
  /password\s*[:=]/gi,
  /secret\s*[:=]/gi,
];

let found = [];
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  for (const pat of patterns) {
    if (pat.test(content)) {
      found.push({ file, pattern: pat.toString() });
      break;
    }
  }
}

if (found.length > 0) {
  console.error('Potential secrets found in fixtures:');
  for (const f of found) console.error('-', f.file, f.pattern);
  console.error('\nRemove secrets from fixtures or move them to secure vaults.');
  process.exit(1);
}

console.log('No obvious secrets found in cypress/fixtures');
process.exit(0);
