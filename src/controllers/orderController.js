const { createNewOrder, getOrderDetails } = require('../services/orderService');

exports.createOrder = async (req, res) => {
  const { user_id, orderItems } = req.body;

  try {
    const orderId = await createNewOrder(user_id, orderItems);
    res.status(201).json({ message: 'Order created successfully', orderId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const orderDetails = await getOrderDetails(id);
    res.status(200).json(orderDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
