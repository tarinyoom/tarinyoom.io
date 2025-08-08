import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import matter from 'gray-matter';

const articlesDir = path.resolve('articles');
const publicDir = path.resolve('public');

fs.mkdirSync(publicDir, { recursive: true });

async function convertAll() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const mdPath = path.join(articlesDir, file);
    const htmlPath = path.join(publicDir, file.replace(/\.md$/, '.html'));

    const raw = fs.readFileSync(mdPath, 'utf8');
    const { content, data: frontmatter } = matter(raw);

    // Build HTML body from markdown
    const bodyHtml = String(
      await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(content)
    );

    // Frontmatter injection — defaults if missing
    const titleHtml = `<h2>${frontmatter.title || ''}</h2>`;
    const dateHtml = `<p class="date">${frontmatter.date || ''}</p>`;

    const finalHtml = `${titleHtml}\n${dateHtml}\n${bodyHtml}`;

    fs.writeFileSync(htmlPath, finalHtml);
    console.log(`Converted: ${file} → ${path.relative('.', htmlPath)}`);
  }
}

convertAll().catch(err => {
  console.error(err);
  process.exit(1);
});
