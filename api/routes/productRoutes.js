const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authMiddleware } = require('./authRoutes');

// GET all products (optional query ?category=id)
router.get('/', async (req, res) => {
  try {
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    const products = await Product.find(query)
      .populate('category')
      .populate('createdBy', 'name')
      .populate('lastModifiedBy', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category')
      .populate('createdBy', 'name')
      .populate('lastModifiedBy', 'name');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new product
router.post('/', authMiddleware, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    sku: req.body.sku,
    images: req.body.images || [],
    stock: req.body.stock,
    sizes: req.body.sizes || [],
    customFields: req.body.customFields || [],
    createdBy: req.user ? req.user.id : null,
    lastModifiedBy: req.user ? req.user.id : null
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update product (also for moving between categories, updating photos)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (req.body.name != null) product.name = req.body.name;
    if (req.body.description != null) product.description = req.body.description;
    if (req.body.price != null) product.price = req.body.price;
    if (req.body.category != null) product.category = req.body.category;
    if (req.body.sku != null) product.sku = req.body.sku;
    if (req.body.images != null) product.images = req.body.images;
    if (req.body.stock != null) product.stock = req.body.stock;
    if (req.body.sizes != null) product.sizes = req.body.sizes;
    if (req.body.customFields != null) product.customFields = req.body.customFields;
    if (req.user) product.lastModifiedBy = req.user.id;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE product
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST increment demand (to track what consumers ask for)
router.post('/:id/track-demand', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.demandScore = (product.demandScore || 0) + 1;
    await product.save();
    res.json({ message: 'Demand tracked', demandScore: product.demandScore });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
