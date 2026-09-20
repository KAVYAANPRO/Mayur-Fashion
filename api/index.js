require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

// Import routes
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const { router: authRoutes, initMasterAdmin, authMiddleware } = require('./routes/authRoutes');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://mayurfashion.vercel.app',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow all origins by echoing back the requesting origin
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// DB connection middleware — connects once and reuses
let dbInitialized = false;
app.use(async (req, res, next) => {
  try {
    await connectDB();
    // Initialize master admin only once after DB connects
    if (!dbInitialized) {
      await initMasterAdmin();
      dbInitialized = true;
    }
    next();
  } catch (err) {
    console.error('DB connection failed:', err.message);
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mayur-fashion',
    allowedFormats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});
const upload = multer({ storage });

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Mayur Fashion API' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/chat', chatbotRoutes);
app.use('/api/settings', settingsRoutes);

// Serve uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Single image upload (legacy support)
app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ imageUrl: req.file.path });
});

// Multi-image upload — accepts up to 20 images at once (field name: "images")
app.post('/api/upload-multiple', authMiddleware, upload.array('images', 20), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }
  const imageUrls = req.files.map(f => f.path);
  res.json({ imageUrls });
});

// Video upload to Cloudinary (single video, stored in mayur-fashion/videos folder)
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mayur-fashion/videos',
    resource_type: 'video',
    allowedFormats: ['mp4', 'mov', 'avi', 'webm', 'mkv'],
  },
});
const uploadVideo = multer({ storage: videoStorage });

app.post('/api/upload-video', authMiddleware, uploadVideo.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No video file uploaded' });
  }
  res.json({ videoUrl: req.file.path });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Express Error:', err.message);
  res.status(500).json({ error: err.message });
});

// Local dev server
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() => {
      initMasterAdmin();
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error('Failed to start server:', err));
}

// Export for Vercel
module.exports = app;
