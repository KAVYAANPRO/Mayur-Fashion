const mongoose = require('mongoose');
const Admin = require('./api/models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const admins = await Admin.find({});
  console.log(admins);
  process.exit();
});
