const express = require('express');
const { createVoucher, applyVoucher } = require('../controllers/voucherController');
const router = express.Router();

router.post('/vouchers', createVoucher);
// router.post('/vouchers/apply', applyVoucher);

module.exports = router;
