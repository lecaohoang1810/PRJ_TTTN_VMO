const cron = require('node-cron');
const { sendEmail } = require('../utils/emailFlashSaleUtil');
const { createNotification } = require('../models/notificationModel');
const pool = require('../configs/database');

// Hàm lấy flash sale sắp bắt đầu trong 15 phút mà chưa được thông báo
const getFlashSalesStartingIn15Minutes = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM flashsales WHERE start_time BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 15 MINUTE) AND is_notified = 0'
    );
    return rows;
};

// Hàm lấy email của người dùng không phải admin
const getUserEmails = async () => {
    const [rows] = await pool.query(
        'SELECT email FROM users WHERE is_admin = 0'
    );
    return rows.map(row => row.email);
};

// Tạo cronjob gửi thông báo flash sale
cron.schedule('* * * * *', async () => {
    try {
        const flashSales = await getFlashSalesStartingIn15Minutes();
        const userEmails = await getUserEmails();

        // Chuẩn bị các công việc gửi email đồng thời
        const emailPromises = [];

        for (const flashSale of flashSales) {
            const message = `Flash sale "${flashSale.name}" sẽ bắt đầu vào lúc ${flashSale.start_time}. Đừng bỏ lỡ!`;
            // Gửi email cho từng người dùng đồng thời
            for (const email of userEmails) {
                emailPromises.push(sendEmail(email, 'Flash Sale Notification', message));
            }

            // Tạo thông báo trong cơ sở dữ liệu
            await createNotification(flashSale.id, message);

            // Cập nhật trạng thái is_notified
            await pool.query(
                'UPDATE flashsales SET is_notified = 1 WHERE id = ?',
                [flashSale.id]
            );
        }

        // Đợi cho tất cả các email được gửi đi
        await Promise.all(emailPromises);

    } catch (error) {
        console.error('Error sending flash sale notifications:', error);
    }
});
