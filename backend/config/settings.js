import dotenv from "dotenv";
dotenv.config();

export const settings = {
  // ── OpenRouter AI ───────────────────────
  openrouterApiKey: process.env.OPENROUTER_API_KEY,
  openrouterBaseUrl:
    process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
  openrouterModel:
    process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-001",
  openrouterTemperature:
    parseFloat(process.env.OPENROUTER_TEMPERATURE) || 0.3,
  openrouterMaxTokens:
    parseInt(process.env.OPENROUTER_MAX_TOKENS) || 2048,
  openrouterSiteUrl:
    process.env.OPENROUTER_SITE_URL || "http://localhost:5173",
  openrouterAppName:
    process.env.OPENROUTER_APP_NAME || "Sustainable AI Platform",

  // ── App ─────────────────────────────────
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT) || 5000,

  // ── MongoDB ─────────────────────────────
  mongodbUri:
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/sustainable_ai_platform",

  // ── Logging ─────────────────────────────
  logLevel: process.env.LOG_LEVEL || "info",
  logAiPrompts: process.env.LOG_AI_PROMPTS === "true",

  // ── Frontend ────────────────────────────
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",

  get isProduction() {
    return this.nodeEnv === "production";
  },
};

// Validate critical settings on startup
if (!settings.openrouterApiKey) {
  console.error("FATAL: OPENROUTER_API_KEY is not set in environment");
  process.exit(1);
}

console.log(
  `AI Config: model=${settings.openrouterModel} via ${settings.openrouterBaseUrl}`
);