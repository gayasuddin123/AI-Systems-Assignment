import winston from "winston";
import { settings } from "../config/settings.js";

const logger = winston.createLogger({
  level: settings.logLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: "sustainable-ai-platform" },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          ({ timestamp, level, message, ...meta }) =>
            `${timestamp} | ${level} | ${message} ${
              Object.keys(meta).length > 1 ? JSON.stringify(meta) : ""
            }`
        )
      ),
    }),
  ],
});

export default logger;