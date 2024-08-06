const express = require('express');
const { createOrder, getOrderById } = require('../controllers/orderController');
const router = express.Router();
const { checkAuth, checkNotAdmin} = require('../middlewares/authMiddleware');

router.post('/', checkAuth, checkNotAdmin,createOrder);
router.get('/:id', checkAuth, getOrderById);

module.exports = router;
