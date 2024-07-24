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
module.exports = { findUserByEmail, createUser, createAdmin, verifyUser, authenticateUser, makeAdmin };
