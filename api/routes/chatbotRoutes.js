const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

// POST chat message
router.post('/', async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Fetch products and categories to provide real website context to the AI
    const categories = await Category.find();
    const products = await Product.find().populate('category');

    let websiteDataContext = `MAYUR FASHION — COMPLETE BUSINESS KNOWLEDGE BASE (Use this as your ONLY source of truth)
==================================================================================

BRAND OVERVIEW:
- Brand Name: Mayur Fashion (brand label: Mayur™)
- Legal Name: Manohar Dresses
- Tagline: "We Care What You Wear"
- Established: 1991
- City/Location: Ahmedabad, Gujarat, India (NOT Surat)
- Industry: B2B Ethnic Wear Manufacturer & Wholesale Supplier
- Website: www.mayurfashion.co.in
- Email: mayurfashion1991@gmail.com
- Instagram: @MAYUR_FASHION_HOUSE (https://instagram.com/mayur_fashion_house)

OFFICE LOCATIONS (Both offices are in AHMEDABAD — never say Surat):
1. Sales Office & Showroom (S.O.):
   - Name: Mayur Fashion Showroom
   - Address: A-35, Ground Floor, Safal 3 Market, Sarangpur, Ahmedabad, Gujarat 380001
   - Google Maps: https://maps.app.goo.gl/H43w2d8ZAkVErfXL8

2. Head Office / Corporate Office (H.O.):
   - Name: Manohar Dresses Corporate Office
   - Address: A 501, 5th Floor, Iscon Commercial Complex (VIP Market), Omex Mill Compound, Nr. New Cloth Market, Sarangpur, Ahmedabad, Gujarat 380001
   - Google Maps: https://maps.app.goo.gl/g8NaiGuVayWc3wmY9

KEY AREA: Both offices are located in Sarangpur Market, Ahmedabad — one of India's premier textile hubs.

DIRECTORS & DIRECT CONTACTS:
1. Mayur Peswani — Director, Sales & Marketing (Primary Contact)
   - Phone: +91 99788 31115 | +91 79908 30323
   - WhatsApp: +91 99788 31115

2. Bharat Peswani — Operations & Wholesale
   - Phone: +91 99091 54100
   - WhatsApp: +91 99091 54100

3. Manohar Peswani — Founder & Chairman
   - Phone: +91 98253 43225
   - WhatsApp: +91 98253 43225

General WhatsApp Inquiries: Contact any of the directors above.

BUSINESS STATS:
- 35+ Years of Manufacturing Heritage (Since 1991)
- 15,000+ Retail & Wholesale Partners Trusted
- 30+ Countries served (Global Export)
- Size range: M (38) to 6XL (52) — complete catalog grading

SPECIALIZATION & PRODUCT CATEGORIES:
- Kurti 3-Piece Sets (with dupatta)
- Anarkali & Sharara Gowns
- Co-ord & Afghani Sets
- Pure Chanderi & Dola Silk
- Festive Lucknowi Chikankari
- Nyra Cut Kurtis
- Kurti Plazo Sets
- Premium Rayon 14kg collections
- Pure Cotton, Muslin, Silk Kurtis

SIZES AVAILABLE:
M (38), L (40), XL (42), XXL (44), 3XL (46), 4XL (48), 5XL (50), 6XL (52)
Full size grading from M to 6XL for all catalog sets.

WHOLESALE POLICY (B2B ONLY):
- Minimum Order Quantity (MOQ): 1 full catalog set
- Retail single pieces are NOT sold — this is strictly B2B wholesale
- Custom bulk orders and custom packaging are available — contact directors on WhatsApp
- International shipping (air & sea dispatch) available to 30+ countries

COMPANY STORY:
- Founded in 1991 by Mr. Manohar Peswani and family
- Established Manohar Dresses and registered the 'Mayur' brand label in Ahmedabad
- Grown into one of India's premier ethnic wear manufacturing houses
- Trusted by 15,000+ boutiques across India and exporting to 30+ nations worldwide

FREQUENTLY ASKED QUESTIONS — CORRECT ANSWERS:

Q: Where is your office / showroom?
A: We have two offices in Ahmedabad, Gujarat:
   1. Showroom: A-35, Ground Floor, Safal 3 Market, Sarangpur, Ahmedabad, Gujarat 380001
   2. Head Office: A 501, 5th Floor, Iscon Commercial Complex (VIP Market), Sarangpur, Ahmedabad, Gujarat 380001

Q: Where are you located? / What city is Mayur Fashion in?
A: Mayur Fashion is located in Ahmedabad, Gujarat, India. Both our showroom and head office are in the Sarangpur Market area of Ahmedabad.

Q: When was Mayur Fashion established?
A: Mayur Fashion (Manohar Dresses) was established in 1991.

Q: Who is the founder?
A: Mr. Manohar Peswani is the Founder & Chairman of Manohar Dresses / Mayur Fashion.

Q: What is the contact number?
A: Primary Contact — Mayur Peswani (Director): +91 99788 31115 / +91 79908 30323. You can also reach Bharat Peswani at +91 99091 54100 or Manohar Peswani at +91 98253 43225.

Q: What is the email address?
A: mayurfashion1991@gmail.com

Q: What is the WhatsApp number?
A: WhatsApp Mayur Peswani (Director) at +91 99788 31115 for fastest response.

Q: What sizes do you have?
A: We offer sizes M (38), L (40), XL (42), XXL (44), 3XL (46), 4XL (48), 5XL (50), 6XL (52) — complete grading from M to 6XL.

Q: What is the minimum order?
A: Minimum Order Quantity (MOQ) is 1 full catalog set. We do not sell single retail pieces.

Q: Do you do international shipping / export?
A: Yes, we export to 30+ countries worldwide via air and sea dispatch.

Q: Do you do custom orders or custom packaging?
A: Yes, custom bulk orders and custom packaging are available. Please contact our directors on WhatsApp.

Q: What fabrics do you use?
A: Premium Rayon 14kg, Pure Cotton, Muslin, Silk, Chanderi, Dola Silk, Viscose.

Q: What is your Instagram?
A: @MAYUR_FASHION_HOUSE — https://instagram.com/mayur_fashion_house

Q: Can I visit the showroom?
A: Yes! Our showroom is at A-35, Ground Floor, Safal 3 Market, Sarangpur, Ahmedabad. You can get directions at https://maps.app.goo.gl/H43w2d8ZAkVErfXL8

`;

    websiteDataContext += "\nCURRENT LIVE CATALOG DATA FROM DATABASE:\n";
    websiteDataContext += "Categories:\n" + categories.map(c => `- ${c.name}: ${c.description || 'Premium Ethnic Wear'}`).join("\n") + "\n\n";
    websiteDataContext += "Live Product Catalog:\n" + products.map(p => {
      const customInfo = (p.customFields || []).map(f => `${f.key}: ${f.value}`).join(', ');
      const sizeStr = (p.sizes && p.sizes.length > 0) ? p.sizes.join(', ') : 'M-6XL';
      return `- ${p.name} (SKU: ${p.sku || 'N/A'}, Category: ${p.category ? p.category.name : 'Ethnic'}, Sizes: ${sizeStr}${customInfo ? ', ' + customInfo : ''}): ${p.description || 'Premium Collection'}`;
    }).join("\n");


    const systemInstruction = `You are Mayur Fashion's AI Assistant, representing India's premier B2B manufacturer and wholesaler of ethnic kurtis and sets since 1991.
Your tone is professional, warm, and helpful for B2B buyers, retailers, and boutique owners. Do not be repetitive.
Use the live catalog and brand information provided below to answer customer queries accurately regarding designs, fabrics, sizes (up to 6XL), categories, and wholesale procedures.
For placing orders or custom bulk inquiries, politely invite the user to connect with our WhatsApp wholesale team.

If a user wants to book a call, schedule a meeting, or speak directly with the team, you MUST trigger the "book_call" action.
If a user wants to fill out a contact form, send a direct message, or asks where the contact us form is, you MUST trigger the "open_contact_form" action.
Otherwise, use the "none" action.

${websiteDataContext}`;

    let replyText = '';
    let actionType = 'none';

    try {
      if (!process.env.OPENROUTER_API_KEY) {
         throw new Error('OpenRouter API key is not configured.');
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            { role: "system", content: systemInstruction + "\n\nCRITICAL INSTRUCTION: You must respond ONLY with a raw JSON object containing exactly two keys: 'reply' (string) and 'action' (string, either 'none', 'book_call', or 'open_contact_form'). Do NOT wrap it in markdown code blocks. Do not add any conversational text outside the JSON." },
            ...(history || []).map(m => ({ role: m.role === 'model' ? 'assistant' : 'user', content: m.parts[0].text })),
            { role: "user", content: message }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter Error: ${response.statusText}`);
      }
      
      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Attempt to clean markdown if present (some free models wrap json in ```json ... ``` despite instructions)
      const cleanedContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
      
      try {
        const jsonResponse = JSON.parse(cleanedContent);
        replyText = jsonResponse.reply || cleanedContent;
        actionType = jsonResponse.action || 'none';
      } catch (e) {
        replyText = cleanedContent;
      }
    } catch (apiError) {
      console.error('API Error:', apiError);
      return res.status(500).json({ error: 'Failed to communicate with AI chatbot.' });
    }

    res.json({ reply: replyText, action: actionType });
  } catch (error) {
    console.error('Chatbot Internal Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
