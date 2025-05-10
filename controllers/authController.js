const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password, email, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email ,role });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Token valid for 12 hours
    const token = jwt.sign(
      { id: user._id },
      'secretKey', // Use env variable in production
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user._id, username: user.username,email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

exports.verifyToken = (req, res) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, access denied' });

  try {
    const verified = jwt.verify(token, 'secretKey'); // Use env variable for production
    res.status(200).json({ msg: 'Token is valid' });
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid or expired' });
  }
};
