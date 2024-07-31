const express = require('express');
const { createVoucher, applyVoucher } = require('../controllers/voucherController');
const router = express.Router();
const { checkAuth, checkAdmin} = require('../middlewares/authMiddleware');

router.post('/', checkAdmin,createVoucher);
// router.post('/vouchers/apply', applyVoucher);

module.exports = router;
