const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const nodemailer = require('nodemailer');

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// POST submit inquiry
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // 1. Save to MongoDB
    const inquiry = new Inquiry({ name, email, phone, message });
    await inquiry.save();

    // 2. Send email to owner
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'mayurfashion1991@gmail.com', // sending to the owner
      subject: `New Inquiry from ${name}`,
      text: `You have received a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending error:', error);
        // We still respond with success since DB save worked, but we might want to log this.
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all inquiries (for admin panel)
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
