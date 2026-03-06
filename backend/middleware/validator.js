import { body, validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  next();
};

export const validateCategoryRequest = [
  body("productName")
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage("Product name must be 2-255 characters."),
  body("productDescription")
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage("Description must be 10-5000 characters."),
  body("material").optional().trim(),
  body("brand").optional().trim(),
  handleValidationErrors,
];

export const validateProposalRequest = [
  body("clientName")
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage("Client name must be 2-255 characters."),
  body("clientIndustry")
    .trim()
    .notEmpty()
    .withMessage("Client industry is required."),
  body("totalBudget")
    .isFloat({ gt: 0, lt: 10000001 })
    .withMessage("Budget must be between 0 and 10,000,000."),
  body("currency").optional().trim().isLength({ max: 10 }),
  body("sustainabilityPriorities").optional().isArray(),
  body("productPreferences").optional().isArray(),
  handleValidationErrors,
];