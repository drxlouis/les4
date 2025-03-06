import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../data/news.json");

export interface News {
  slug: string;
  title: string;
  content: string;
  date: string; 
}

/**
 * Leest het JSON-bestand en geeft alle nieuwsartikelen terug.
 */
export const getNews = (): News[] => {
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData) as News[];
};

/**
 * Zoekt een nieuwsartikel op basis van de slug.
 */
export const getNewsBySlug = (slug: string): News | undefined => {
  const news = getNews();
  return news.find((article) => article.slug === slug);
};

/**
 * Voegt een nieuw nieuwsartikel toe aan het JSON-bestand.
 */
export const addNews = (newArticle: Omit<News, "slug">): News => {
  const news = getNews();
  const slug:string = newArticle.title.toLowerCase().replace(/\s/g, "-");
  const articleWithSlug: News = { slug: slug, ...newArticle };

  news.push(articleWithSlug);
  fs.writeFileSync(filePath, JSON.stringify(news, null, 2), "utf-8");

  return articleWithSlug;
};