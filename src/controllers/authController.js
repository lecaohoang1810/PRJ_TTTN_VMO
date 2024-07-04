const { register, login, verifyEmail } = require('../services/authService');

exports.handleRegister = async (req, res) => {
  const { email, password, username, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const userId = await register(email, username, password);
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await login(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.handleVerifyEmail = async (req, res) => {
  const { email } = req.query;

  try {
    await verifyEmail(email);
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
