const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  role: {
    type: String,
    enum: ['Investor', 'Entrepreneur'],

  },
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model('User', UserSchema);
