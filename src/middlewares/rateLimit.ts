import { NextRequest, NextResponse } from "next/server";
import redis from "../cache/redisClient";

const WINDOW_SIZE = 60; // seconds
const MAX_REQUESTS = 100;

export async function rateLimit(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const key = `ratelimit:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, WINDOW_SIZE);
  }
  if (count > MAX_REQUESTS) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  return null;
}
