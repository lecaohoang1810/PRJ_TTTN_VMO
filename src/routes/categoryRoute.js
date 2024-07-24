const express = require('express');
const router = express.Router();
const { handleGetAllCategories, handleGetCategoryById, handleCreateCategory, handleUpdateCategory, handleDeleteCategory, handleUpdateCategoryBanner, handleUpdateCategoryOrder } = require('../controllers/categoryController');
const checkAdmin = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Chỉ cần upload cho banner

router.get('/', handleGetAllCategories);
router.get('/:id', handleGetCategoryById);
router.post('/', checkAdmin, upload.categoryUpload, handleCreateCategory);
router.put('/:id', checkAdmin, handleUpdateCategory); // Cập nhật toàn bộ thông tin, bao gồm cả banner nếu cần
router.patch('/:id/banner', checkAdmin, upload.categoryUpload, handleUpdateCategoryBanner); // Cập nhật chỉ banner
router.delete('/:id', checkAdmin, handleDeleteCategory);
router.patch('/:id/order', checkAdmin, handleUpdateCategoryOrder);

module.exports = router;
