import { renderApp } from "./render";
import { fetchArticles } from "./fetchArticles";

document.body.innerHTML = "";
document.body.appendChild(renderApp(fetchArticles("/articles.csv")));
