const express = require('express');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  updateCategoryOrder,
  updateCategoryBanner,
  toggleCategoryStatus
} = require('../controllers/categoryController');

const router = express.Router();

router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);
router.put('/categories/:id/position', updateCategoryOrder);
router.put('/categories/:id/banner', updateCategoryBanner);
router.put('/categories/:id/status', toggleCategoryStatus);

module.exports = router;
