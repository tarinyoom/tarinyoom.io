import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const articlesDir = path.resolve('articles');
const publicDir = path.resolve('public');

fs.mkdirSync(publicDir, { recursive: true });

async function convertAll() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const mdPath = path.join(articlesDir, file);
    const htmlPath = path.join(
      publicDir,
      file.replace(/\.md$/, '.html')
    );

    const markdown = fs.readFileSync(mdPath, 'utf8');

    const fileResult = await unified()
      .use(remarkParse)        // Parse Markdown to MDAST
      .use(remarkRehype)       // Transform MDAST to HAST
      .use(rehypeStringify)    // Serialize HAST to HTML
      .process(markdown);

    fs.writeFileSync(htmlPath, String(fileResult));
    console.log(`Converted: ${file} → ${path.relative('.', htmlPath)}`);
  }
}

convertAll().catch(err => {
  console.error(err);
  process.exit(1);
});
