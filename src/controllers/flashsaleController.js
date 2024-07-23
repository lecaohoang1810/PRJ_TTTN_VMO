// controllers/flashsaleController.js
const flashsaleModel = require('../models/flashsaleModel');

const createFlashSale = async (req, res) => {
    try {
        const { name, startTime, endTime } = req.body;
        const id = await flashsaleModel.createFlashSale(name, startTime, endTime);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllFlashSales = async (req, res) => {
    try {
        const flashsales = await flashsaleModel.getAllFlashSales();
        res.status(200).json(flashsales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFlashSaleById = async (req, res) => {
    try {
        const id = req.params.id;
        const flashsale = await flashsaleModel.getFlashSaleById(id);
        if (!flashsale) {
            return res.status(404).json({ error: 'Flash sale not found' });
        }
        res.status(200).json(flashsale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateFlashSale = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, startTime, endTime } = req.body;
        await flashsaleModel.updateFlashSale(id, name, startTime, endTime);
        res.status(200).json({ message: 'Flash sale updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteFlashSale = async (req, res) => {
    try {
        const id = req.params.id;
        await flashsaleModel.deleteFlashSale(id);
        res.status(200).json({ message: 'Flash sale deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUpcomingFlashSales = async (req, res) => {
    try {
        const flashsales = await flashsaleModel.getUpcomingFlashSales();
        res.status(200).json(flashsales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createFlashSale,
    getAllFlashSales,
    getFlashSaleById,
    updateFlashSale,
    deleteFlashSale,
    getUpcomingFlashSales,
};
