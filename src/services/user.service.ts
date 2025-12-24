import User from "../models/user";
import redis from "../config/redisClient";

export default class UserService {
  static async list() {
    const key = "users:list";
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);
    const items = await User.findAll({ order: [["createdAt", "DESC"]] });
    await redis.set(key, JSON.stringify(items), "EX", 60);
    return items;
  }

  static async get(id: number) {
    return User.findByPk(id);
  }

  static async update(id: number, payload: any) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update(payload);
    await redis.del("users:list");
    return user;
  }

  static async remove(id: number) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    await redis.del("users:list");
    return true;
  }
}
