const express = require('express');
const router = express.Router();
const {createFlashSale, getAllFlashSales, getFlashSaleById, updateFlashSale, deleteFlashSale, getUpcomingFlashSales} = require('../controllers/flashsaleController');
const {createFlashSaleItem, getAllFlashSaleItems, getFlashSaleItemById, updateFlashSaleItem, deleteFlashSaleItem} = require('../controllers/flashsaleItemController');
const { checkAuth, checkAdmin} = require('../middlewares/authMiddleware');

router.post('/flashsales',checkAdmin, createFlashSale);
router.get('/flashsales', getAllFlashSales);
router.get('/flashsales/:id', getFlashSaleById);
router.put('/flashsales/:id', checkAdmin, updateFlashSale);
router.delete('/flashsales/:id', checkAdmin, deleteFlashSale);
router.get('/upcoming-flashsales', getUpcomingFlashSales);

router.post('/flashsaleitems',checkAdmin, createFlashSaleItem);
router.get('/flashsaleitems', getAllFlashSaleItems);
router.get('/flashsaleitems/:id', getFlashSaleItemById);
router.put('/flashsaleitems/:id',checkAdmin, updateFlashSaleItem);
router.delete('/flashsaleitems/:id',checkAdmin, deleteFlashSaleItem);

module.exports = router;
