const express = require('express');
const router = express.Router();
const { register, login, updateUser } = require('../controllers/authController');
const { loginValidator, registerValidator, updateUserValidator } = require('../middleware/validators');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.put('/update', verifyToken, updateUserValidator, updateUser);

module.exports = router;