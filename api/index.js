require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

// Import routes
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const { router: authRoutes, initMasterAdmin, authMiddleware } = require('./routes/authRoutes');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mayur-fashion',
    allowedFormats: ['jpg', 'png', 'jpeg', 'webp'],
  }
});

const upload = multer({ storage: storage });

// Connect to Database
connectDB().then(() => {
  // Initialize Master Admin once DB is connected
  initMasterAdmin();
});

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://mayurfashion.vercel.app',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization'],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight for all routes
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api/auth', authRoutes);
// We will secure the admin operations in product and category routes next
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/chat', chatbotRoutes);

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload route (protected by authMiddleware)
app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Cloudinary URL is returned in req.file.path
  const imageUrl = req.file.path;
  res.json({ imageUrl });
});

// Basic health check route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Mayur Fashion API' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Express Error:", err.message, err);
  res.status(500).json({ error: err.message, details: err });
});

// Export for Vercel
module.exports = app;
