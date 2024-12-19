const { validationResult } = require('express-validator');
const { registerUser, validateUser, generateToken, updateUserDetails } = require('../services/authService');
const logger = require('../config/logger');

async function register(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, fullname, phone } = req.body;
    logger.info('Registration attempt', { email });

    const user = await registerUser(email, password, fullname, phone);
    const token = generateToken(user);

    logger.info('Registration successful', { email });
    res.status(201).json({
      message: 'Registration successful',
      token
    });
  } catch (error) {
    logger.error('Registration error', {
      email: req.body.email,
      error: error.message
    });

    if (error.message === 'Email already exists') {
      return res.status(409).json({ error: 'Email already exists' });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}

async function login(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    logger.info('Login attempt', { email });

    const user = await validateUser(email, password);
    const token = generateToken(user);

    logger.info('Login successful', { email });
    res.json({
      message: 'Login successful',
      token,
      exp_hr: `${process.env.JWT_EXPIRATION_TIME}`,
      user: {
        email: user?.email,
        fullname: user?.fullname,
        address: user?.address,
        profilePicture: user?.profile_pic,
        phone: user?.phone
      }
    });
  } catch (error) {
    logger.error('Login error', {
      email: req.body.email,
      error: error.message
    });

    if (error.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }
    if (error.message === 'Invalid password') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateUser(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email = req.user.email;
    const updateData = {
      fullname: req.body.fullname,
      password: req.body.password
    };

    logger.info('User update attempt', { email });

    const updatedUser = await updateUserDetails(email, updateData);
    const newToken = generateToken(updatedUser);

    logger.info('User update successful', { email });
    res.json({
      message: 'User updated successfully',
      token: newToken,
      user: {
        email: updatedUser.email,
        fullname: updatedUser.fullname
      }
    });
  } catch (error) {
    logger.error('User update error', {
      email: req.user.email,
      error: error.message
    });

    if (error.message === 'No valid update data provided') {
      return res.status(400).json({ error: 'Please provide fullname or password to update' });
    }

    if (error.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  register,
  login,
  updateUser
};