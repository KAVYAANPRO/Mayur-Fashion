const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
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

    let websiteDataContext = "Here is the current live data and business information from Mayur Fashion:\n\n";
    websiteDataContext += "Brand Information:\n";
    websiteDataContext += "- Brand: Mayur Fashion (Leading B2B Kurti & Ethnic Wear Manufacturer & Wholesaler)\n";
    websiteDataContext += "- Established: 1984, Surat, Gujarat (India's Textile Capital)\n";
    websiteDataContext += "- Specialization: Premium Rayon 14kg, Pure Cotton, Muslin, Silk Kurtis, Kurti Plazo Sets, 3-Piece Dupatta Sets, Co-ord Sets, Nyra Cuts\n";
    websiteDataContext += "- Sizes Available: M (38), L (40), XL (42), XXL (44), 3XL (46), 4XL (48), 5XL (50), 6XL (52)\n";
    websiteDataContext += "- Wholesale Policy: Minimum Order Quantity (MOQ) is 1 full catalog set. Retail single pieces not sold.\n";
    websiteDataContext += "- Contact/Orders: Dedicated Wholesale Desk on WhatsApp (+91 98251 23456) and sales@mayurfashion.com\n\n";
    websiteDataContext += "Categories:\n" + categories.map(c => `- ${c.name}: ${c.description || 'Premium Ethnic Wear'}`).join("\n") + "\n\n";
    websiteDataContext += "Live Product Catalog:\n" + products.map(p => {
      const customInfo = (p.customFields || []).map(f => `${f.key}: ${f.value}`).join(', ');
      const sizeStr = (p.sizes && p.sizes.length > 0) ? p.sizes.join(', ') : 'M-6XL';
      return `- ${p.name} (SKU: ${p.sku || 'N/A'}, Category: ${p.category ? p.category.name : 'Ethnic'}, Sizes: ${sizeStr}${customInfo ? ', ' + customInfo : ''}): ${p.description || 'Premium Collection'}`;
    }).join("\n");

    const systemInstruction = `You are Mayur Fashion's AI Assistant, representing India's premier B2B manufacturer and wholesaler of ethnic kurtis and sets since 1984.
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
      const { SchemaType } = require('@google/generative-ai');
      
      const responseSchema = {
        type: SchemaType.OBJECT,
        properties: {
          reply: {
            type: SchemaType.STRING,
            description: "The text response to the user."
          },
          action: {
            type: SchemaType.STRING,
            description: "The action to trigger on the frontend, if any. Can be 'none', 'book_call', or 'open_contact_form'."
          }
        },
        required: ["reply", "action"]
      };

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
        systemInstruction: systemInstruction,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        }
      });
      
      const chat = model.startChat({
        history: history || []
      });
      
      const result = await chat.sendMessage(message);
      const jsonResponse = JSON.parse(result.response.text());
      replyText = jsonResponse.reply;
      actionType = jsonResponse.action;
    } catch (geminiError) {
      console.warn('Gemini API failed, falling back to OpenRouter...', geminiError);
      
      if (!process.env.OPENROUTER_API_KEY) {
         throw new Error('OpenRouter API key is not configured for fallback.');
      }

      // OpenRouter Fallback
      const fallbackResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: systemInstruction + "\n\nRespond ONLY with a JSON object containing 'reply' (string) and 'action' (string, either 'none', 'book_call', or 'open_contact_form')." },
            ...(history || []).map(m => ({ role: m.role === 'model' ? 'assistant' : 'user', content: m.parts[0].text })),
            { role: "user", content: message }
          ]
        })
      });

      if (!fallbackResponse.ok) {
        throw new Error(`OpenRouter Fallback Error: ${fallbackResponse.statusText}`);
      }
      
      const data = await fallbackResponse.json();
      try {
        const jsonResponse = JSON.parse(data.choices[0].message.content);
        replyText = jsonResponse.reply || data.choices[0].message.content;
        actionType = jsonResponse.action || 'none';
      } catch (e) {
        replyText = data.choices[0].message.content;
      }
    }

    res.json({ reply: replyText, action: actionType });
  } catch (error) {
    console.error('Chatbot API Error:', error);
    res.status(500).json({ error: 'Failed to communicate with AI chatbot.' });
  }
});

module.exports = router;
