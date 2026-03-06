import mongoose from "mongoose";
import { settings } from "./settings.js";
import logger from "../utils/logger.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(settings.mongodbUri);
    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};