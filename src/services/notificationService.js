const transporter = require('../utils/emailFlashsaleUtil');  
const pool = require('../configs/database');

const getAllUsersExceptAdmin = async () => {
    const [rows] = await pool.query('SELECT * FROM users WHERE role != "admin"');
    return rows;
};

const sendEmailNotification = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        text
    };

    return await transporter.sendMail(mailOptions);
};

const saveNotification = async (flashSaleId, userId, message) => {
    const [result] = await pool.query(
        'INSERT INTO notifications (flashsale_id, user_id, message, sent_at, is_sent, created_at, updated_at) VALUES (?, ?, ?, NOW(), 1, NOW(), NOW())',
        [flashSaleId, userId, message]
    );
    return result.insertId;
};

module.exports = { getAllUsersExceptAdmin, sendEmailNotification, saveNotification };
