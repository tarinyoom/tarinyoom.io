interface ArticleSummary {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  slug: string;
}

interface FullArticle {
  id: number;
  title: string;
  date: string;
  category: string;
  htmlContent: string;
  slug: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchArticles(): Promise<[FullArticle, ArticleSummary][]> {
  // Fetch articles.csv
  const response = await fetch('/articles.csv');
  if (!response.ok) {
    throw new Error(`Failed to fetch articles list: ${response.statusText}`);
  }

  const csvText = await response.text();
  const entries = csvText.split("\n").map(line => line.trim()).filter(Boolean);

  // Parse CSV entries
  const articleInfo = entries.map(entry => {
    const [name, date] = entry.split(" ");
    if (!name || !date) {
      throw new Error(`Invalid entry in articles.csv: ${entry}`);
    }
    return { name, date };
  });

  // Fetch all articles
  const articlePromises = articleInfo.map(async ({ name, date }) => {
    const articleResponse = await fetch(`/${name}`);
    if (!articleResponse.ok) {
      throw new Error(`Failed to fetch article: ${articleResponse.statusText}`);
    }

    const html = await articleResponse.text();

    // Parse HTML to extract title and first paragraph
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const title = doc.querySelector('h2')?.textContent || 'Untitled';

    // Get first paragraph (first <p> tag that doesn't have a class)
    const paragraphs = doc.querySelectorAll('p');
    let excerpt = '';
    for (const p of paragraphs) {
      if (!p.className) {
        excerpt = p.textContent || '';
        break;
      }
    }

    return {
      name,
      date,
      title,
      excerpt,
      htmlContent: html
    };
  });

  const articles = await Promise.all(articlePromises);

  // Sort by date (newest first)
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Convert to (FullArticle, ArticleSummary) pairs
  const pairs: [FullArticle, ArticleSummary][] = articles.map((article, index) => {
    const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const slug = generateSlug(article.title);

    const fullArticle: FullArticle = {
      id: index + 1,
      title: article.title,
      date: formattedDate,
      category: "Article",
      htmlContent: article.htmlContent,
      slug: slug
    };

    const summary: ArticleSummary = {
      id: index + 1,
      title: article.title,
      excerpt: article.excerpt,
      date: formattedDate,
      readTime: "5 min read",
      category: "Article",
      imageUrl: "https://images.unsplash.com/photo-1600340053706-32d1278206ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBzdW5saWdodHxlbnwxfHx8fDE3NjIxMzMwODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      slug: slug
    };

    return [fullArticle, summary];
  });

  return pairs;
}

export { fetchArticles };
export type { ArticleSummary, FullArticle };
