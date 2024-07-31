const express = require('express');
const { handleRegister, handleLogin, handleVerifyEmail, handleRegisterAdmin, handleGrantAdminRights } = require('../controllers/authController');
const {checkAdmin, checkAuth, checkNotAdmin} = require('../middlewares/authMiddleware');
const router = express.Router();

// Route để đăng ký người dùng
router.post('/register', handleRegister);

// Route để đăng ký admin
router.post('/register/admin', handleRegisterAdmin);

// Route để đăng nhập
router.post('/login', handleLogin);

// Route để xác thực email
router.get('/verify-email', handleVerifyEmail);
router.post('/grant-admin',checkAdmin, handleGrantAdminRights);
module.exports = router;
