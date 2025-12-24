import { Request, Response } from "express";
import TagService from "../services/tag.service";

export default class TagController {
  static async list(req: Request, res: Response) {
    const items = await TagService.list();
    return res.json(items);
  }

  static async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await TagService.get(id);
    if (!item) return res.status(404).json({ message: "Not found" });
    return res.json(item);
  }

  static async create(req: Request, res: Response) {
    const item = await TagService.create(req.body);
    return res.status(201).json(item);
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await TagService.update(id, req.body);
    if (!item) return res.status(404).json({ message: "Not found" });
    return res.json(item);
  }

  static async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ok = await TagService.remove(id);
    if (!ok) return res.status(404).json({ message: "Not found" });
    return res.status(204).send();
  }
}
