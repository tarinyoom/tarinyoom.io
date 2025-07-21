import { marked } from "marked";

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

function parseRawArticle(raw: string): Article {
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/m.exec(raw);
  if (!match) {
    throw new Error("Missing or invalid frontmatter");
  }

  const frontmatter = match[1];
  const content = match[2].trim();

  const lines = frontmatter.split("\n");
  const data: Record<string, any> = {};

  for (const line of lines) {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) continue;

    const rawValue = rest.join(":").trim();

    let value: any;
    if (rawValue.startsWith('"') && rawValue.endsWith('"')) {
      value = rawValue.slice(1, -1); // remove quotes
    } else if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      value = rawValue
        .slice(1, -1)
        .split(",")
        .map(s => s.trim().replace(/^"|"$/g, ""));
    } else {
      value = rawValue;
    }

    data[key.trim()] = value;
  }

  const { title, date, tags } = data;
  if (typeof title !== "string" || typeof date !== "string" || !Array.isArray(tags)) {
    throw new Error("Missing or invalid required fields in frontmatter");
  }

  return {
    title,
    date,
    tags,
    content,
  };
}

async function fetchArticle(filepath: string): Promise<Article> {
  const response = await fetch(filepath);
  if (!response.ok) {
    throw new Error(`Failed to fetch article: ${response.statusText}`);
  }

  const raw = await response.text();
  const article = parseRawArticle(raw);
  return article;
}

function renderArticle(articlePromise: Promise<Article>): HTMLElement {
  const titleEl = h("h2", {}, ["Loading title..."]);
  const dateEl = h("p", { className: "date" }, ["Loading date..."]);
  const tagsEl = h("p", { className: "tags" }, ["Loading tags..."]);
  const contentEl = h("div", { className: "markdown-body" }, ["Loading content..."]);

  const container = h("article", {}, [
    titleEl,
    dateEl,
    tagsEl,
    contentEl
  ]);

  articlePromise.then(async article => {
    titleEl.textContent = article.title;
    dateEl.textContent = article.date;

    tagsEl.replaceChildren(...article.tags.map(tag =>
      h("span", { className: "tag" }, [tag])
    ));

    contentEl.innerHTML = await marked.parse(article.content);
  }).catch(err => {
    titleEl.textContent = "Error loading article";
    dateEl.textContent = "";
    tagsEl.textContent = "";
    contentEl.textContent = err.message;
  });

  return container;
}

function renderMainContent(): HTMLElement {
  const article = fetchArticle("/articles/a01_hello.md");
  const articleElements = [renderArticle(article)];
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
