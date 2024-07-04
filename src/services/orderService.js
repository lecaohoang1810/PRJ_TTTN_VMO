const { createOrder, createOrderDetail, getOrderById, getOrderDetailsByOrderId } = require('../models/orderModel');
const { getItemById, updateStockQuantity } = require('../models/itemModel');

const createNewOrder = async (user_id, orderItems) => {
  let totalAmount = 0;

  // Tính tổng tiền và kiểm tra số lượng tồn kho
  for (const item of orderItems) {
    const product = await getItemById(item.item_id);
    if (!product) {
      throw new Error(`Item with id ${item.item_id} not found`);
    }
    if (product.stock_quantity < item.quantity) {
      throw new Error(`Not enough stock for item ${product.name}`);
    }
    totalAmount += item.quantity * product.selling_price;
  }

  // Tạo đơn hàng
  const orderId = await createOrder(user_id, totalAmount);

  // Tạo chi tiết đơn hàng và cập nhật số lượng tồn kho
  for (const item of orderItems) {
    const product = await getItemById(item.item_id);
    await createOrderDetail(orderId, item.item_id, item.quantity, product.selling_price);
    await updateStockQuantity(item.item_id, item.quantity);
  }

  return orderId;
};

const getOrderDetails = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new Error('Order not found');
  }
  const orderDetails = await getOrderDetailsByOrderId(orderId);
  return { order, orderDetails };
};

module.exports = { createNewOrder, getOrderDetails };
