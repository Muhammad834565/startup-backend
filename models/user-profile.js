const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  address: String,
  city: String,
  state: String,
  country: String,
});

const companySchema = new mongoose.Schema({
  department: String,
  name: String,
  title: String,
  address: addressSchema,
});

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  role: {type: String, enum: ['Investor', 'Entrepreneur'], required: true,},
  age: {type: Number,
    min: [10, 'Age must be at least 10'],
    max: [150, 'Age must be at most 150'],
    required: true
  },
  gender: {type: String,enum: ['Male', 'Female'],required: true,},
  phone: {
    type: String,
    maxlength: [15, 'Phone number must be at most 15 digits'],
    required: true
  },
  cnic: {
    type: String,
    maxlength: [15, 'Phone number must be at most 15 digits'],
    required: true
  },
  birthdate: Date,
  image: String,
  address: addressSchema,
  company: companySchema,
}, { timestamps: true });

module.exports = mongoose.model('User-Profile', userSchema);
