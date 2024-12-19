const { Pool } = require('pg');
const logger = require('./logger');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'user',
  password: process.env.DB_PASSWORD || '1234',
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    logger.error('Error connecting to the database', { error: err.message });
    return;
  }
  logger.info('Successfully connected to PostgreSQL database');
  release();
  initializeDatabase();
});

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        fullname VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        address TEXT,
        profile_pic TEXT,
        phone BIGINT
      )
    `);
     // Create products table
     await pool.query(`
     CREATE TABLE IF NOT EXISTS products (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       price DECIMAL(10,2) NOT NULL,
       stock INTEGER NOT NULL DEFAULT 0,
       category VARCHAR(100),
       image_url TEXT,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
     )
   `);
    logger.info('Database tables initialized successfully');
  } catch (error) {
    logger.error('Error initializing database tables', { error: error.message });
  }
}

module.exports = pool;