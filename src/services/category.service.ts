import redis from "../config/redisClient";
import Category from "../models/category";

export default class CategoryService {
  static async list() {
    const cacheKey = "categories:list";
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
    const items = await Category.findAll({ order: [["createdAt", "DESC"]] });
    await redis.set(cacheKey, JSON.stringify(items), "EX", 60);
    return items;
  }

  static async get(id: number) {
    return Category.findByPk(id);
  }

  static async create(payload: any) {
    const cat = await Category.create(payload);
    await redis.del("categories:list");
    return cat;
  }

  static async update(id: number, payload: any) {
    const cat = await Category.findByPk(id);
    if (!cat) return null;
    await cat.update(payload);
    await redis.del("categories:list");
    return cat;
  }

  static async remove(id: number) {
    const cat = await Category.findByPk(id);
    if (!cat) return null;
    await cat.destroy();
    await redis.del("categories:list");
    return true;
  }
}
