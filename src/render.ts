import { marked } from "marked";

import { Article } from "./types";

function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]> = {},
  children: (HTMLElement | string)[] = []
): HTMLElement {
  const el = document.createElement(tag);
  Object.assign(el, props);
  for (const child of children) {
    el.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
  }
  return el;
}

function renderHeader(): HTMLElement {
  return h("header", { className: "app-bar" }, [
    h("h1", {}, ["Adam's Dev Journal"]),
    h("a", {
      href: "https://github.com/tarinyoom",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "github-link"
    }, ["GitHub ↗"])
  ]);
}

function renderFooter(): HTMLElement {
  return h("footer", { className: "app-footer" }, [
    h("p", {}, ["© 2025 Adam Reynolds"])
  ]);
}

function renderArticles(articles: Article[]): HTMLElement[] {
  return articles.map(article => {
    const titleEl = h("h2", {}, [article.title]);
    const dateEl = h("p", { className: "date" }, [article.date]);
    const contentEl = h("div", { className: "markdown-body" }, []);
    const footerEl = h("hr", { className: "post-separator" }, []);

    const parsed = marked.parse(article.content);
    if (typeof parsed === "string") {
      contentEl.innerHTML = parsed;
    } else {
      parsed.then(html => {
        contentEl.innerHTML = html;
      });
    }

    return h("article", {}, [
      titleEl,
      dateEl,
      contentEl,
      footerEl
    ]);
  });
}

function renderMainContent(articlesPromise: Promise<Article[]>): HTMLElement {
  const container = h("main", {}, [
    h("div", { className: "content" }, [])
  ]);

  articlesPromise.then(articles => {
    const articleElements = renderArticles(articles);
    for (const el of articleElements) {
      container.querySelector(".content")?.appendChild(el);
    }
  }).catch(err => {
    const errorEl = h("div", { className: "error" }, [err.message]);
    container.querySelector(".content")?.appendChild(errorEl);
  });

  return container;
}

function renderApp(articlesPromise: Promise<Article[]>): HTMLElement {
  return h("div", {}, [
    renderHeader(),
    renderMainContent(articlesPromise),
    renderFooter()
  ]);
}

export { renderApp };
