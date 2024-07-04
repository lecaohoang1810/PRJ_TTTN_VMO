const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem, sellItem } = require('../controllers/itemController');
const router = express.Router();

router.get('/items', getItems);
router.get('/items/:id', getItem);
router.post('/items', createItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

// Route để giảm số lượng tồn kho khi bán hàng
router.put('/items/sell/:id', sellItem);

module.exports = router;
