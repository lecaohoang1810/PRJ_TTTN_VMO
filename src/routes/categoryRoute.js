const express = require('express');
const router = express.Router();
const { 
  handleGetAllCategories, 
  handleGetCategoryById, 
  handleCreateCategory, 
  handleUpdateCategory, 
  handleDeleteCategory, 
  handleUpdateCategoryBanner, 
  handleUpdateCategoryOrder, 
  handleToggleCategoryStatus 
} = require('../controllers/categoryController');
const {checkAdmin, checkNotAdmin, checkAuth} = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); 


router.get('/', handleGetAllCategories);
router.get('/:id', handleGetCategoryById);
router.post('/', checkAdmin, upload.categoryUpload, handleCreateCategory);
router.put('/:id', checkAdmin, handleUpdateCategory); 
router.patch('/:id/banner', checkAdmin, upload.categoryUpload, handleUpdateCategoryBanner); 
router.delete('/:id', checkAdmin, handleDeleteCategory);
router.patch('/:id/order', checkAdmin, handleUpdateCategoryOrder);
router.put('/:id/toggle-status', checkAdmin, handleToggleCategoryStatus);

module.exports = router;
