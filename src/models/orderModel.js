const pool = require('../configs/database');

const createOrder = async (userId, totalAmount, voucherId = null, discountAmount = 0, finalAmount = totalAmount - discountAmount) => {
  const [result] = await pool.execute(
    'INSERT INTO Orders (user_id, total_amount, voucher_id, discount_amount, final_amount) VALUES (?, ?, ?, ?, ?)',
    [userId, totalAmount, voucherId, discountAmount, finalAmount]
  );
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
