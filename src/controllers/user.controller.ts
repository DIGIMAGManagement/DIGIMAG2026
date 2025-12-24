import { Request, Response } from "express";
import UserService from "../services/user.service";

export default class UserController {
  static async list(req: Request, res: Response) {
    const items = await UserService.list();
    return res.json(items);
  }

  static async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await UserService.get(id);
    if (!item) return res.status(404).json({ message: "Not found" });
    return res.json({
      id: item.id,
      email: item.email,
      name: item.name,
      role: item.role,
    });
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await UserService.update(id, req.body);
    if (!item) return res.status(404).json({ message: "Not found" });
    return res.json({
      id: item.id,
      email: item.email,
      name: item.name,
      role: item.role,
    });
  }

  static async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ok = await UserService.remove(id);
    if (!ok) return res.status(404).json({ message: "Not found" });
    return res.status(204).send();
  }
}
