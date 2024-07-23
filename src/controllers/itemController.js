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
  const { name, barcode, purchase_price, selling_price, weight, description, stock_quantity, category_id } = req.body;

  if (!name || !barcode || !purchase_price || !selling_price || !weight || !description || !stock_quantity || !category_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newItem = {
    name,
    barcode,
    purchase_price,
    selling_price,
    weight,
    description,
    stock_quantity,
    category_id,
    thumbnail: req.files.thumbnail ? req.files.thumbnail[0].filename : null,
    details: req.files.details ? JSON.stringify(req.files.details.map(file => file.filename)) : null,
    created_at: new Date(),
    updated_at: new Date()
  };

  try {
    const itemId = await createItem(newItem);
    res.status(201).json({ message: 'Item created successfully', itemId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, barcode, purchase_price, selling_price, weight, description, stock_quantity, category_id } = req.body;

  if (!name || !barcode || !purchase_price || !selling_price || !weight || !description || !stock_quantity || !category_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const updatedItem = {
    name,
    barcode,
    purchase_price,
    selling_price,
    weight,
    description,
    stock_quantity,
    category_id,
    thumbnail: req.files.thumbnail ? req.files.thumbnail[0].filename : null,
    details: req.files.details ? JSON.stringify(req.files.details.map(file => file.filename)) : null,
    updated_at: new Date()
  };

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
