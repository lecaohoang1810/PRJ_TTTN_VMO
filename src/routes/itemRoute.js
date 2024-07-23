const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem, sellItem } = require('../controllers/itemController');
const router = express.Router();

const { itemUpload } = require('../middlewares/uploadMiddleware');

router.get('/items', getItems);
router.get('/items/:id', getItem);
router.post('/items', itemUpload, createItem);
router.put('/items/:id', itemUpload, updateItem);
router.delete('/items/:id', deleteItem);

// Route để bán một item (giảm số lượng tồn kho)
// router.post('/items/:id/sell', sellItem);

module.exports = router;
