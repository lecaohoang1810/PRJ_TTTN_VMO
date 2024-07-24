const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkAdmin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header Authorization

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    if (!decoded.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = decoded; // Lưu thông tin người dùng vào req.user để sử dụng trong các route tiếp theo
    next();
  });
};

module.exports = checkAdmin;
