const crypto = require('crypto');
const { register, login, verifyEmail, registerAdmin, grantAdminRights } = require('../services/authService');
const {findUserByEmail} = require('../models/userModel');
exports.handleRegister = async (req, res) => {
  const { email, password, username, confirmPassword } = req.body;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format. Email must end with @gmail.com' });
  }
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Đăng ký người dùng
    const userId = await register(email, username, password);
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.handleRegisterAdmin = async (req, res) => {
  const { email, password, username, confirmPassword } = req.body;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format. Email must end with @gmail.com' });
  }
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Đăng ký admin
    const userId = await registerAdmin(email, username, password);
    res.status(201).json({ message: 'Admin registered successfully', userId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Đăng nhập và nhận token
    const token = await login(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.handleVerifyEmail = async (req, res) => {
  const { email } = req.query;

  try {
    // Xác minh email
    await verifyEmail(email);
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.handleGrantAdminRights = async (req, res) => {
  const { email } = req.body;
  const adminEmail = req.user.email; // Email của người đang gửi yêu cầu

  try {
    // Cấp quyền admin
    const message = await grantAdminRights(adminEmail, email);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.handleForgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: 'Email does not exist.' });
  }

  const token = crypto.randomBytes(20).toString('hex');
  await setResetToken(email, token);

  const resetLink = `http://${req.headers.host}/reset-password/${token}`;
  await sendEmail(email, 'Password Reset', `Click the link to reset your password: ${resetLink}`);

  res.json({ message: 'Password reset email sent.' });
};

exports.handleResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await getResetToken(token);

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token.' });
  }

  await updatePassword(user.email, password);
  res.json({ message: 'Password has been updated.' });
};

exports.handleChangePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const user = await authenticateUser(email);

  if (!user || user.password !== oldPassword) {
    return res.status(400).json({ message: 'Old password is incorrect.' });
  }

  await updatePassword(email, newPassword);
  await invalidateTokens(email); // Vô hiệu hóa tất cả token hiện tại

  res.json({ message: 'Password has been changed and all current tokens have been invalidated.' });
};