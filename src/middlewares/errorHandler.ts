import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error({ err, path: req.path }, "Unhandled error");
  const status = err.status || 500;
  const body = { message: err.message || "Internal Server Error" };
  return res.status(status).json(body);
}
import { NextRequest, NextResponse } from "next/server";
