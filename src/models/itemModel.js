const pool = require('../configs/database');

const getAllItems = async () => {
  const [rows] = await pool.query('SELECT * FROM Items');
  return rows;
};

const getItemById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Items WHERE id = ?', [id]);
  return rows[0];
};

const createItem = async (item) => {
  const { name, barcode, purchase_price, selling_price, weight, thumbnail, details, description, stock_quantity, category_id } = item;
  const [result] = await pool.query('INSERT INTO Items (name, barcode, purchase_price, selling_price, weight, thumbnail, details, description, stock_quantity, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
  [name, barcode, purchase_price, selling_price, weight, thumbnail, details, description, stock_quantity, category_id]);
  return result.insertId;
};

const updateItemById = async (id, item) => {
  const { name, barcode, purchase_price, selling_price, weight, thumbnail, details, description, stock_quantity, category_id } = item;
  const [result] = await pool.query('UPDATE Items SET name = ?, barcode = ?, purchase_price = ?, selling_price = ?, weight = ?, thumbnail = ?, details = ?, description = ?, stock_quantity = ?, category_id = ? WHERE id = ?', 
  [name, barcode, purchase_price, selling_price, weight, thumbnail, details, description, stock_quantity, category_id, id]);
  return result.affectedRows;
};

const deleteItemById = async (id) => {
  const [result] = await pool.query('DELETE FROM Items WHERE id = ?', [id]);
  return result.affectedRows;
};

const updateStockQuantity = async (itemId, quantity) => {
  const item = await getItemById(itemId);
  if (!item) {
    throw new Error('Item not found');
  }

  const newQuantity = item.stock_quantity - quantity;
  if (newQuantity < 0) {
    throw new Error('Not enough stock');
  }

  await pool.query('UPDATE Items SET stock_quantity = ? WHERE id = ?', [newQuantity, itemId]);
};

module.exports = { getAllItems, getItemById, createItem, updateItemById, deleteItemById, updateStockQuantity };
