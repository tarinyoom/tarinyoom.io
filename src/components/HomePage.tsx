import { BlogPostCard } from "./BlogPostCard";
import { useState, useEffect } from "react";
import { fetchArticles, type BlogPost } from "../fetchArticles";

export function HomePage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const posts = await fetchArticles();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
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
