import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeVideoTransform from './rehype-video-transform.mjs';

export default defineConfig({
  root: '.',
  plugins: [
    { enforce: 'pre', ...mdx({
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkMath,
        remarkGfm,
      ],
      rehypePlugins: [rehypeKatex, rehypeVideoTransform],
    })},
    react(),
  ],
});
