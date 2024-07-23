

const express = require('express');
const { handleGetAllCategories, handleGetCategoryById, handleCreateCategory, handleUpdateCategory, handleDeleteCategory, handleUpdateCategoryOrder } = require('../controllers/categoryController');

const router = express.Router();

router.get('/', handleGetAllCategories);
router.get('/:id', handleGetCategoryById);
router.post('/', handleCreateCategory);
router.put('/:id', handleUpdateCategory);
router.delete('/:id', handleDeleteCategory);
router.patch('/:id/order', handleUpdateCategoryOrder);

module.exports = router;
