const pool = require('../configs/database');

const createFlashSaleItem = async (flashSaleId, itemId, flashSalePrice, quantity) => {
    const [result] = await pool.query(
        'INSERT INTO flashsaleitems (flashsale_id, item_id, flashsale_price, quantity) VALUES (?, ?, ?, ?)',
        [flashSaleId, itemId, flashSalePrice, quantity]
    );
    return result.insertId;
};

const getAllFlashSaleItems = async () => {
    const [rows] = await pool.query('SELECT * FROM flashsaleitems');
    return rows;
};

const getFlashSaleItemById = async (flashSaleItemId) => {
    const [rows] = await pool.query(
        'SELECT * FROM flashsaleitems WHERE id = ?',
        [flashSaleItemId]
    );
    return rows[0];
};

const updateFlashSaleItem = async (id, flashSaleId, itemId, flashSalePrice, quantity) => {
    const [result] = await pool.query(
        'UPDATE flashsaleitems SET flashsale_id = ?, item_id = ?, flashsale_price = ?, quantity = ? WHERE id = ?',
        [flashSaleId, itemId, flashSalePrice, quantity, id]
    );
    return result.affectedRows;
};

const deleteFlashSaleItem = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM flashsaleitems WHERE id = ?',
        [id]
    );
    return result.affectedRows;
};

module.exports = { createFlashSaleItem, getAllFlashSaleItems, getFlashSaleItemById, updateFlashSaleItem, deleteFlashSaleItem };
