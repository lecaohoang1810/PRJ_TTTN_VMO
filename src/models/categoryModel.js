const pool = require('../configs/database');

const getAllCategories = async () => {
  const [rows] = await pool.query('SELECT * FROM Categories');
  return rows;
};

const getCategoryById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Categories WHERE id = ?', [id]);
  return rows[0];
};

const createCategory = async (name, banner, order_position, status) => {
  const [result] = await pool.query(
    'INSERT INTO Categories (name, banner, order_position, status) VALUES (?, ?, ?, ?)',
    [name, banner, order_position, status]
  );
  console.log('Insert result:', result);
  return getCategoryById(result.insertId);
};

const updateCategory = async (id, name, banner, order_position, status) => {
  const [result] = await pool.query(
    'UPDATE Categories SET name = ?, banner = ?, order_position = ?, status = ? WHERE id = ?',
    [name, banner, order_position, status, id]
  );
  if (result.affectedRows === 0) return null;
  return getCategoryById(id);
};

const deleteCategory = async (id) => {
  const [result] = await pool.query('DELETE FROM Categories WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

const updateCategoryOrder = async (id, order_position) => {
  const [result] = await pool.query(
    'UPDATE Categories SET order_position = ? WHERE id = ?',
    [order_position, id]
  );
  if (result.affectedRows === 0) return null;
  return getCategoryById(id);
};

const updateCategoryBanner = async (id, banner) => {
  const [result] = await pool.query(
    'UPDATE Categories SET banner = ? WHERE id = ?',
    [banner, id]
  );
  if (result.affectedRows === 0) return null;
  return getCategoryById(id);
};

const toggleCategoryStatus = async (id) => {
  const category = await getCategoryById(id);
  if (!category) return null;
  const newStatus = category.status === 'active' ? 'inactive' : 'active';
  const [result] = await pool.query(
    'UPDATE Categories SET status = ? WHERE id = ?',
    [newStatus, id]
  );
  if (result.affectedRows === 0) return null;
  return getCategoryById(id);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  updateCategoryOrder,
  updateCategoryBanner,
  toggleCategoryStatus
};
