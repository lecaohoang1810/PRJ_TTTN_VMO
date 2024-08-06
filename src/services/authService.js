const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { findUserByEmail, createUser, createAdmin, verifyUser, makeAdmin, updateUserPassword, savePasswordResetToken, findUserByResetToken, invalidateUserTokens } = require('../models/userModel');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/emailUtil');
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
  const user = await findUserByEmail(targetEmail);
  if (!user) {
    throw new Error('User not found');
  }

  await makeAdmin(targetEmail);
  return 'Admin rights granted successfully';
};

const forgetPassword = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 3600000); // 1 hour from now
  await savePasswordResetToken(user.id, token, expires);

  await sendPasswordResetEmail(email, token);
};

const resetPassword = async (token, newPassword) => {
  const user = await findUserByResetToken(token);
  if (!user) {
    throw new Error('Invalid or expired token');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(user.id, hashedPassword);
};

const changePassword = async (email, oldPassword, newPassword) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid old password');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(user.id, hashedPassword);
  await invalidateUserTokens(user.id);
};

module.exports = {
  register,
  registerAdmin,
  login,
  verifyEmail,
  grantAdminRights,
  forgetPassword,
  resetPassword,
  changePassword
};
