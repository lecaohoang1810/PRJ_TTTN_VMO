const pool = require('../configs/database');

const createOrder = async (user_id, total_amount) => {
  const [result] = await pool.query('INSERT INTO Orders (user_id, total_amount) VALUES (?, ?)', [user_id, total_amount]);
  return result.insertId;
};

const createOrderDetail = async (order_id, item_id, quantity, price) => {
  await pool.query('INSERT INTO OrderDetails (order_id, item_id, quantity, price) VALUES (?, ?, ?, ?)', [order_id, item_id, quantity, price]);
};

const getOrderById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Orders WHERE id = ?', [id]);
  return rows[0];
};

const getOrderDetailsByOrderId = async (orderId) => {
  const [rows] = await pool.query('SELECT * FROM OrderDetails WHERE order_id = ?', [orderId]);
  return rows;
};

module.exports = { createOrder, createOrderDetail, getOrderById, getOrderDetailsByOrderId };
