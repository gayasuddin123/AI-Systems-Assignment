import mongoose from "mongoose";
import { settings } from "./settings.js";
import logger from "../utils/logger.js";

// Cache connection for serverless (Vercel restarts functions frequently)
let isConnected = false;

export const connectDB = async () => {
  // Already connected — reuse
  if (isConnected) {
    return;
  }

  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  try {
    const conn = await mongoose.connect(settings.mongodbUri, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
};