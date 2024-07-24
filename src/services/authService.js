const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser, createAdmin, verifyUser, makeAdmin } = require('../models/userModel');
const { sendVerificationEmail } = require('../utils/emailUtil');
require('dotenv').config();

const register = async (email, username, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await createUser(email, hashedPassword);
  await sendVerificationEmail(email);

  return userId;
};

const registerAdmin = async (email, username, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await createAdmin(email, hashedPassword);
  await sendVerificationEmail(email);

  return userId;
};

const login = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  if (!user.is_verified) {
    throw new Error('Email not verified');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ userId: user.id, isAdmin: user.is_admin }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

const verifyEmail = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email');
  }

  await verifyUser(email);
};
const grantAdminRights = async (adminEmail, targetEmail) => {
  // Tìm người dùng cần cấp quyền
  const user = await findUserByEmail(targetEmail);
  if (!user) {
    throw new Error('User not found');
  }

  // Cấp quyền admin cho người dùng
  await makeAdmin(targetEmail);
  return 'Admin rights granted successfully';
};
module.exports = {
  register,
  registerAdmin,
  login,
  verifyEmail, grantAdminRights
};
