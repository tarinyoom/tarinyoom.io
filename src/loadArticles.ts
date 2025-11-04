import { type ComponentType } from 'react';

export interface ArticleMetadata {
  title: string;
  date: string;
  tags?: string[];
}

export interface ArticleSummary {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  slug: string;
}

export interface FullArticle {
  id: number;
  title: string;
  date: string;
  category: string;
  slug: string;
  Component: ComponentType;
  metadata: ArticleMetadata;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Import all MDX files from articles directory
const articleModules = import.meta.glob<{
  default: ComponentType;
  frontmatter: ArticleMetadata;
}>('../articles/*.mdx', { eager: true });

export function loadAllArticles(): [FullArticle, ArticleSummary][] {
  const articles = Object.entries(articleModules).map(([path, module], index) => {
    const metadata = module.frontmatter;
    const Component = module.default;

    const slug = generateSlug(metadata.title);
    const formattedDate = formatDate(metadata.date);

    // Extract first paragraph as excerpt
    // Since we can't easily parse MDX content, we'll use a placeholder for now
    const excerpt = `Read about ${metadata.title.toLowerCase()}`;

    const fullArticle: FullArticle = {
      id: index + 1,
      title: metadata.title,
      date: formattedDate,
      category: metadata.tags?.[0] || "Article",
      slug,
      Component,
      metadata,
    };

    const summary: ArticleSummary = {
      id: index + 1,
      title: metadata.title,
      excerpt,
      date: formattedDate,
      readTime: "5 min read",
      category: metadata.tags?.[0] || "Article",
      imageUrl: "https://images.unsplash.com/photo-1600340053706-32d1278206ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBzdW5saWdodHxlbnwxfHx8fDE3NjIxMzMwODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      slug,
    };

    return { fullArticle, summary, date: new Date(metadata.date) };
  });

  // Sort by date (newest first)
  articles.sort((a, b) => b.date.getTime() - a.date.getTime());

  return articles.map(({ fullArticle, summary }) => [fullArticle, summary]);
}
