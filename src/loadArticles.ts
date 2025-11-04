import { type ComponentType } from 'react';

// Import metadata
import articlesMetadata from '../articles/metadata.json';

// Import MDX components
import Article1 from '../articles/a001_hello_world.mdx';
import Article2 from '../articles/a002_dependency_shedding.mdx';
import Article3 from '../articles/a003_browser_dynamics.mdx';
import Article4 from '../articles/a004_kernel_visualization.mdx';
import Article5 from '../articles/a005_under_pressure.mdx';

export interface ArticleMetadata {
  id: number;
  title: string;
  date: string;
  tags: string[];
  summary: string;
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

// Map article IDs to their MDX components
const articleComponents: Record<number, ComponentType> = {
  1: Article1,
  2: Article2,
  3: Article3,
  4: Article4,
  5: Article5,
};

export function loadAllArticles(): [FullArticle, ArticleSummary][] {
  const articles = (articlesMetadata as ArticleMetadata[]).map((metadata) => {
    const Component = articleComponents[metadata.id];

    if (!Component) {
      throw new Error(`No component found for article ID ${metadata.id}`);
    }

    const slug = generateSlug(metadata.title);
    const formattedDate = formatDate(metadata.date);

    const fullArticle: FullArticle = {
      id: metadata.id,
      title: metadata.title,
      date: formattedDate,
      category: metadata.tags[0] || "Article",
      slug,
      Component,
    };

    const summary: ArticleSummary = {
      id: metadata.id,
      title: metadata.title,
      excerpt: metadata.summary,
      date: formattedDate,
      readTime: "5 min read",
      category: metadata.tags[0] || "Article",
      imageUrl: "https://images.unsplash.com/photo-1600340053706-32d1278206ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBzdW5saWdodHxlbnwxfHx8fDE3NjIxMzMwODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      slug,
    };

    return { fullArticle, summary, date: new Date(metadata.date) };
  });

  // Sort by date (newest first)
  articles.sort((a, b) => b.date.getTime() - a.date.getTime());

  return articles.map(({ fullArticle, summary }) => [fullArticle, summary]);
}
