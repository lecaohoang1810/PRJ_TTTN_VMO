

const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory, updateCategoryOrder } = require('../models/categoryModel');

exports.handleGetAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories' });
  }
};

exports.handleGetCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving category' });
  }
};

exports.handleCreateCategory = async (req, res) => {
  const { name, banner, order_position, status } = req.body;
  try {
    const categoryId = await createCategory(name, banner, order_position, status);
    res.status(201).json({ message: 'Category created successfully', categoryId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category' });
  }
};

exports.handleUpdateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, banner, order_position, status } = req.body;
  try {
    const affectedRows = await updateCategory(id, name, banner, order_position, status);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category' });
  }
};

exports.handleDeleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await deleteCategory(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category' });
  }
};

exports.handleUpdateCategoryOrder = async (req, res) => {
  const { id } = req.params;
  const { newOrderPosition } = req.body;

  try {
    // Kiểm tra nếu ID không tồn tại
    const category = await getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const affectedRows = await updateCategoryOrder(id, newOrderPosition);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found or order position unchanged' });
    }

    res.status(200).json({ message: 'Category order position updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category order position' });
  }
};
