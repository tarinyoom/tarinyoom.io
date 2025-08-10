import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import matter from 'gray-matter';

const articlesDir = path.resolve('articles');
const publicDir = path.resolve('public');

fs.mkdirSync(publicDir, { recursive: true });

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDirContents(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  ensureDir(destDir);

  for (const entry of fs.readdirSync(srcDir)) {
    const srcPath = path.join(srcDir, entry);
    const destPath = path.join(destDir, entry);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyDirContents(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function imageToVideoHandler(_state, node) {
  const url = node.url || '';
  const alt = node.alt || '';
  const title = node.title || undefined;

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
  // Copy assets first
  copyDirContents(path.join(articlesDir, 'images'), path.join(publicDir, 'images'));
  copyDirContents(path.join(articlesDir, 'videos'), path.join(publicDir, 'videos'));

  // Convert markdown → HTML
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const mdPath = path.join(articlesDir, file);
    const htmlPath = path.join(publicDir, file.replace(/\.md$/, '.html'));

    const raw = fs.readFileSync(mdPath, 'utf8');
    const { content, data: frontmatter } = matter(raw);

    const bodyHtml = String(
      await unified()
        .use(remarkParse)
        .use(remarkMath, {
          singleDollarTextMath: true,
        })
        .use(remarkRehype, {
          handlers: {
            image: imageToVideoHandler,
          },
        })
        .use(rehypeKatex, {
          strict: 'ignore'
        })
        .use(rehypeStringify)
        .process(content)
    );

    const formattedDate = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

    const titleHtml = `<h2>${frontmatter.title || ''}</h2>`;
    const dateHtml = `<p class="date">${formattedDate}</p>`;
    const finalHtml = `${titleHtml}\n${dateHtml}\n${bodyHtml}`;

    fs.writeFileSync(htmlPath, finalHtml);
    console.log(`Converted: ${file} → ${path.relative('.', htmlPath)}`);
  }
}

convertAll().catch(err => {
  console.error(err);
  process.exit(1);
});
