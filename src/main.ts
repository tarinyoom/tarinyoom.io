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
    h("h1", {}, ["My Website"])
  ]);
}

type Article = {
  title: string;
  date: string;
  tags: string[];
  content: string;
};

function fetchArticles(): Article[] {
  return [
    {
      title: "First Article",
      date: "2023-10-01",
      tags: ["tag1", "tag2"],
      content: "This is the content of the first article."
    },
    {
      title: "Second Article",
      date: "2023-10-02",
      tags: ["tag2", "tag3"],
      content: "This is the content of the second article."
    }
  ];
}

function renderArticle(article: Article): HTMLElement {
  return h("article", {}, [
    h("h2", {}, [article.title]),
    h("p", { className: "date" }, [article.date]),
    h("p", { className: "tags" }, article.tags.map(tag => h("span", { className: "tag" }, [tag]))),
    h("p", {}, [article.content])
  ]);
}

function renderMainContent(): HTMLElement {
  const articles = fetchArticles();
  const articleElements = articles.map(renderArticle);
  return h("main", {}, [
    h("div", { className: "content" }, articleElements)
  ]);
}

function renderApp(): HTMLElement {
  return h("div", {}, [
    renderHeader(),
    renderMainContent()
  ]);
}

document.body.innerHTML = "";
document.body.appendChild(renderApp());
