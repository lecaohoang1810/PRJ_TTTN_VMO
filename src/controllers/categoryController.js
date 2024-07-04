const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    updateCategoryOrder,
    updateCategoryBanner,
    toggleCategoryStatus
  } = require('../models/categoryModel');
  
  exports.getAllCategories = async (req, res) => {
    try {
      const categories = await getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
      const category = await getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.createCategory = async (req, res) => {
    const { name, banner, order_position, status } = req.body;
    try {
      const category = await createCategory(name, banner, order_position, status);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, banner, order_position, status } = req.body;
    try {
      const category = await updateCategory(id, name, banner, order_position, status);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await deleteCategory(id);
      if (!result) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.updateCategoryOrder = async (req, res) => {
    const { id } = req.params;
    const { order_position } = req.body;
    try {
      const result = await updateCategoryOrder(id, order_position);
      if (!result) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.updateCategoryBanner = async (req, res) => {
    const { id } = req.params;
    const { banner } = req.body;
    try {
      const result = await updateCategoryBanner(id, banner);
      if (!result) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.toggleCategoryStatus = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await toggleCategoryStatus(id);
      if (!result) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  