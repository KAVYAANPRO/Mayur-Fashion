require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');

// Hardcoded categories from frontend
const CATEGORIES_DATA = [
  { name: "Kurti 3-Piece Sets", description: "Elegant 3-piece kurti sets with dupatta" },
  { name: "Anarkali & Sharara", description: "Traditional anarkali and sharara sets" },
  { name: "Co-ord & Afghani Sets", description: "Modern coord and afghani style sets" },
  { name: "Festive & Wedding Silk", description: "Premium silk for festive occasions" },
];

// Hardcoded products from frontend (abbreviated - add all 21)
const PRODUCTS_DATA = [
  {
    sku: "MF-2026-01",
    name: "Noor-E-Chanderi Ivory Pearl 3-Piece Kurti Set",
    description: "An ethereal ivory pearl 3-piece ensemble featuring delicate scalloped borders on the hem and sleeves, paired with tailored straight silk trousers and a sheer embroidered organza dupatta. Perfectly graded across M to 6XL for an impeccable drape.",
    categoryName: "Kurti 3-Piece Sets",
    images: [
      "https://mayurfashion.vercel.app/assets/products/shoot2_img_3502.webp",
      "https://mayurfashion.vercel.app/assets/products/shoot2_img_3503.webp"
    ],
    price: 0,
    stock: 100,
    sizes: ["M (38)", "L (40)", "XL (42)", "XXL (44)", "3XL (46)", "4XL (48)", "5XL (50)", "6XL (52)"],
    customFields: [
      { key: "Color", value: "Ivory Pearl / Off-White" },
      { key: "Fabric", value: "Pure Chanderi Silk with Shantoon Lining" },
      { key: "Bottom Fabric", value: "Straight Cut Silk Pants with Lace Detailing" },
      { key: "Dupatta", value: "Pure Organza with Hand-Cut Scallop Embroidery" },
      { key: "Work", value: "Zari, Sequins & Threadwork Hand Embellishment" }
    ]
  },
  {
    sku: "MF-2026-02",
    name: "Gulmohar Magenta Zardozi Festive Silk Set",
    description: "Regal festive tone with artisan handwork yoke, perfect for celebrations.",
    categoryName: "Festive & Wedding Silk",
    images: [
      "https://mayurfashion.vercel.app/assets/products/shoot2_img_3505.webp",
      "https://mayurfashion.vercel.app/assets/products/shoot2_img_3506.webp"
    ],
    price: 0,
    stock: 100,
    sizes: ["M (38)", "L (40)", "XL (42)", "XXL (44)", "3XL (46)", "4XL (48)", "5XL (50)", "6XL (52)"],
    customFields: [
      { key: "Color", value: "Magenta Fuchsia" },
      { key: "Fabric", value: "Premium Silk" },
      { key: "Work", value: "Zardozi Hand Embroidery" }
    ]
  },
  // Add remaining 19 products here in same format...
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Insert categories
    const categories = await Category.insertMany(CATEGORIES_DATA);
    console.log(`Inserted ${categories.length} categories`);

    // Map category names to IDs
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    // Insert products with mapped category IDs
    const productsToInsert = PRODUCTS_DATA.map(p => ({
      ...p,
      category: categoryMap[p.categoryName],
      categoryName: undefined // Remove temp field
    }));

    const products = await Product.insertMany(productsToInsert);
    console.log(`Inserted ${products.length} products`);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
