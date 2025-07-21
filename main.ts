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

function renderMainContent(): HTMLElement {
  return h("main", {}, [
    h("div", { className: "content" }, [
      h("p", { id: "long-text" }, [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ".repeat(20)
      ])
    ])
  ]);
}

function renderApp(): HTMLElement {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(renderHeader());
  fragment.appendChild(renderMainContent());
  return fragment as unknown as HTMLElement; // Fragment isn't HTMLElement, but body accepts it.
}

document.body.innerHTML = ""; // Clear default body
document.body.appendChild(renderApp());
