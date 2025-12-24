import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

export function requireRole(roles: string[] = []) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (roles.length && !roles.includes(user.role))
      return res.status(403).json({ message: "Forbidden" });
    return next();
  };
}
import { NextRequest, NextResponse } from "next/server";

const rolePermissions: Record<string, string[]> = {
  super_admin: ["*"],
  editorial_admin: [
    "articles:manage",
    "categories:manage",
    "tags:manage",
    "newsletter:manage",
  ],
  writer: ["articles:create", "articles:update", "articles:submit"],
  support: ["users:read"],
  tech_admin: ["*"],
};

export function hasPermission(role: string, permission: string) {
  const perms = rolePermissions[role] || [];
  return perms.includes("*") || perms.includes(permission);
}

export function requirePermission(permission: string) {
  return async (req: NextRequest) => {
    // @ts-ignore
    const user = req.user;
    if (!user || !hasPermission(user.role, permission)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return null;
  };
}
