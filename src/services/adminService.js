const { createUser } = require('../models/userModel');
const bcrypt = require('bcrypt');

const createAdminAccount = async () => {
  const email = 'admin@example.com'; // Email của tài khoản admin
  const password = 'adminPassword'; // Mật khẩu cho tài khoản admin

  try {
    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo tài khoản admin với is_admin = true (1)
    await createUser(email, hashedPassword, true); // Bạn cần cập nhật phương thức createUser
    console.log('Admin account created successfully');
  } catch (error) {
    console.error('Error creating admin account:', error.message);
  }
};

createAdminAccount();
