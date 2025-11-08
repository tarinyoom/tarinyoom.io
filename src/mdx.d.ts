declare module '*.mdx' {
  import { ComponentType } from 'react';

  export interface ArticleMetadata {
    title: string;
    date: string;
    tags?: string[];
  }

  const MDXComponent: ComponentType;
  export default MDXComponent;
  export const frontmatter: ArticleMetadata;
}
