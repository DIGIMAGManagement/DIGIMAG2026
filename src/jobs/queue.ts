import Bull from "bull";
import redisConfig from "../config/redisClient";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

export const publishQueue = new Bull("publish-queue", redisUrl);
export const newsletterQueue = new Bull("newsletter-queue", redisUrl);

// example worker registration (can be expanded in worker process)
publishQueue.process(async (job) => {
  const { articleId } = job.data;
  // TODO: perform publish (move status to published, invalidate cache)
  console.log("Publishing article", articleId);
});

export default { publishQueue, newsletterQueue };
