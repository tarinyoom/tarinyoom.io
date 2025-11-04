import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { ArticlePage } from "./components/ArticlePage";
import { fetchArticles, type ArticleSummary, type FullArticle } from "./fetchArticles";

export default function App() {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [fullArticles, setFullArticles] = useState<FullArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const articlePairs = await fetchArticles();
        // Extract full articles and summaries from the pairs
        const fullArts = articlePairs.map(([full, _]) => full);
        const summaries = articlePairs.map(([_, summary]) => summary);
        setFullArticles(fullArts);
        setArticles(summaries);
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
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage articles={articles} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {fullArticles.map((article) => (
              <Route
                key={article.slug}
                path={`/articles/${article.slug}`}
                element={<ArticlePage article={article} />}
              />
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
