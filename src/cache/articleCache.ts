import redis from "./redisClient";

const ARTICLE_CACHE_PREFIX = "article:";

export async function getArticleFromCache(id: number) {
  const data = await redis.get(ARTICLE_CACHE_PREFIX + id);
  return data ? JSON.parse(data) : null;
}

export async function setArticleToCache(id: number, article: any) {
  await redis.set(ARTICLE_CACHE_PREFIX + id, JSON.stringify(article), {
    EX: 3600,
  });
}

export async function invalidateArticleCache(id: number) {
  await redis.del(ARTICLE_CACHE_PREFIX + id);
}
