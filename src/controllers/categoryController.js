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
  if (!req.file) {
    return res.status(400).send('No file uploaded or incorrect field name');
  }
  const { name, order_position, status } = req.body;
  const banner = req.file ? req.file.path : null;

  try {
    const categoryId = await createCategory(name, banner, order_position, status);
    res.status(201).json({ message: 'Category created successfully', categoryId });
  } catch (error) {
    console.error(error);
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

exports.handleUpdateCategoryBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = req.file ? req.file.filename : undefined; // Lấy tên file ảnh banner từ Multer

    const category = await getCategoryById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await updateCategory(id, category.name, banner || category.banner, category.order_position, category.status);

    return res.status(200).json({ message: 'Category banner updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.handleUpdateCategoryOrder = async (req, res) => {
  const { id } = req.params;
  const { newOrderPosition } = req.body;

  try {
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
