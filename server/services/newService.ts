// Importeer sql uit db.ts
import sql from "./db";

// Interface voor een nieuwsartikel
export interface News {
  id?: number;
  slug?: string;
  title: string;
  content?: string;
  image?: string;
}

// Alle nieuwsartikelen ophalen
export async function getAllNews(): Promise<News[]> {
    const data : News[] = await sql`select * from news`;
    return data;
}

// Nieuwsartikel ophalen op basis van slug
export async function getNewsBySlug(slug: string): Promise<News | null> {
  const data : News[] = await sql`select * from news where slug = ${slug}`;
  return data.length > 0 ? data[0] : null;
}

// Nieuwsartikel toevoegen
export async function addNews(news: News): Promise<News> {
  news.slug = news.slug || news.title.toLowerCase().replace(/\s+/g, '-');
  
  const [newArticle] = await sql<News[]>`
    insert into news (slug, title, content, image)
    values (${news.slug || ''}, ${news.title}, ${news.content || ''}, ${news.image || ''})
    returning *
  `;
  return newArticle;
}

