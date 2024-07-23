// voucherService.js
const { getVoucherByCode, updateVoucherQuantity } = require('../models/voucherModel');

const applyVoucherToOrder = async (voucherCode, totalAmount) => {
  const voucher = await getVoucherByCode(voucherCode);
  if (!voucher) {
    throw new Error('Invalid voucher code');
  }
  
  if (voucher.quantity <= 0) {
    throw new Error('Voucher out of stock');
  }
  
  const currentDate = new Date();
  if (currentDate < voucher.valid_from || currentDate > voucher.valid_to) {
    throw new Error('Voucher expired');
  }
  
  if (totalAmount < voucher.min_order_amount) {
    throw new Error('Total amount does not meet the minimum order amount for this voucher');
  }

  let discountAmount = 0;
  if (voucher.discount_type === 'percentage') {
    discountAmount = totalAmount * (voucher.discount / 100);
  } else if (voucher.discount_type === 'fixed') {
    discountAmount = voucher.discount;
  }

  await updateVoucherQuantity(voucher.id, voucher.quantity - 1);

  return {
    voucherId: voucher.id,
    discountedAmount: discountAmount
  };
};

module.exports = { applyVoucherToOrder };
