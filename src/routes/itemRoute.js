const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem, sellItem } = require('../controllers/itemController');
const router = express.Router();
const {checkAdmin} = require('../middlewares/authMiddleware');
const { itemUpload } = require('../middlewares/uploadMiddleware');

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/',checkAdmin, itemUpload, createItem);
router.put('/:id',checkAdmin, itemUpload, updateItem);
router.delete('/:id',checkAdmin, deleteItem);

// Route để bán một item (giảm số lượng tồn kho)
// router.post('/items/:id/sell', sellItem);

module.exports = router;
