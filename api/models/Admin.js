const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['master', 'subadmin'],
    default: 'subadmin'
  }
}, { timestamps: true });

module.exports = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
