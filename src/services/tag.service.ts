import Tag from "../models/tag";
import redis from "../config/redisClient";

export default class TagService {
  static async list() {
    const key = "tags:list";
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);
    const items = await Tag.findAll({ order: [["createdAt", "DESC"]] });
    await redis.set(key, JSON.stringify(items), "EX", 60);
    return items;
  }

  static async get(id: number) {
    return Tag.findByPk(id);
  }

  static async create(payload: any) {
    const item = await Tag.create(payload);
    await redis.del("tags:list");
    return item;
  }

  static async update(id: number, payload: any) {
    const item = await Tag.findByPk(id);
    if (!item) return null;
    await item.update(payload);
    await redis.del("tags:list");
    return item;
  }

  static async remove(id: number) {
    const item = await Tag.findByPk(id);
    if (!item) return null;
    await item.destroy();
    await redis.del("tags:list");
    return true;
  }
}
