const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const logger = require('../config/logger');

async function registerUser(email, password, fullname, phone) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (email, password, fullname, phone) VALUES ($1, $2, $3, $4) RETURNING id, email, fullname, phone',
      [email, hashedPassword, fullname, phone]
    );
    return result.rows[0];
  } catch (error) {
    if (error.code === '23505') {
      throw new Error('Email already exists');
    }
    logger.error('Database error during user registration', { error: error.message });
    throw error;
  }
}

async function validateUser(email, password) {
  try {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    return user;
  } catch (error) {
    logger.error('Database error during user validation', { error: error.message });
    throw error;
  }
}

async function updateUserDetails(email, updateData) {
  try {
    let updates = [];
    let values = [];
    let paramCount = 1;

    if (updateData.fullname) {
      updates.push(`fullname = $${paramCount}`);
      values.push(updateData.fullname);
      paramCount++;
    }

    if(updateData.phone){
      updates.push(`phone = $${paramCount}`);
      values.push(updateData.phone);
      paramCount++;
    }

    if(updateData.address){
      updates.push(`address = $${paramCount}`);
      values.push(updateData.address);
      paramCount++;
    }

    if(updateData.profile_pic){
      updates.push(`profile_pic = $${paramCount}`);
      values.push(updateData.profile_pic);
      paramCount++
    }

    if (updates.length === 0) {
      throw new Error('No valid update data provided');
    }

    values.push(email);
    const query = `
      UPDATE users 
      SET ${updates.join(', ')} 
      WHERE email = $${paramCount}
      RETURNING id, email, fullname, phone, profile_pic, address
    `;

    const result = await db.query(query, values);
    
    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    return result.rows[0];
  } catch (error) {
    logger.error('Database error during user update', { error: error.message });
    throw error;
  }
}

function generateToken(user) {
  return jwt.sign(
    {
      email: user.email,
      fullname: user.fullname
    },
    process.env.JWT_SECRET,
    { expiresIn: `${process.env.JWT_EXPIRATION_TIME}h` }
  );
}

module.exports = {
  registerUser,
  validateUser,
  generateToken,
  updateUserDetails
};