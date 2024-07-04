const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Kiểm tra kết nối từ pool
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Đã kết nối với id: ' + connection.threadId);
    connection.release();
  } catch (err) {
    console.error('Lỗi kết nối: ' + err.stack);
  }
}

// Gọi hàm kiểm tra kết nối
testConnection();

module.exports = pool;