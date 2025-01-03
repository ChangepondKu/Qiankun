const { validationResult } = require('express-validator');
const productService = require('../services/productService');
const logger = require('../config/logger');
const { broadcastUpdate } = require('../websocket/wsServer');

async function createProduct(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    logger.info('Product creation attempt', {
      userId: req.user.id,
      email: req.user.email
    });

    const product = await productService.createProduct(req.body);
    logger.info('Product created successfully', {
      productId: product.id,
      createdBy: req.user.email
    });

    // Broadcast the updated product list
    const products = await productService.getAllProducts();
    broadcastUpdate('product_created',products);

    res.status(201).json(product);
  } catch (error) {
    logger.error('Error creating product', {
      error: error.message,
      userId: req.user.id
    });
    res.status(500).json({ error: 'Error creating product' });
  }
}

async function getProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    logger.error('Error fetching products', { 
      error: error.message,
      userId: req.user.id 
    });
    res.status(500).json({ error: 'Error fetching products' });
  }
}

async function getProductById(req, res) {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    logger.error('Error fetching product', { 
      error: error.message,
      userId: req.user.id,
      productId: req.params.id 
    });
    res.status(500).json({ error: 'Error fetching product' });
  }
}

async function updateProduct(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    logger.info('Product update attempt', {
      userId: req.user.id,
      productId: req.params.id
    });

    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    logger.info('Product updated successfully', {
      productId: req.params.id,
      updatedBy: req.user.email
    });

    // Broadcast the updated product list
    const products = await productService.getAllProducts();
    broadcastUpdate('product_updated',products);

    res.json(product);
  } catch (error) {
    logger.error('Error updating product', {
      error: error.message,
      userId: req.user.id,
      productId: req.params.id
    });
    res.status(500).json({ error: 'Error updating product' });
  }
}

async function deleteProduct(req, res) {
  try {
    logger.info('Product deletion attempt', {
      userId: req.user.id,
      productId: req.params.id
    });

    const result = await productService.deleteProduct(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Product not found' });
    }

    logger.info('Product deleted successfully', {
      productId: req.params.id,
      deletedBy: req.user.email
    });

    // Broadcast the updated product list
    const products = await productService.getAllProducts();
    broadcastUpdate('product_deleted',products);

    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting product', {
      error: error.message,
      userId: req.user.id,
      productId: req.params.id
    });
    res.status(500).json({ error: 'Error deleting product' });
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
