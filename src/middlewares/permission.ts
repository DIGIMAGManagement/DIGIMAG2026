import { Request, Response, NextFunction } from "express";
import rolePermissions from "../config/rbac";
import { AuthRequest } from "./auth";

export function requirePermission(permission: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    const perms = rolePermissions[user.role] || [];
    if (perms.includes("*") || perms.includes(permission)) return next();
    return res.status(403).json({ message: "Forbidden" });
  };
}
