const express = require('express');
const { createOrder, getOrderById } = require('../controllers/orderController');
const router = express.Router();
const { checkAuth, checkNotAdmin} = require('../middlewares/authMiddleware');

router.post('/orders', checkAuth, checkNotAdmin,createOrder);
router.get('/orders/:id', checkAuth, getOrderById);

module.exports = router;
