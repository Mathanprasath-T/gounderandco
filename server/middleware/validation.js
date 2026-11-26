import { body, validationResult } from 'express-validator';

export const validateEnquiry = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .customSanitizer((val) => (val ? val.replace(/\D/g, '') : ''))
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number must contain at least 10 digits'),

  body('category')
    .optional()
    .trim()
    .isLength({ max: 80 })
    .withMessage('Category must not exceed 80 characters')
    .escape(),

  body('product')
    .optional()
    .trim()
    .isLength({ max: 120 })
    .withMessage('Product must not exceed 120 characters')
    .escape(),

  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message must not exceed 1000 characters')
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }
    next();
  },
];

