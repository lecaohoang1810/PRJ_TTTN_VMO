const express = require('express');
const { createOrder, getOrderById } = require('../controllers/orderController');
const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders/:id', getOrderById);

module.exports = router;
