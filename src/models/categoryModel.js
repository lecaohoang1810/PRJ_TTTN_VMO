
const pool = require('../configs/database');

const getAllCategories = async () => {
  const [rows] = await pool.query('SELECT * FROM Categories ORDER BY order_position');
  return rows;
};

const getCategoryById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Categories WHERE id = ?', [id]);
  return rows[0];
};

const createCategory = async (name, banner, order_position, status) => {
  const [result] = await pool.query('INSERT INTO Categories (name, banner, order_position, status) VALUES (?, ?, ?, ?)', 
  [name, banner, order_position, status]);
  return result.insertId;
};

const updateCategory = async (id, name, banner, order_position, status) => {
  const [result] = await pool.query('UPDATE Categories SET name = ?, banner = ?, order_position = ?, status = ? WHERE id = ?', 
  [name, banner, order_position, status, id]);
  return result.affectedRows;
};

const deleteCategory = async (id) => {
  const [result] = await pool.query('DELETE FROM Categories WHERE id = ?', [id]);
  return result.affectedRows;
};

const updateCategoryOrder = async (id, newOrderPosition) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Lấy vị trí hiện tại của danh mục cần cập nhật
    const [rows] = await connection.query('SELECT order_position FROM Categories WHERE id = ?', [id]);
    if (rows.length === 0) {
      throw new Error('Category not found');
    }
    const currentOrderPosition = rows[0].order_position;

    // Cập nhật vị trí của các danh mục khác
    if (currentOrderPosition < newOrderPosition) {
      await connection.query('UPDATE Categories SET order_position = order_position - 1 WHERE order_position > ? AND order_position <= ?', [currentOrderPosition, newOrderPosition]);
    } else if (currentOrderPosition > newOrderPosition) {
      await connection.query('UPDATE Categories SET order_position = order_position + 1 WHERE order_position >= ? AND order_position < ?', [newOrderPosition, currentOrderPosition]);
    }

    // Cập nhật vị trí của danh mục hiện tại
    await connection.query('UPDATE Categories SET order_position = ? WHERE id = ?', [newOrderPosition, id]);

    await connection.commit();
    console.log('Transaction committed');
  } catch (error) {
    await connection.rollback();
    console.log('Transaction rollbacked due to error:', error.message);
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory, updateCategoryOrder };
