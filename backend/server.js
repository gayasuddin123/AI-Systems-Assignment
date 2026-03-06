import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import { settings } from "./config/settings.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import proposalRoutes from "./routes/proposalRoutes.js";
import impactRoutes from "./routes/impactRoutes.js";
import whatsappRoutes from "./routes/whatsappRoutes.js";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();

// ── Security & parsing ────────────────────
app.use(helmet());
app.use(
  cors({
    origin: settings.clientUrl,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

// ── Routes ────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    environment: settings.nodeEnv,
    timestamp: new Date().toISOString(),
    modules: {
      category_generator: "active",
      proposal_generator: "active",
      impact_reporting: "planned",
      whatsapp_bot: "planned",
    },
  });
});

app.use("/api/v1/categorize", categoryRoutes);
app.use("/api/v1/proposals", proposalRoutes);
app.use("/api/v1/impact", impactRoutes);
app.use("/api/v1/whatsapp", whatsappRoutes);

// ── Error handling ────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start ─────────────────────────────────
const start = async () => {
  await connectDB();
  app.listen(settings.port, () => {
    logger.info(
      `Server running on port ${settings.port} [${settings.nodeEnv}]`
    );
  });
};

start();

export default app;