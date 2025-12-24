import { Request, Response } from "express";
import ArticleService from "../services/article.service";

export default class ArticleController {
  static async create(req: Request, res: Response) {
    const article = await ArticleService.create(
      req.body,
      (req as any).user?.id
    );
    return res.status(201).json(article);
  }

  static async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const article = await ArticleService.get(id);
    if (!article) return res.status(404).json({ message: "Not found" });
    return res.json(article);
  }

  static async list(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const q = (req.query.q as string) || undefined;
    const status = (req.query.status as string) || undefined;
    const result = await ArticleService.list({ page, limit, q, status });
    return res.json(result);
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const article = await ArticleService.update(
      id,
      req.body,
      (req as any).user?.id
    );
    if (!article) return res.status(404).json({ message: "Not found" });
    return res.json(article);
  }

  static async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ok = await ArticleService.softDelete(id);
    if (!ok) return res.status(404).json({ message: "Not found" });
    return res.status(204).send();
  }
}
