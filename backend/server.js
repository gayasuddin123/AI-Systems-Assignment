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

// ── Connect to MongoDB ───────────────────
// ── Connect to MongoDB before requests ───
app.use(async (req, res, next) => {
  await connectDB();
  next();
});
// ── Security & parsing ───────────────────
app.use(helmet());

// ── CORS — allow your frontend domain ────
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5000",
  settings.clientUrl,
];

// Remove empty strings and duplicates
const uniqueOrigins = [...new Set(allowedOrigins.filter(Boolean))];

app.use(
  cors({
    origin: uniqueOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));

// Morgan logging only in development
if (settings.nodeEnv !== "production") {
  app.use(morgan("dev"));
}

// ── Routes ────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "Sustainable AI Platform API",
    version: "1.0.0",
    status: "running",
    documentation: "/api/health",
  });
});

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

// ── Local development only ────────────────
// On Vercel, the app is imported by api/index.js — no listen needed
if (settings.nodeEnv !== "production") {
  app.listen(settings.port, () => {
    logger.info(
      `Server running on port ${settings.port} [${settings.nodeEnv}]`
    );
  });
}

// ── Export for Vercel ─────────────────────
export default app;