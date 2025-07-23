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

export function renderHeader(): HTMLElement {
  return h("header", { className: "app-bar" }, [
    h("h1", {}, ["Adam's Dev Journal"])
  ]);
}

function renderArticle(articlePromise: Promise<Article>): HTMLElement {
  const titleEl = h("h2", {}, []);
  const dateEl = h("p", { className: "date" }, []);
  const contentEl = h("div", { className: "markdown-body" }, []);
  const footerEl = h("hr", { className: "post-separator" }, []);

  const container = h("article", {}, [
    titleEl,
    dateEl,
    contentEl,
    footerEl
  ]);

  articlePromise.then(async article => {
    titleEl.textContent = article.title;
    dateEl.textContent = article.date;

    contentEl.innerHTML = await marked.parse(article.content);
  }).catch(err => {
    titleEl.textContent = "Error loading article";
    dateEl.textContent = "";
    contentEl.textContent = err.message;
  });

  return container;
}

function renderMainContent(articlePromises: Promise<Article>[]): HTMLElement {
  const articleElements = articlePromises.map(renderArticle);
  return h("main", {}, [
    h("div", { className: "content" }, articleElements)
  ]);
}

function renderApp(articlePromises: Promise<Article>[]): HTMLElement {
  return h("div", {}, [
    renderHeader(),
    renderMainContent(articlePromises)
  ]);
}

export { renderApp };
