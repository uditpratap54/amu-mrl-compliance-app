// server/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { loginValidation } = require('../middleware/validate');

router.post('/login', loginValidation, authController.login);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
