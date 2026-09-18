const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const Product = require('../models/Product');
const Category = require('../models/Category');

// POST chat message
router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Fetch products and categories to provide real website context to the AI
    const categories = await Category.find();
    const products = await Product.find().populate('category');

    let websiteDataContext = "Here is the current data from our website database:\n\n";
    websiteDataContext += "Categories:\n" + categories.map(c => `- ${c.name}: ${c.description || 'No description'}`).join("\n") + "\n\n";
    websiteDataContext += "Products:\n" + products.map(p => `- ${p.name} (Category: ${p.category ? p.category.name : 'Unknown'}): ${p.description || 'No description'}`).join("\n");

    // The system prompt defines the chatbot's persona and initial knowledge.
    const systemInstruction = `You are the Mayur Fashion Chatbot, an AI assistant for a fashion brand. 
Your goal is to answer customer queries politely and professionally. 
Use the following data from our website to answer product and category inquiries. Only offer what is in this data.

${websiteDataContext}`;

    let replyText = '';

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
        contents: message,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });
      replyText = response.text;
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
          model: "google/gemini-2.5-flash", // We can use the openrouter gemini equivalent or another model
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: message }
          ]
        })
      });

      if (!fallbackResponse.ok) {
        throw new Error(`OpenRouter Fallback Error: ${fallbackResponse.statusText}`);
      }
      
      const data = await fallbackResponse.json();
      replyText = data.choices[0].message.content;
    }

    res.json({ reply: replyText });
  } catch (error) {
    console.error('Chatbot API Error:', error);
    res.status(500).json({ error: 'Failed to communicate with AI chatbot.' });
  }
});

module.exports = router;
