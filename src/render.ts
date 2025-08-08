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

function renderContentPreface(): HTMLElement {
  return h("div", { className: "content-preface" }, [
    h("p", { }, ["My notes and opinions on software development."]),
    h("hr", { className: "post-separator" }, [])
  ]);
}

function renderFooter(): HTMLElement {
  return h("footer", { className: "app-footer" }, [
    h("p", {}, ["© 2025 Adam Reynolds"])
  ]);
}

function renderArticles(articles: DocumentFragment[]): HTMLElement[] {
  return articles.map(article => {
    const contentEl = h("div", { className: "article-body" }, []);
    contentEl.append(article);
    const footerEl = h("hr", { className: "post-separator" }, []);
    return h("article", {}, [contentEl, footerEl]);
  });
}

function renderMainContent(articlesPromise: Promise<DocumentFragment[]>): HTMLElement {
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

function renderApp(qotd: string, articlesPromise: Promise<DocumentFragment[]>): HTMLElement {
  return h("div", {}, [
    renderHeader(),
    renderContentPreface(),
    renderMainContent(articlesPromise),
    renderFooter()
  ]);
}

export { renderApp };
