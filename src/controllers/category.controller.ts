import { Request, Response } from "express";
import CategoryService from "../services/category.service";

export default class CategoryController {
  static async list(req: Request, res: Response) {
    const items = await CategoryService.list();
    return res.json(items);
  }

  static async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await CategoryService.get(id);
    if (!item) return res.status(404).json({ message: "Not found" });
    return res.json(item);
  }

  static async create(req: Request, res: Response) {
    const item = await CategoryService.create(req.body);
    return res.status(201).json(item);
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await CategoryService.update(id, req.body);
    if (!item) return res.status(404).json({ message: "Not found" });
    return res.json(item);
  }

  static async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ok = await CategoryService.remove(id);
    if (!ok) return res.status(404).json({ message: "Not found" });
    return res.status(204).send();
  }
}
