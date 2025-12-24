import { Request, Response } from "express";
import NewsletterService from "./newsletterService";

export default class NewsletterController {
  static async create(req: Request, res: Response) {
    const nl = await NewsletterService.create(req.body);
    return res.status(201).json(nl);
  }

  static async subscribe(req: Request, res: Response) {
    const { email, name } = req.body;
    await NewsletterService.subscribe(email, name);
    return res.status(200).json({ ok: true });
  }

  static async unsubscribe(req: Request, res: Response) {
    const { email } = req.body;
    await NewsletterService.unsubscribe(email);
    return res.status(200).json({ ok: true });
  }
}
