import express, { Request, Response } from "express";
import { getNews, getNewsBySlug, addNews } from "./data/newsService";

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.get("/", (req: Request, res: Response): void => {
  const news = getNews();
  res.render("index", { title: "Home Page", news });
});

router.get("/nieuws/:slug", (req: Request, res: Response): void => {
  const article = getNewsBySlug(req.params.slug);
  if (article) {
    res.render("detail", { title: article.title, article });
  } else {
    res.status(404).render("404", { title: "404" });
  }
});

router.get("/add", (req: Request, res: Response): void => {
  res.render("add", { title: "Voeg Nieuws Toe" });
});

router.post("/add", (req: Request, res: Response): void => {
  const { title, content, date } = req.body;
  const newArticle = { title, content, date };
  addNews(newArticle);
  res.redirect("/");
});

router.use((req: Request, res: Response): void => {
  res.status(404).render("404", { title: "404" });
});

export default router;
