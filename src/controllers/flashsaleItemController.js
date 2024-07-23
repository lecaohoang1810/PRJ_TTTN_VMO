const flashSaleItemModel = require('../models/flashsaleItemModel');

const createFlashSaleItem = async (req, res) => {
    try {
        const { flashSaleId, itemId, flashSalePrice, quantity } = req.body;
        const flashSaleItemId = await flashSaleItemModel.createFlashSaleItem(flashSaleId, itemId, flashSalePrice, quantity);
        res.status(201).json({ flashSaleItemId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllFlashSaleItems = async (req, res) => {
    try {
        const flashSaleItems = await flashSaleItemModel.getAllFlashSaleItems();
        res.status(200).json(flashSaleItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFlashSaleItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const flashSaleItem = await flashSaleItemModel.getFlashSaleItemById(id);
        if (!flashSaleItem) {
            return res.status(404).json({ error: 'Flash sale item not found' });
        }
        res.status(200).json(flashSaleItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateFlashSaleItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { flashSaleId, itemId, flashSalePrice, quantity } = req.body;
        const affectedRows = await flashSaleItemModel.updateFlashSaleItem(id, flashSaleId, itemId, flashSalePrice, quantity);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Flash sale item not found' });
        }
        res.status(200).json({ message: 'Flash sale item updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteFlashSaleItem = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await flashSaleItemModel.deleteFlashSaleItem(id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Flash sale item not found' });
        }
        res.status(200).json({ message: 'Flash sale item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createFlashSaleItem,
    getAllFlashSaleItems,
    getFlashSaleItemById,
    updateFlashSaleItem,
    deleteFlashSaleItem,
};
