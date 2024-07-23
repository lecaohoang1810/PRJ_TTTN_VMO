const flashsaleModel = require('../models/flashsaleModel');

const createFlashSale = async (name, startTime, endTime, items) => {
    const flashSaleId = await flashsaleModel.createFlashSale(name, startTime, endTime);
    for (const item of items) {
        await flashsaleModel.addFlashSaleItem(flashSaleId, item.itemId, item.flashSalePrice, item.quantity);
    }
    return flashSaleId;
};

const getFlashSalesStartingIn15Minutes = async () => {
    return await flashsaleModel.getFlashSalesStartingIn15Minutes();
};

module.exports = { createFlashSale, getFlashSalesStartingIn15Minutes };
