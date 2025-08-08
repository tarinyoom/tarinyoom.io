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

function imageToVideoHandler(_state, node) {
  const url = node.url || '';
  const alt = node.alt || '';
  const title = node.title || undefined;

  console.log(`Processing image/video: ${url}`);

  if (url.startsWith('videos/')) {
    const ext = url.split('.').pop()?.toLowerCase();
    const mime =
      ext === 'webm' ? 'video/webm' :
      ext === 'ogg'  ? 'video/ogg'  :
                       'video/mp4';

    return {
      type: 'element',
      tagName: 'video',
      properties: {
        autoplay: true,
        muted: true,
        loop: true,
        playsinline: true,
      },
      children: [
        {
          type: 'element',
          tagName: 'source',
          properties: { src: url, type: mime },
          children: []
        },
        ...(alt ? [{ type: 'text', value: alt }] : [])
      ]
    };
  }

  const props = { src: url };
  if (alt) props.alt = alt;
  if (title) props.title = title;

  return {
    type: 'element',
    tagName: 'img',
    properties: props,
    children: []
  };
}

async function convertAll() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const mdPath = path.join(articlesDir, file);
    const htmlPath = path.join(publicDir, file.replace(/\.md$/, '.html'));

    const raw = fs.readFileSync(mdPath, 'utf8');
    const { content, data: frontmatter } = matter(raw);

    const bodyHtml = String(
      await unified()
        .use(remarkParse)
        .use(remarkRehype, {
          handlers: {
            image: imageToVideoHandler,
          },
        })
        .use(rehypeStringify)
        .process(content)
    );

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
