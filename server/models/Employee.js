const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true,
    enum: ['HR', 'Manager', 'Sales']
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  course: {
    type: String,
    required: true,
    enum: ['MCA', 'BCA', 'BSC']
  },
  image: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);