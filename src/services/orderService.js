const { createOrder, createOrderDetail, getOrderById, getOrderDetailsByOrderId } = require('../models/orderModel');
const { getItemById, updateStockQuantity } = require('../models/itemModel');
const { getVoucherByCode, updateVoucherQuantity } = require('../models/voucherModel');
const { checkFlashSaleItem, updateFlashSaleQuantity } = require('../models/flashsaleModel');

const applyVoucherToOrder = async (voucherCode, totalAmount) => {
    const voucher = await getVoucherByCode(voucherCode);

    if (!voucher) {
        throw new Error('Voucher not found');
    }

    if (voucher.quantity <= 0) {
        throw new Error('Voucher is out of stock');
    }

    const now = new Date();
    if (now < new Date(voucher.valid_from) || now > new Date(voucher.valid_to)) {
        throw new Error('Voucher is expired or not yet valid');
    }

    if (totalAmount < voucher.min_order_amount) {
        throw new Error('Order amount does not meet the minimum required for this voucher');
    }

    let discountAmount = 0;
    if (voucher.discount_type === 'percentage') {
        discountAmount = totalAmount * (voucher.discount / 100);
    } else {
        discountAmount = voucher.discount;
    }

    let discountedAmount = totalAmount - discountAmount;
    if (discountedAmount < 0) {
        discountedAmount = 0;
    }

    await updateVoucherQuantity(voucher.id, voucher.quantity - 1);

    return { voucherId: voucher.id, discountedAmount, discountAmount };
};

const createNewOrder = async (user_id, orderItems, voucherCode = null) => {
    let totalAmount = 0;
    let finalAmount = 0;
    let voucherId = null;
    let discountAmount = 0;

    for (const item of orderItems) {
        const product = await getItemById(item.item_id);
        if (!product) {
            throw new Error(`Item with id ${item.item_id} not found`);
        }
        if (product.stock_quantity < item.quantity) {
            throw new Error(`Not enough stock for item ${product.name}`);
        }

        const flashSaleItem = await checkFlashSaleItem(item.item_id);
        if (flashSaleItem && flashSaleItem.quantity >= item.quantity) {
            totalAmount += item.quantity * flashSaleItem.discount_price;
        } else {
            totalAmount += item.quantity * product.selling_price;
        }
    }

    finalAmount = totalAmount;

    if (voucherCode && voucherCode.trim() !== '') {
        const result = await applyVoucherToOrder(voucherCode, totalAmount);
        voucherId = result.voucherId;
        discountAmount = result.discountAmount;
        finalAmount = result.discountedAmount;
    }

    const orderId = await createOrder(user_id, totalAmount, voucherId, discountAmount);

    for (const item of orderItems) {
        const product = await getItemById(item.item_id);

        const flashSaleItem = await checkFlashSaleItem(item.item_id);
        const price = flashSaleItem && flashSaleItem.quantity >= item.quantity ? flashSaleItem.discount_price : product.selling_price;

        await createOrderDetail(orderId, item.item_id, item.quantity, price);

        if (flashSaleItem && flashSaleItem.quantity >= item.quantity) {
            await updateFlashSaleQuantity(flashSaleItem.id, flashSaleItem.quantity - item.quantity);
        } else {
            if (product.stock_quantity < item.quantity) {
                throw new Error(`Not enough stock for item ${product.name}`);
            }
        }

        await updateStockQuantity(item.item_id, product.stock_quantity - item.quantity);
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
