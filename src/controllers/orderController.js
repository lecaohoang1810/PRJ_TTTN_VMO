// orderController.js
const { createNewOrder, getOrderDetails } = require('../services/orderService');

exports.createOrder = async (req, res) => {
  const { user_id, orderItems, voucherCode } = req.body;

  try {
    const orderId = await createNewOrder(user_id, orderItems, voucherCode);
    res.status(201).json({ message: 'Order created successfully', orderId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => { // Đổi tên hàm ở đây
  const { id } = req.params;

  try {
    const order = await getOrderDetails(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
