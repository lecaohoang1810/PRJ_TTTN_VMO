const pool = require('../configs/database');

const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
  return rows[0];
};

const createUser = async (email, password) => {
  const [result] = await pool.query('INSERT INTO Users (email, password, is_verified) VALUES (?, ?, ?)', [email, password, false]);
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

module.exports = { findUserByEmail, createUser, verifyUser, authenticateUser };
