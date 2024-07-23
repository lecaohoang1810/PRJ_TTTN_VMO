const pool = require('../configs/database');

// Hàm tạo thông báo
const createNotification = async (flashSaleId, message) => {
    const [result] = await pool.query(
        'INSERT INTO notifications (flashsale_id, message, sent_at, is_sent) VALUES (?, ?, NOW(), 1)',
        [flashSaleId, message]
    );
    return result.insertId;
};

module.exports = { createNotification };
