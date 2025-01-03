const db = require('../config/database');
const logger = require('../config/logger');
const { broadcastUpdate } = require('../websocket/wsServer');

async function createProduct(productData) {
  const { name, description, price, stock, category, image_url } = productData;
  
  try {
    const result = await db.query(
      `INSERT INTO products (name, description, price, stock, category, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, description, price, stock, category, image_url]
    );
    const updatedProducts=result.rows[0]
    broadcastUpdate('product_created',updatedProducts);
    return result.rows[0];
  } catch (error) {
    logger.error('Database error during product creation', { error: error.message });
    throw error;
  }
}

async function getAllProducts() {
  try {
    const result = await db.query('SELECT * FROM products ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    logger.error('Database error while fetching products', { error: error.message });
    throw error;
  }
}

async function getProductById(id) {
  try {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    logger.error('Database error while fetching product', { error: error.message });
    throw error;
  }
}

async function updateProduct(id, productData) {
  const { name, description, price, stock, category, image_url } = productData;
  
  try {
    const result = await db.query(
      `UPDATE products 
       SET name = $1, description = $2, price = $3, stock = $4, 
           category = $5, image_url = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [name, description, price, stock, category, image_url, id]
    );
    const updatedProducts=result.rows[0]
    broadcastUpdate('product_updated',updatedProducts);
    return result.rows[0];
  } catch (error) {
    logger.error('Database error while updating product', { error: error.message });
    throw error;
  }
}

async function deleteProduct(id) {
  try {
    const result = await db.query(
      'DELETE FROM products WHERE id = $1 RETURNING id',
      [id]
    );
    if (result.rows[0]) {
    const updatedProducts=result.rows[0]
    broadcastUpdate('product_created',updatedProducts);
    }
    return result.rows[0];
  } catch (error) {
    logger.error('Database error while deleting product', { error: error.message });
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};