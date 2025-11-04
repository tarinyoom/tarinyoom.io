import { BrowserRouter, Routes, Route } from "react-router";
import { useMemo } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { ArticlePage } from "./components/ArticlePage";
import { loadAllArticles, type ArticleSummary, type FullArticle } from "./loadArticles";

export default function App() {
  // Load articles synchronously since they're bundled with the app
  const { articles, fullArticles } = useMemo(() => {
    const articlePairs = loadAllArticles();
    return {
      fullArticles: articlePairs.map(([full, _]) => full),
      articles: articlePairs.map(([_, summary]) => summary),
    };
  }, []);

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
