import { BlogPostCard } from "./BlogPostCard";
import { useState, useEffect } from "react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
}

export function HomePage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
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
            excerpt
          };
        });

        const articles = await Promise.all(articlePromises);

        // Sort by date (newest first)
        articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Convert to BlogPost format
        const posts: BlogPost[] = articles.map((article, index) => ({
          id: index + 1,
          title: article.title,
          excerpt: article.excerpt,
          date: new Date(article.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          readTime: "5 min read",
          category: "Article",
          imageUrl: "https://images.unsplash.com/photo-1600340053706-32d1278206ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBzdW5saWdodHxlbnwxfHx8fDE3NjIxMzMwODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        }));

        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading articles...</div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-background to-muted/30 py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-foreground">Welcome!</h1>
            <p className="text-muted-foreground">
              Welcome to my blog. Below are some articles related to my interests at the intersection of math and software. I'm currently building an in-browser fluid dynamics simulation at:&nbsp;
              <a
                href="https://sph.tarinyoom.io"
                target="_blank"
                rel="noopener noreferrer"
              >sph.tarinyoom.io
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <h2 className="text-foreground">Articles</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.category}
                  imageUrl={post.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
