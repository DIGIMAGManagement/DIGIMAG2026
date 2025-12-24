// Separate worker process to run background jobs (newsletter sending, publishing)
import "dotenv/config";
import newsletterWorker from "./jobs/newsletterWorker";
import { publishQueue } from "./jobs/queue";
import logger from "./config/logger";

logger.info("Worker started");

// publishQueue processors may be registered here or in their own worker files
publishQueue.on("failed", (job, err) => {
  logger.error({ job, err }, "Publish job failed");
});

process.on("SIGINT", async () => {
  logger.info("Worker shutting down");
  process.exit(0);
});
