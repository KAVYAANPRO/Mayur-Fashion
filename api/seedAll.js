require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');

const CATEGORIES_DATA = [
  { name: "Kurti 3-Piece Sets", description: "Elegant 3-piece kurti sets with dupatta" },
  { name: "Anarkali & Sharara", description: "Traditional anarkali and sharara sets" },
  { name: "Co-ord & Afghani Sets", description: "Modern coord and afghani style sets" },
  { name: "Festive & Wedding Silk", description: "Premium silk for festive occasions" },
];

const categoryNameToId = {
  "kurti-3piece": "Kurti 3-Piece Sets",
  "festive-silk": "Festive & Wedding Silk",
  "anarkali-sharara": "Anarkali & Sharara",
  "coord-afghani": "Co-ord & Afghani Sets"
};

const SIZES = ["M (38)", "L (40)", "XL (42)", "XXL (44)", "3XL (46)", "4XL (48)", "5XL (50)", "6XL (52)"];

// All 21 products from frontend
const FRONTEND_PRODUCTS = [
  { id: "MF-2026-01", title: "Noor-E-Chanderi Ivory Pearl 3-Piece Kurti Set", category: "kurti-3piece", description: "An ethereal ivory pearl 3-piece ensemble featuring delicate scalloped borders on the hem and sleeves, paired with tailored straight silk trousers and a sheer embroidered organza dupatta. Perfectly graded across M to 6XL for an impeccable drape.", primaryImage: "/assets/products/shoot2_img_3502.webp", gallery: ["/assets/products/shoot2_img_3502.webp", "/assets/products/shoot2_img_3503.webp"], color: "Ivory Pearl / Off-White", fabric: "Pure Chanderi Silk with Shantoon Lining", bottomFabric: "Straight Cut Silk Pants with Lace Detailing", dupatta: "Pure Organza with Hand-Cut Scallop Embroidery", work: "Zari, Sequins & Threadwork Hand Embellishment", demandScore: 15 },
  { id: "MF-2026-02", title: "Gulmohar Magenta Zardozi Festive Silk Set", category: "festive-silk", description: "A radiant magenta festive kurti set with masterfully crafted floral neckline embellishments in gold zari and tonal resham threadwork, offering royal elegance for wedding guest and festival wear.", primaryImage: "/assets/products/shoot2_img_3505.webp", gallery: ["/assets/products/shoot2_img_3505.webp", "/assets/products/shoot2_img_3506.webp"], color: "Magenta Fuchsia", fabric: "Lustrous Modal Tissue Silk", bottomFabric: "Matching Tapered Silk Pants with Zari Borders", dupatta: "Silk Organza Dupatta with Antique Gold Border", work: "Intricate Neckline Zardozi & Resham Threadwork", demandScore: 12 },
  { id: "MF-2026-03", title: "Rani Kesar Fuchsia Flared Kalidar Anarkali", category: "anarkali-sharara", description: "A graceful Rani Pink kalidar anarkali with sweeping flare, intricate floral handwork along the yoke, and a sheer embroidered dupatta designed for grand celebrations and wedding festivities.", primaryImage: "/assets/products/shoot2_img_3473.webp", gallery: ["/assets/products/shoot2_img_3473.webp", "/assets/products/shoot2_img_3474.webp", "/assets/products/shoot2_img_3476.webp", "/assets/products/shoot2_img_3478.webp"], color: "Rani Pink / Fuchsia", fabric: "Crinkle Viscose Georgette with Shantoon Inner", bottomFabric: "Churidar / Flared Trouser", dupatta: "Sheer Net Dupatta with Hand Scallop Trim", work: "Handcrafted Neckline Floral Zari Embellishment", demandScore: 14 },
  { id: "MF-2026-04", title: "Aafreen Rust Terracotta Afghani Co-ord Set", category: "coord-afghani", description: "A statement modern ethnic co-ord set in earthy rust terracotta. Tailored V-neck kurti matched with chic pleated Afghani salwars for effortless contemporary style.", primaryImage: "/assets/products/shoot2_img_3450.webp", gallery: ["/assets/products/shoot2_img_3450.webp", "/assets/products/shoot2_img_3452.webp"], color: "Rust Terracotta", fabric: "Modal Silk with Fine Lurex Weave", bottomFabric: "Pleated Afghani Bottom with Embroidered Hem", dupatta: "Coordinated Contrast Dupatta", work: "Antique Gold Tilla & Dabka Work", demandScore: 8 },
  { id: "MF-2026-05", title: "Parijat Sage Mint Embroidered Kurti Set", category: "kurti-3piece", description: "Soothing pastel sage green kurti ensemble adorned with minimal pearl highlights and graceful botanical embroidery. Ideal for day weddings, sangeet, and boutique collections.", primaryImage: "/assets/products/shoot2_img_3469.webp", gallery: ["/assets/products/shoot2_img_3469.webp", "/assets/products/shoot2_img_3470.webp"], color: "Sage Mint Green", fabric: "Chanderi Weave Silk with Soft Cotton Inner", bottomFabric: "Tailored Cigarette Trousers", dupatta: "Lightweight Printed Silk Dupatta", work: "Subtle Pearl & Threadwork Embroidery", demandScore: 11 },
  { id: "MF-2026-06", title: "Mehrunisa Crimson Coral Handcrafted Kurti Set", category: "kurti-3piece", description: "Rich crimson coral tone with traditional Gujarati hand-embellished yoke. Perfectly styled for festive retail demand and wedding celebrations.", primaryImage: "/assets/products/shoot2_img_3462.webp", gallery: ["/assets/products/shoot2_img_3462.webp", "/assets/products/shoot2_img_3463.webp"], color: "Coral Crimson Red", fabric: "Pure Crepe Silk with Shantoon Lining", bottomFabric: "Straight Silk Pants", dupatta: "Embroidered Net Dupatta with Scallop Finish", work: "Fine Zari Work & Sequin Highlights", demandScore: 13 },
  { id: "MF-2026-07", title: "Zeenat Champagne Rose Shimmer Tissue Ensemble", category: "festive-silk", description: "Subtle luxury in champagne blush tones with metallic micro-shimmer. Features mirror-work accents along the neckline and flowy palazzo trousers.", primaryImage: "/assets/products/shoot2_img_3481.webp", gallery: ["/assets/products/shoot2_img_3481.webp", "/assets/products/shoot2_img_3482.webp"], color: "Champagne Rose", fabric: "Metallic Sheen Tissue Silk", bottomFabric: "Flared Palazzo Pants", dupatta: "Organza Tissue Dupatta with Tassel Edges", work: "Mirror Work & Fine Cutdana Detailing", demandScore: 7 },
  { id: "MF-2026-08", title: "Mumtaz Seafoam Aqua Silk Palazzo Set", category: "coord-afghani", description: "Refreshing seafoam green silk tunic paired with wide-leg breezy palazzos and a botanical print scarf, tailored for daytime luxury and resort festivities.", primaryImage: "/assets/products/shoot2_img_3489.webp", gallery: ["/assets/products/shoot2_img_3489.webp", "/assets/products/shoot2_img_3490.webp"], color: "Seafoam Aqua Green", fabric: "Pure Habotai Silk with Voile Lining", bottomFabric: "Wide-Leg Flowing Palazzo Trousers", dupatta: "Digital Botanical Printed Silk Dupatta", work: "Delicate French Knots & Floral Resham", demandScore: 5 },
  { id: "MF-2026-09", title: "Shahnaz Peach Blossom Flared Silk Suit", category: "anarkali-sharara", description: "Warm peach blossom hues enriched with traditional gota patti craftwork. A buoyant, celebratory silhouette that flatters every size from M to 6XL.", primaryImage: "/assets/products/shoot2_img_3457.webp", gallery: ["/assets/products/shoot2_img_3457.webp", "/assets/products/shoot2_img_3458.webp"], color: "Peach Blossom", fabric: "Pure Silk Georgette", bottomFabric: "Flared Tiered Sharara Bottom", dupatta: "Organza Dupatta with Gold Gota Border", work: "Gota Patti & Zari Floral Motifs", demandScore: 9 },
  { id: "MF-2026-10", title: "Suraiya Royal Midnight Violet Embroidered Suit", category: "festive-silk", description: "An opulent midnight violet shade crafted from rich modal silk, showcasing antique dual-tone needlework on the neckline and sleeve cuffs.", primaryImage: "/assets/products/shoot2_img_3497.webp", gallery: ["/assets/products/shoot2_img_3497.webp", "/assets/products/shoot2_img_3498.webp"], color: "Midnight Violet", fabric: "Heavy Modal Silk with Rich Drape", bottomFabric: "Straight Silk Pants with Zari Hem", dupatta: "Contrast Lavender Organza Dupatta", work: "Antique Silver & Gold Needlework", demandScore: 11 },
  { id: "MF-2026-11", title: "Kashish Midnight Black Floral Printed Kurti Set", category: "kurti-3piece", description: "Sophisticated midnight black 3-piece ensemble featuring gold floral prints and hand-embroidered neckline accents, paired with classic black trousers.", primaryImage: "/assets/products/shoot1_img_2530.webp", gallery: ["/assets/products/shoot1_img_2530.webp", "/assets/products/shoot1_img_2596.webp"], color: "Midnight Black & Gold", fabric: "Pure Chanderi Cotton Silk", bottomFabric: "Solid Black Straight Pants", dupatta: "Printed Cotton Silk Dupatta", work: "Foil Print & Neckline Handwork", demandScore: 14 },
  { id: "MF-2026-12", title: "Ananya Olive Ochre Chanderi 3-Piece Set", category: "kurti-3piece", description: "Earthy olive ochre gold tones with classic boota work, tailored in Ahmedabad with export-standard precision and full size availability.", primaryImage: "/assets/products/shoot1_img_2535.webp", gallery: ["/assets/products/shoot1_img_2535.webp", "/assets/products/shoot1_img_2600.webp"], color: "Olive Ochre Gold", fabric: "Chanderi Silk with Cotton Shantoon Inner", bottomFabric: "Ochre Silk Pants with Border Details", dupatta: "Zari Weave Border Dupatta", work: "Floral Boota Hand Embroidery & Zari", demandScore: 6 },
  { id: "MF-2026-13", title: "Mahira Fuchsia Silk Handloom Festive Suit", category: "festive-silk", description: "Vibrant fuchsia festive suit with a heavily embroidered organza dupatta and gleaming neckline embellishment, crafted for wedding celebrations.", primaryImage: "/assets/products/shoot1_img_2542.webp", gallery: ["/assets/products/shoot1_img_2542.webp", "/assets/products/shoot1_img_2556.webp"], color: "Fuchsia Pink", fabric: "Handloom Art Silk with Shantoon Lining", bottomFabric: "Tailored Silk Pants", dupatta: "Heavy Embroidered Organza Dupatta", work: "Intricate Neckline Zari & Sequin Highlights", demandScore: 13 },
  { id: "MF-2026-14", title: "Zohra Plum Wine Embroidered Kurti Set", category: "kurti-3piece", description: "A deep plum wine silhouette highlighting subtle resham and zari detailing along the V-neckline. Features three photoshoot perspectives.", primaryImage: "/assets/products/shoot1_img_2545.webp", gallery: ["/assets/products/shoot1_img_2545.webp", "/assets/products/shoot1_img_2559.webp", "/assets/products/shoot1_img_2591.webp"], color: "Plum Wine", fabric: "Pure Modal Silk", bottomFabric: "Straight Cut Silk Pants", dupatta: "Silk Blend Dupatta with Tassels", work: "Resham & Zari Neckline Handwork", demandScore: 12 },
  { id: "MF-2026-15", title: "Roopali Mustard Gold Heavy Zardozi Kurti Set", category: "kurti-3piece", description: "Radiant mustard gold 3-piece suit with 4 studio shoot angles showcasing the rich craftsmanship and graceful drape across standard and plus sizes.", primaryImage: "/assets/products/shoot1_img_2552.webp", gallery: ["/assets/products/shoot1_img_2552.webp", "/assets/products/shoot1_img_2570.webp", "/assets/products/shoot1_img_2577.webp", "/assets/products/shoot1_img_2583.webp"], color: "Mustard Gold", fabric: "Chanderi Silk with Soft Lining", bottomFabric: "Mustard Silk Pants", dupatta: "Organza Embroidered Dupatta", work: "Heavy Zardozi, Cutdana & Sequin Craft", demandScore: 16 },
  { id: "MF-2026-16", title: "Nandini Dusty Mauve Floral Organza Set", category: "kurti-3piece", description: "Contemporary dusty mauve aesthetic adorned with delicate florals and translucent organza layers, creating a chic modern ethnic look.", primaryImage: "/assets/products/shoot1_img_2576.webp", gallery: ["/assets/products/shoot1_img_2576.webp", "/assets/products/shoot1_img_2597.webp"], color: "Dusty Mauve", fabric: "Silk Organza with Shantoon Inner", bottomFabric: "Mauve Straight Pants", dupatta: "Sheer Floral Organza Dupatta", work: "Delicate Resham & Zari Work", demandScore: 5 },
  { id: "MF-2026-17", title: "Tara Warm Sand Linen Silk Ensemble", category: "coord-afghani", description: "Understated luxury in warm sand linen silk. Tailored with clean minimalist lines and comfortable relaxed trousers for versatile daily and boutique wear.", primaryImage: "/assets/products/shoot1_img_2578.webp", gallery: ["/assets/products/shoot1_img_2578.webp", "/assets/products/shoot1_img_2593.webp"], color: "Warm Sand Linen", fabric: "Linen Silk Blend", bottomFabric: "Relaxed Fit Trousers", dupatta: "Lightweight Linen Stole", work: "Minimalist Threadwork & Button Accents", demandScore: 4 },
  { id: "MF-2026-18", title: "Chandrika Lilac Rose Embroidered Silk Suit", category: "anarkali-sharara", description: "Dreamy lilac rose sharara suit with fine zari needlework on the yoke, matched with flared bottom tiers and an embroidered scalloped dupatta.", primaryImage: "/assets/products/shoot1_img_2586.webp", gallery: ["/assets/products/shoot1_img_2586.webp", "/assets/products/shoot1_img_2599.webp"], color: "Lilac Rose", fabric: "Crinkle Georgette Silk with Shantoon Lining", bottomFabric: "Flared Sharara Pants", dupatta: "Organza Dupatta with Scalloped Edge", work: "Intricate Zari & Sequin Hand Embellishment", demandScore: 10 },
  { id: "MF-2026-19", title: "Sultana Off-White Floral Printed Summer Set", category: "kurti-3piece", description: "Light and breezy off-white kurti set with pastel botanical motifs and refined neckline embroidery, perfect for spring/summer catalog collections.", primaryImage: "/assets/products/shoot1_img_2568.webp", gallery: ["/assets/products/shoot1_img_2568.webp", "/assets/products/shoot1_img_2594.webp"], color: "Off-White & Flora", fabric: "Chanderi Cotton Silk", bottomFabric: "Tailored Off-White Silk Pants", dupatta: "Coordinated Floral Printed Dupatta", work: "Fine Foil & Neckline Thread Detailing", demandScore: 6 },
  { id: "MF-2026-20", title: "Reva Soft Blush Pink Embroidered Kurti Set", category: "kurti-3piece", description: "Delicate blush pink hue with glistening micro-sequin highlights along the neckline. Paired with straight-cut silk pants and a sheer organza dupatta.", primaryImage: "/assets/products/shoot1_img_2554.webp", gallery: ["/assets/products/shoot1_img_2554.webp", "/assets/products/shoot1_img_2602.webp"], color: "Blush Pink", fabric: "Pure Modal Chanderi with Cotton Inner", bottomFabric: "Blush Silk Straight Pants", dupatta: "Organza Dupatta with Zari Border", work: "Subtle Sequin & Threadwork Hand Stitching", demandScore: 11 },
  { id: "MF-2026-21", title: "Bhavna Slate Grey Printed Silk Set", category: "coord-afghani", description: "Understated modern slate grey ensemble with delicate geometric print accents and minimal hand-stitched detailing on the collar and cuffs.", primaryImage: "/assets/products/shoot1_img_2549.webp", gallery: ["/assets/products/shoot1_img_2549.webp", "/assets/products/shoot1_img_2565.webp"], color: "Slate Grey", fabric: "Pure Modal Silk", bottomFabric: "Straight Cut Silk Trousers", dupatta: "Printed Silk Dupatta", work: "Subtle Hand Embellishment", demandScore: 5 },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Insert categories
    const categories = await Category.insertMany(CATEGORIES_DATA);
    console.log(`📦 Inserted ${categories.length} categories`);

    // Map category names to IDs
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    // Convert frontend products to MongoDB format
    const productsToInsert = FRONTEND_PRODUCTS.map(p => ({
      sku: p.id,
      name: p.title,
      description: p.description,
      category: categoryMap[categoryNameToId[p.category]],
      images: p.gallery.map(img => `https://mayurfashion.vercel.app${img}`),
      price: 0,
      stock: 100,
      sizes: SIZES,
      demandScore: p.demandScore || 0,
      customFields: [
        { key: "Color", value: p.color },
        { key: "Fabric", value: p.fabric },
        { key: "Bottom Fabric", value: p.bottomFabric },
        { key: "Dupatta", value: p.dupatta },
        { key: "Work", value: p.work }
      ]
    }));

    const products = await Product.insertMany(productsToInsert);
    console.log(`🎉 Inserted ${products.length} products`);

    console.log('\n✅ Database seeded successfully with all 21 products!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
