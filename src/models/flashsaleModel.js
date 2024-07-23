const pool = require('../configs/database');

const createFlashSale = async (name, startTime, endTime) => {
    const [result] = await pool.query(
        'INSERT INTO flashsales (name, start_time, end_time) VALUES (?, ?, ?)',
        [name, startTime, endTime]
    );
    return result.insertId;
};

const getAllFlashSales = async () => {
    const [rows] = await pool.query('SELECT * FROM flashsales');
    return rows;
};

const getFlashSaleById = async (flashSaleId) => {
    const [rows] = await pool.query('SELECT * FROM flashsales WHERE id = ?', [flashSaleId]);
    return rows[0];
};

const updateFlashSale = async (id, name, startTime, endTime) => {
    await pool.query(
        'UPDATE flashsales SET name = ?, start_time = ?, end_time = ? WHERE id = ?',
        [name, startTime, endTime, id]
    );
};

const deleteFlashSale = async (id) => {
    await pool.query('DELETE FROM flashsales WHERE id = ?', [id]);
};

const getUpcomingFlashSales = async () => {
    const [rows] = await pool.query('SELECT * FROM flashsales WHERE start_time > NOW()');
    return rows;
};

const checkFlashSaleItem = async (itemId) => {
    const [rows] = await pool.query(
        'SELECT * FROM flashsaleitems WHERE item_id = ? AND start_time <= NOW() AND end_time >= NOW()',
        [itemId]
    );
    return rows.length ? rows[0] : null;
};

const isFlashSaleActive = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM flashsales WHERE NOW() BETWEEN start_time AND end_time'
    );
    return rows.length > 0;
};

const updateFlashSaleQuantity = async (flashSaleItemId, newQuantity) => {
    await pool.query(
        'UPDATE flashsaleitems SET quantity = ? WHERE id = ?',
        [newQuantity, flashSaleItemId]
    );
};

module.exports = {
    createFlashSale,
    getAllFlashSales,
    getFlashSaleById,
    updateFlashSale,
    deleteFlashSale,
    getUpcomingFlashSales,
    checkFlashSaleItem,
    isFlashSaleActive,
    updateFlashSaleQuantity
};
