const mongoose = require('mongoose');

// Stores site-wide settings like the company promo video
const SiteSettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'global'
  },
  companyVideoUrl: {
    type: String,
    default: ''
  },
  companyVideoType: {
    type: String,
    enum: ['youtube', 'vimeo', 'cloudinary', 'direct', ''],
    default: ''
  },
  companyVideoTitle: {
    type: String,
    default: 'Our Story'
  },
  companyVideoCaption: {
    type: String,
    default: 'See how we craft every piece with love.'
  }
}, { timestamps: true });

module.exports = mongoose.models.SiteSettings ||
  mongoose.model('SiteSettings', SiteSettingsSchema);
