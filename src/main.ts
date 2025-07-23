import { renderApp } from "./render";
import { fetchArticles } from "./fetchArticles";

import rawQuotes from "./quotes.json";
const quotes = rawQuotes as string[];
const qotd = quotes[Math.floor(Math.random() * quotes.length)];

document.body.innerHTML = "";
document.body.appendChild(renderApp(qotd, fetchArticles("/articles.csv")));
