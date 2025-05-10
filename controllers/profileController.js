const User = require('../models/user-profile');

// Get all entrepreneurs
exports.getEntrepreneurs = async (req, res) => {
  try {
    const users = await User.find({ role: 'Entrepreneur' });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get entrepreneur by ID
exports.getEntrepreneurById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, role: 'Entrepreneur' });
    if (!user) return res.status(404).json({ msg: 'Entrepreneur not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all investors
exports.getInvestors = async (req, res) => {
  try {
    const users = await User.find({ role: 'Investor' });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get investor by ID
exports.getInvestorById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, role: 'Investor' });
    if (!user) return res.status(404).json({ msg: 'Investor not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID (general)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Create a new user
exports.createUser = async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
// Update user profile
exports.updateUser = async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { id: req.body.id }, // custom ID field, not _id
        { $set: req.body },
        { new: true }
      );
      if (!updatedUser) return res.status(404).json({ msg: 'User not found' });
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

