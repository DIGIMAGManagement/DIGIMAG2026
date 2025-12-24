import { Request, Response } from "express";
import AuthorService from "../services/author.service";

export default class AuthorController {
  static async list(req: Request, res: Response) {
    const items = await AuthorService.list();
    return res.json(items);
  }

  static async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await AuthorService.get(id);
    if (!item) return res.status(404).json({ message: "Not found" });
    return res.json(item);
  }

  static async create(req: Request, res: Response) {
    const item = await AuthorService.create(req.body);
    return res.status(201).json(item);
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await AuthorService.update(id, req.body);
    if (!item) return res.status(404).json({ message: "Not found" });
    return res.json(item);
  }

  static async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ok = await AuthorService.remove(id);
    if (!ok) return res.status(404).json({ message: "Not found" });
    return res.status(204).send();
  }
}
