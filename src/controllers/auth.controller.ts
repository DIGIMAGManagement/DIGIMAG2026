import { Request, Response } from "express";
import AuthService from "../services/auth.service";

export default class AuthController {
  static async register(req: Request, res: Response) {
    const body = req.body;
    if (!body.email || !body.password)
      return res.status(400).json({ message: "email and password required" });
    const user = await AuthService.register(body);
    return res.status(201).json(user);
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "email and password required" });
    const data = await AuthService.authenticate(email, password);
    if (!data) return res.status(401).json({ message: "Invalid credentials" });
    return res.json(data);
  }

  static async refresh(req: Request, res: Response) {
    const { refresh } = req.body;
    if (!refresh)
      return res.status(400).json({ message: "refresh token required" });
    const tokens = await AuthService.refresh(refresh);
    if (!tokens)
      return res.status(401).json({ message: "Invalid refresh token" });
    return res.json(tokens);
  }

  static async logout(req: Request, res: Response) {
    const { refresh } = req.body;
    if (!refresh)
      return res.status(400).json({ message: "refresh token required" });
    await AuthService.revoke(refresh);
    return res.json({ ok: true });
  }
}
