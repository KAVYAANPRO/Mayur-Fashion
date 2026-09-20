const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./api/models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  try {
    const hashedPassword = await bcrypt.hash('kavyaan0225', 10);
    const result = await Admin.findOneAndUpdate(
      { name: 'Mayur' }, 
      { 
        password: hashedPassword,
        role: 'master'
      },
      { upsert: true, new: true }
    );
    console.log('Master admin setup successfully:', result.name);
  } catch (error) {
    console.error('Error setting up master admin:', error);
  } finally {
    process.exit();
  }
});
