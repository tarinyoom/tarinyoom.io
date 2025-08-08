import { Article } from "./types";

async function fetchArticle(filepath: string, date: string): Promise<Article> {
  const response = await fetch(filepath);
  if (!response.ok) {
    throw new Error(`Failed to fetch article: ${response.statusText}`);
  }

  const raw = await response.text();
  console.log(`Fetched article from ${filepath} with date ${date}: ${raw}`);
  return raw;
}

async function fetchArticles(csvPath: string): Promise<Article[]> {
  const response = await fetch(csvPath);
  if (!response.ok) {
    throw new Error(`Failed to fetch articles list: ${response.statusText}`);
  }

  const csvText = await response.text();
  const entries = csvText.split("\n").map(line => line.trim()).filter(Boolean);
  const articleInfo = entries.map(entry => {
    const [name, date] = entry.split(" ");
    if (!name || !date) {
      throw new Error(`Invalid entry in articles.csv: ${entry}`);
    }
    return [name, date];
  });

  const articleFetchPromises = articleInfo
    .map(info => ["/" + info[0], info[1]] as const)
    .map(info => fetchArticle(info[0], info[1]));

  const unsorted = await Promise.all(articleFetchPromises);
  return unsorted.sort((a, b) => new Date(b[1]).getTime() - new Date(a[1]).getTime());
}

export { fetchArticles };
