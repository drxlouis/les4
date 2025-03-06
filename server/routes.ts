import express, { Request, Response } from "express";
import { News, getAllNews, getNewsBySlug, addNews } from "./services/newService";

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.get("/", async (req: Request, res: Response) => {
  const news = await getAllNews();
  res.render("index", { title: "Home Page", news });
});

router.get("/nieuws/:slug", async (req: Request, res: Response) => {
  try {
    const article = await getNewsBySlug(req.params.slug);
    if (article) {
      res.render("detail", { title: article.title, article });
    } else {
      res.status(404).render("404", { title: "404" });
    }
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get("/add", (req: Request, res: Response): void => {
  res.render("add", { title: "Voeg Nieuws Toe" });
});

router.post("/add", async (req: Request, res: Response) => {
  const { slug, title, content, image } = req.body;
  const newArticle: News = { slug, title, content, image };
  try {
    await addNews(newArticle);
    res.redirect("/");
  } catch (error) {
    console.error('Error adding article:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.use((req: Request, res: Response): void => {
  res.status(404).render("404", { title: "404" });
});

export default router;