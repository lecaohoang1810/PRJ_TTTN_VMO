// voucherModel.js
const pool = require('../configs/database');

const createVoucher = async (voucher) => {
  const { code, discount_type, discount, min_order_amount, quantity, valid_from, valid_to } = voucher;
  const [result] = await pool.query('INSERT INTO Vouchers (code, discount_type, discount, min_order_amount, quantity, valid_from, valid_to) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [code, discount_type, discount, min_order_amount, quantity, valid_from, valid_to]);
  return result.insertId;
};

const getVoucherByCode = async (code) => {
  const [rows] = await pool.query('SELECT * FROM Vouchers WHERE code = ?', [code]);
  return rows[0];
};

const updateVoucherQuantity = async (id, quantity) => {
  const [result] = await pool.query('UPDATE Vouchers SET quantity = ? WHERE id = ?', [quantity, id]);
  return result.affectedRows;
};

module.exports = { createVoucher, getVoucherByCode, updateVoucherQuantity };
