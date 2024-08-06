const pool = require('../configs/database');

const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
  return rows[0];
};

const createUser = async (email, password) => {
  const [result] = await pool.query('INSERT INTO Users (email, password, is_verified) VALUES (?, ?, ?)', [email, password, false]);
  return result.insertId;
};
const createAdmin = async (email, password) => {
  const [result] = await pool.query('INSERT INTO users (email, password, is_verified, is_admin) VALUES (?, ?, ?, ?)', [email, password, false, true]);
  return result.insertId;
};

const verifyUser = async (email) => {
  const [result] = await pool.query('UPDATE Users SET is_verified = ? WHERE email = ?', [true, email]);
  return result.affectedRows;
};

const authenticateUser = async (email) => {
  const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
  return rows[0];
};
const makeAdmin = async (email) => {
  const [result] = await pool.query('UPDATE Users SET is_admin = ? WHERE email = ?', [true, email]);
  return result.affectedRows;
};
const setResetToken = async (email, token) => {
  const expires = new Date();
  expires.setHours(expires.getHours() + 1); // Token expires in 1 hour
  const [result] = await pool.query('UPDATE Users SET reset_token = ?, reset_expires = ? WHERE email = ?', [token, expires, email]);
  return result.affectedRows;
};

const getResetToken = async (token) => {
  const [rows] = await pool.query('SELECT * FROM Users WHERE reset_token = ? AND reset_expires > NOW()', [token]);
  return rows[0];
};

const updatePassword = async (email, password) => {
  const [result] = await pool.query('UPDATE Users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE email = ?', [password, email]);
  return result.affectedRows;
};

const invalidateTokens = async (email) => {
  const [result] = await pool.query('UPDATE Users SET reset_token = NULL, reset_expires = NULL WHERE email = ?', [email]);
  return result.affectedRows;
};

module.exports = { findUserByEmail, createUser, createAdmin, verifyUser, authenticateUser, makeAdmin, setResetToken, getResetToken, updatePassword, invalidateTokens };
