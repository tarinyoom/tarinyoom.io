import { RouterProvider, createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { ArticlePage } from "./components/ArticlePage";
import { loadAllArticles } from "./loadArticles";

// Load articles synchronously since they're bundled with the app
const articlePairs = loadAllArticles();
const fullArticles = articlePairs.map(([full, _]) => full);
const articles = articlePairs.map(([_, summary]) => summary);

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage articles={articles} />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      ...fullArticles.map((article) => ({
        path: `articles/${article.slug}`,
        element: <ArticlePage article={article} />,
      })),
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
