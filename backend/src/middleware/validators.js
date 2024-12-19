const { body } = require('express-validator');

const registerValidator = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('fullname')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Full name must be at least 2 characters long'),
  body('phone')
    .isMobilePhone() // Validate the phone number
    .withMessage('Please provide a valid phone number')
    .optional({ checkFalsy: true }),

];

const loginValidator = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];


const productValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 255 })
    .withMessage('Product name must be less than 255 characters'),
  body('description')
    .optional()
    .trim(),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Category must be less than 100 characters'),
  body('image_url')
    .optional()
    .trim()
    .custom((value) => {
      // Regex to check for Base64 format
      const base64Regex = /^data:image\/(png|jpg|jpeg|gif|webp);base64,[a-zA-Z0-9+/=]+$/;
      if (!value.match(/^https?:\/\//) && !base64Regex.test(value) && !value==='' && !value===undefined && !value===null) {
        throw new Error('Invalid image URL or Base64 format');
      }
      return true;
    })
];

const updateUserValidator = [
  body('fullname')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Full name must be at least 2 characters long'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('email')
    .not()
    .exists()
    .withMessage('Email cannot be updated')
];


module.exports = {
  registerValidator,
  loginValidator,
  productValidator,
  updateUserValidator
};