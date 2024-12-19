const express = require('express');
const router = express.Router();
const { productValidator } = require('../middleware/validators');
const { verifyToken } = require('../middleware/authMiddleware');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Apply verifyToken middleware to all product routes
router.use(verifyToken);

// GET all products
router.get('/', getProducts);

// GET single product by ID
router.get('/:id', getProductById);

// POST create new product
router.post('/', productValidator, createProduct);

// PUT update product
router.put('/:id', productValidator, updateProduct);

// DELETE product
router.delete('/:id', deleteProduct);

module.exports = router;