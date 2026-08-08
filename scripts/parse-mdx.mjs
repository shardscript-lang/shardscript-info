import { compile } from '@mdx-js/mdx';
import fs from 'fs';
import path from 'path';

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile() && full.endsWith('.mdx')) {
      yield full;
    }
  }
}

let failed = 0;

for (const file of walk('src/docs')) {
  const content = fs.readFileSync(file, 'utf8');
  try {
    await compile(content);
    console.log(`OK   ${file}`);
  } catch (e) {
    failed++;
    console.error(`FAIL ${file}`);
    console.error(`  ${e.message}`);
    if (e.position) {
      console.error(`  position: ${JSON.stringify(e.position)}`);
    }
  }
}

if (failed > 0) {
  process.exit(1);
}
