import Author from "../models/author";
import redis from "../config/redisClient";

export default class AuthorService {
  static async list() {
    const key = "authors:list";
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);
    const items = await Author.findAll({ order: [["createdAt", "DESC"]] });
    await redis.set(key, JSON.stringify(items), "EX", 60);
    return items;
  }

  static async get(id: number) {
    return Author.findByPk(id);
  }

  static async create(payload: any) {
    const item = await Author.create(payload);
    await redis.del("authors:list");
    return item;
  }

  static async update(id: number, payload: any) {
    const item = await Author.findByPk(id);
    if (!item) return null;
    await item.update(payload);
    await redis.del("authors:list");
    return item;
  }

  static async remove(id: number) {
    const item = await Author.findByPk(id);
    if (!item) return null;
    await item.destroy();
    await redis.del("authors:list");
    return true;
  }
}
