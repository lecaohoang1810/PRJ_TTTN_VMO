const { createVoucher } = require('../models/voucherModel');

exports.createVoucher = async (req, res) => {
  const { code, discount_type, discount, min_order_amount, quantity, valid_from, valid_to } = req.body;

  if (!code || !discount_type || !discount || !min_order_amount || !quantity || !valid_from || !valid_to) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newVoucher = {
    code,
    discount_type,
    discount,
    min_order_amount,
    quantity,
    valid_from,
    valid_to,
  };

  try {
    const voucherId = await createVoucher(newVoucher);
    res.status(201).json({ message: 'Voucher created successfully', voucherId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
