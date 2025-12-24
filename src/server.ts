import express from "express";
import helmet from "helmet";
import cors from "cors";
import apiRouter from "./routes/api";
import sequelize from "./config/database";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import logger from "./config/logger";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.use(pinoHttp({ logger }));

const limiter = rateLimit({ windowMs: 60_000, max: 120 });
app.use(limiter);

app.use("/api", apiRouter);

app.get("/health", (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: false });
    app.listen(port, () =>
      logger.info(`Server running on http://localhost:${port}`)
    );
  } catch (err) {
    logger.error({ err }, "Failed to start");
    process.exit(1);
  }
}

start();

app.use(errorHandler);

export default app;
