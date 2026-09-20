const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');
const { authMiddleware } = require('./authRoutes');

// Helper: detect video type from URL
function detectVideoType(url) {
  if (!url) return '';
  if (/youtube\.com|youtu\.be/.test(url)) return 'youtube';
  if (/vimeo\.com/.test(url))             return 'vimeo';
  if (/cloudinary\.com/.test(url))        return 'cloudinary';
  return 'direct';
}

// Helper: extract YouTube embed URL from various YouTube URL formats
function normaliseYouTubeUrl(url) {
  // Already an embed URL
  if (url.includes('youtube.com/embed/')) return url;

  // youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  // youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  return url;
}

// Helper: extract Vimeo embed URL
function normaliseVimeoUrl(url) {
  if (url.includes('player.vimeo.com/video/')) return url;
  const match = url.match(/vimeo\.com\/(\d+)/);
  if (match) return `https://player.vimeo.com/video/${match[1]}`;
  return url;
}

// GET /api/settings  — public (no auth needed for landing page to fetch)
router.get('/', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne({ key: 'global' });
    if (!settings) {
      settings = await SiteSettings.create({ key: 'global' });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/settings  — admin only
router.put('/', authMiddleware, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne({ key: 'global' });
    if (!settings) settings = new SiteSettings({ key: 'global' });

    const rawUrl = (req.body.companyVideoUrl || '').trim();
    const type   = detectVideoType(rawUrl);

    // Normalise embed URLs for YouTube and Vimeo
    let finalUrl = rawUrl;
    if (type === 'youtube') finalUrl = normaliseYouTubeUrl(rawUrl);
    if (type === 'vimeo')   finalUrl = normaliseVimeoUrl(rawUrl);

    settings.companyVideoUrl     = finalUrl;
    settings.companyVideoType    = type;
    settings.companyVideoTitle   = req.body.companyVideoTitle   || settings.companyVideoTitle;
    settings.companyVideoCaption = req.body.companyVideoCaption || settings.companyVideoCaption;

    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/settings/video  — remove video
router.delete('/video', authMiddleware, async (req, res) => {
  try {
    const settings = await SiteSettings.findOne({ key: 'global' });
    if (settings) {
      settings.companyVideoUrl  = '';
      settings.companyVideoType = '';
      await settings.save();
    }
    res.json({ message: 'Video removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
