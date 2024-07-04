const express = require('express');
const { handleRegister, handleLogin, handleVerifyEmail } = require('../controllers/authController');

const router = express.Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.get('/verify-email', handleVerifyEmail);

module.exports = router;
