import { Article } from "./types";

function parseRawArticle(raw: string, date: string): Article {
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

  const { title, tags } = data;
  if (typeof title !== "string" || !Array.isArray(tags)) {
    throw new Error("Missing or invalid required fields in frontmatter");
  }

  return {
    title,
    date,
    tags,
    content,
  };
}

async function fetchArticle(filepath: string, date: string): Promise<Article> {
  const response = await fetch(filepath);
  if (!response.ok) {
    throw new Error(`Failed to fetch article: ${response.statusText}`);
  }

  const raw = await response.text();
  const article = parseRawArticle(raw, date);
  return article;
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
    .map(info => ["/articles/" + info[0], info[1]] as const)
    .map(info => fetchArticle(info[0], info[1]));

  const unsorted = await Promise.all(articleFetchPromises);
  return unsorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export { fetchArticles };
