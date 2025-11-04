import { type FullArticle } from "../loadArticles";

interface ArticlePageProps {
  article: FullArticle;
}

export function ArticlePage({ article }: ArticlePageProps) {
  const { Component } = article;

  return (
    <div className="flex-1">
      <article className="mx-auto w-full max-w-4xl px-4 py-12 md:px-8 md:py-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <Component />
        </div>
      </article>
    </div>
  );
}
