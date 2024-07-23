const { register, login, verifyEmail } = require('../services/authService');

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
    const userId = await register(email, username, password);
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  
};
exports.handleRegisterAdmin = async (req, res) => {
  const { email, password, username, confirmPassword } = req.body;

  if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format. Email must end with @gmail.com' });
  }

  try {
      const userId = await registerAdmin(email, username, password, confirmPassword);
      res.status(201).json({ message: 'Admin registered successfully', userId });
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
