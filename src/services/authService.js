const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser, verifyUser } = require('../models/userModel');
const { sendVerificationEmail } = require('../utils/emailUtil');
require('dotenv').config();



const register = async (email, username, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed Password during Register:', hashedPassword);
  const userId = await createUser(email, hashedPassword);
  await sendVerificationEmail(email);

  return userId;
};

const login = async (email, password) => {
  console.log('Email:', email);
  console.log('Password:', password);

  const user = await findUserByEmail(email);
  console.log('User:', user);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  if (!user.is_verified) {
    throw new Error('Email not verified');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log('isPasswordValid:', isPasswordValid);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};


const verifyEmail = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email');
  }

  await verifyUser(email);
};

module.exports = {
  register,
  login,
  verifyEmail,
};
