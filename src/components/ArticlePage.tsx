import { type FullArticle } from "../loadArticles";

interface ArticlePageProps {
  article: FullArticle;
}

export function ArticlePage({ article }: ArticlePageProps) {
  const { Component, title, date } = article;

  return (
    <div className="flex-1">
      <article className="mx-auto w-full max-w-4xl px-4 py-12 md:px-8 md:py-16">
        <header className="mb-8 border-b border-border pb-8">
          <h1 className="mb-2 text-4xl text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">{date}</p>
        </header>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <Component />
        </div>
      </article>
    </div>
  );
}
