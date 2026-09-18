const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinary.uploader.upload('dummy.gif', (error, result) => {
  if (error) {
    console.error("Upload Error:", error);
  } else {
    console.log("Upload Success:", result.secure_url);
  }
});
