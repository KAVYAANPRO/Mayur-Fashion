const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret for JWT (in production, use process.env.JWT_SECRET)
const JWT_SECRET = process.env.JWT_SECRET || 'mayur-fashion-super-secret-key-123';

// Initialize Master Admin
const initMasterAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('mayurfashion123', salt);
      const masterAdmin = new Admin({
        name: 'mayurfashion',
        password: hashedPassword,
        role: 'master'
      });
      await masterAdmin.save();
      console.log('Master admin initialized');
    }
  } catch (err) {
    console.error('Failed to initialize master admin:', err);
  }
};

// Login Route
router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const admin = await Admin.findOne({ name });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: admin.id,
        name: admin.name,
        role: admin.role
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: payload.user });
      }
    );
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Create Sub-Admin (Only Master can do this)
router.post('/create-subadmin', authMiddleware, async (req, res) => {
  if (req.user.role !== 'master') {
    return res.status(403).json({ message: 'Access denied: Master admin only' });
  }

  const { name, password } = req.body;
  
  try {
    let admin = await Admin.findOne({ name });
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new Admin({
      name,
      password: hashedPassword,
      role: 'subadmin'
    });

    await admin.save();
    res.json({ message: 'Sub-admin created successfully', admin: { name: admin.name, role: admin.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all admins (Master only)
router.get('/admins', authMiddleware, async (req, res) => {
  if (req.user.role !== 'master') {
    return res.status(403).json({ message: 'Access denied: Master admin only' });
  }
  try {
    const admins = await Admin.find().select('-password');
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE sub-admin (Master only)
router.delete('/admins/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'master') {
    return res.status(403).json({ message: 'Access denied: Master admin only' });
  }
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    if (admin.role === 'master') {
      return res.status(403).json({ message: 'Cannot delete master admin' });
    }
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: 'Admin deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = {
  router,
  initMasterAdmin,
  authMiddleware
};
