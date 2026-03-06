import {
  generateCategorization,
  getCategorizations,
  getCategorizationById,
} from "../services/categoryService.js";
import { AIClientError } from "../services/aiClient.js";
import logger from "../utils/logger.js";

/**
 * POST /api/v1/categorize/
 * Auto-categorize a sustainable product.
 */
export const categorizeProduct = async (req, res, next) => {
  try {
    const {
      productName,
      productDescription,
      material,
      brand,
      additionalAttributes,
    } = req.body;

    const result = await generateCategorization({
      productName,
      productDescription,
      material,
      brand,
      additionalAttributes,
    });

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof AIClientError) {
      logger.error(`AI error during categorization: ${error.message}`);
      return res.status(502).json({
        success: false,
        error: `AI service error: ${error.message}`,
      });
    }
    next(error);
  }
};

/**
 * POST /api/v1/categorize/batch
 * Batch-categorize multiple products.
 */
export const categorizeProductsBatch = async (req, res, next) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length > 20) {
      return res.status(400).json({
        success: false,
        error: "Provide an array of products (max 20).",
      });
    }

    const results = [];
    const errors = [];

    for (const product of products) {
      try {
        const result = await generateCategorization(product);
        results.push(result);
      } catch (err) {
        logger.warn(
          `Skipping "${product.productName}" due to error: ${err.message}`
        );
        errors.push({
          productName: product.productName,
          error: err.message,
        });
      }
    }

    res.status(201).json({
      success: true,
      data: results,
      errors: errors.length > 0 ? errors : undefined,
      summary: {
        total: products.length,
        succeeded: results.length,
        failed: errors.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/categorize/history
 */
export const getHistory = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;
    const records = await getCategorizations(limit, skip);

    res.json({
      success: true,
      data: records,
      pagination: { limit, skip },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/categorize/:id
 */
export const getById = async (req, res, next) => {
  try {
    const record = await getCategorizationById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        error: "Categorization not found.",
      });
    }

    res.json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};