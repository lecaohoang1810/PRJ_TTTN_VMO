const { getAllItems, getItemById, createItem, updateItemById, deleteItemById, updateStockQuantity } = require('../models/itemModel');

exports.getItems = async (req, res) => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await getItemById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createItem = async (req, res) => {
  const newItem = req.body;
  try {
    const itemId = await createItem(newItem);
    res.status(201).json({ message: 'Item created successfully', itemId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  try {
    const rowsAffected = await updateItemById(id, updatedItem);
    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const rowsAffected = await deleteItemById(id);
    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Thêm hàm giảm số lượng tồn kho khi bán hàng
exports.sellItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    await updateStockQuantity(id, quantity);
    res.status(200).json({ message: 'Item sold successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
