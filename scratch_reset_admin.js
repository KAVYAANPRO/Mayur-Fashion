const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./api/models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await Admin.updateOne({ name: 'mayurfashion' }, { password: hashedPassword });
  console.log('Password reset to admin123');
  process.exit();
});
