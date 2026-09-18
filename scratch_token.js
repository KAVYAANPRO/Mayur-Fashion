const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'mayur-fashion-super-secret-key-123';
const payload = {
  user: {
    id: 'dummy_id',
    name: 'Master',
    role: 'master'
  }
};
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
console.log(token);
