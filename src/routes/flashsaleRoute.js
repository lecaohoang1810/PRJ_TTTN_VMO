const express = require('express');
const router = express.Router();
const flashsaleController = require('../controllers/flashsaleController');
const flashsaleItemController = require('../controllers/flashsaleItemController');


router.post('/flashsales', flashsaleController.createFlashSale);
router.get('/flashsales', flashsaleController.getAllFlashSales);
router.get('/flashsales/:id', flashsaleController.getFlashSaleById);
router.put('/flashsales/:id', flashsaleController.updateFlashSale);
router.delete('/flashsales/:id', flashsaleController.deleteFlashSale);
router.get('/upcoming-flashsales', flashsaleController.getUpcomingFlashSales);

router.post('/flashsaleitems', flashsaleItemController.createFlashSaleItem);
router.get('/flashsaleitems', flashsaleItemController.getAllFlashSaleItems);
router.get('/flashsaleitems/:id', flashsaleItemController.getFlashSaleItemById);
router.put('/flashsaleitems/:id', flashsaleItemController.updateFlashSaleItem);
router.delete('/flashsaleitems/:id', flashsaleItemController.deleteFlashSaleItem);

module.exports = router;
