import fs from 'fs';
import path from 'path';

const srcRoutes = path.join(process.cwd(), 'src/routes');
const appDir = path.join(process.cwd(), 'app');

const files = fs.readdirSync(srcRoutes);

for (const file of files) {
  if (!file.endsWith('.tsx') && !file.endsWith('.ts')) continue;
  if (file === '__root.tsx') continue;

  const content = fs.readFileSync(path.join(srcRoutes, file), 'utf-8');
  let newContent = content;

  // 1. Remove createFileRoute import
  newContent = newContent.replace(/import\s+{([^}]*)}\s+from\s+["']@tanstack\/react-router["'];/g, (match, p1) => {
    let imports = p1.split(',').map(i => i.trim());
    if (imports.includes('Link')) {
      return `import Link from "next/link";`;
    }
    return '';
  });
  
  newContent = newContent.replace(/import\s+Link\s+from\s+["']@tanstack\/react-router["'];/g, `import Link from "next/link";`);

  // 2. Remove Route definition
  newContent = newContent.replace(/export\s+const\s+Route\s*=\s*createFileRoute\([^)]*\)\([^)]*\);\s*/g, '');
  newContent = newContent.replace(/export\s+const\s+Route\s*=\s*createFileRoute[\s\S]*?\}\);\s*/g, '');

  // 3. Replace <Link to="..."> with <Link href="...">
  newContent = newContent.replace(/<Link([^>]*)\s+to=(["'{].*?["'}])([^>]*)>/g, '<Link$1 href=$2$3>');

  // 4. Handle Link params
  // e.g. <Link to="/services/$slug" params={{ slug: s.slug }} ...> -> <Link href={`/services/${s.slug}`} ...>
  newContent = newContent.replace(/<Link([^>]*)\s+href=["']\/services\/\$slug["']\s+params=\{\{\s*slug:\s*(.*?)\s*\}\}([^>]*)>/g, '<Link$1 href={`/services/${$2}`}$3>');

  // 5. Image imports from "@/assets/..." -> just string paths
  newContent = newContent.replace(/import\s+(\w+)\s+from\s+["']@\/assets\/(.*?)["'];/g, 'const $1 = "/$2";');
  newContent = newContent.replace(/import\s+(\w+)\s+from\s+["']\.\.\/assets\/(.*?)["'];/g, 'const $1 = "/$2";');

  // 6. Export default function
  // find the component name from the file name or default to the file name title-cased
  let funcName = '';
  const match = newContent.match(/function\s+([A-Z]\w*)\s*\(/);
  if (match) {
    funcName = match[1];
    // make sure it's exported as default
    newContent = newContent.replace(new RegExp(`function\\s+${funcName}\\s*\\(`, 'g'), `export default function ${funcName}(`);
  }

  // Handle sitemap
  if (file === 'sitemap[.]xml.ts') {
    // Next.js sitemap is app/sitemap.ts
    // Let's just skip it for now and do it manually, it's different.
    continue;
  }

  let destPath = '';
  if (file === 'index.tsx') {
    destPath = path.join(appDir, 'page.tsx');
  } else if (file === 'services.$slug.tsx') {
    destPath = path.join(appDir, 'services', '[slug]', 'page.tsx');
  } else if (file === 'services.index.tsx') {
    destPath = path.join(appDir, 'services', 'page.tsx');
  } else {
    const routeName = file.replace('.tsx', '');
    destPath = path.join(appDir, routeName, 'page.tsx');
  }

  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, newContent);
  console.log(`Migrated ${file} to ${destPath}`);
}
