const flashsaleModel = require('../models/flashsaleModel');

const addFlashSaleItem = async (flashSaleId, itemId, flashSalePrice, quantity) => {
    return await flashsaleModel.addFlashSaleItem(flashSaleId, itemId, flashSalePrice, quantity);
};

module.exports = { addFlashSaleItem };
