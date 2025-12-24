import Article from "../models/article";
import ArticleVersion from "../models/article_version";
import redis from "../config/redisClient";

interface ListOpts {
  page?: number;
  limit?: number;
  q?: string;
  status?: string;
}

export default class ArticleService {
  static async create(payload: any, actorId?: number) {
    const article = await Article.create(payload);
    // create version
    await ArticleVersion.create({
      articleId: article.id,
      version: 1,
      title: article.title,
      content: article.content,
      metadata: article.metadata,
    });
    await redis.del("articles:list");
    return article;
  }

  static async get(id: number) {
    const cacheKey = `articles:byId:${id}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
    const article = await Article.findByPk(id);
    if (!article) return null;
    await redis.set(cacheKey, JSON.stringify(article), "EX", 60);
    return article;
  }

  static async list(opts: ListOpts = {}) {
    const page = opts.page || 1;
    const limit = opts.limit || 10;
    const offset = (page - 1) * limit;
    const where: any = {};
    if (opts.status) where.status = opts.status;
    if (opts.q) where.title = { $like: `%${opts.q}%` } as any;
    const { rows, count } = await Article.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    } as any);
    return { items: rows, total: count, page, limit };
  }

  static async update(id: number, payload: any, actorId?: number) {
    const article = await Article.findByPk(id);
    if (!article) return null;
    await article.update(payload);
    // increment version
    const latest = await ArticleVersion.max("version", {
      where: { articleId: id },
    });
    const next = (latest || 0) + 1;
    await ArticleVersion.create({
      articleId: id,
      version: next,
      title: article.title,
      content: article.content,
      metadata: article.metadata,
    });
    await redis.del(`articles:byId:${id}`);
    await redis.del("articles:list");
    return article;
  }

  static async softDelete(id: number) {
    const article = await Article.findByPk(id);
    if (!article) return null;
    await article.destroy();
    await redis.del(`articles:byId:${id}`);
    await redis.del("articles:list");
    return true;
  }
}
