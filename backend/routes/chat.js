const express = require('express');
const router = express.Router();

// POST /api/chat - Public: Send chat message history and retrieve OpenRouter completions
router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterKey) {
      console.warn('OPENROUTER_API_KEY is not configured. Falling back to static replies.');
      return res.json({
        reply: 'Hello! I am the Praxire Assistant. Our chatbot API is currently offline. Please email us at info@praxire.com or contact us on WhatsApp at +91 80728 10080 for any inquiries!',
      });
    }

    const systemPrompt = `You are the Praxire AI Assistant. Praxire is a premium software consulting & IT solutions company started in the year 2025.
Our mission is helping businesses grow through innovative digital solutions.
Co-founders: Vishal G (CEO) and Mohamed M (CTO).

We specialize in:
- Custom Software Development (ERP customization, Custom CRM, enterprise applications, and product engineering)
- Application Development (Web App, Custom App, Application Modernization, Cloud Apps, E-Commerce Applications)
- Technology Services (Mobile App development with Flutter/React Native, SaaS Development, Artificial Intelligence & Machine Learning, Data Analytics, Business Intelligence, UX/UI Design)
- Quality & DevOps Services (Embedded Product development, DevOps automation/CI-CD, QA & testing, SEO Optimization, Digital Marketing)

Praxire Information & FAQs:
1. **Startup Year**: Praxire started in 2025.
2. **Client Target & Execution**: We have a major focus on working with international clients, particularly with Malaysia clients, as well as teams in India and globally. We synchronize our developer sprint schedules (GMT+8 and IST) and use Singapore/APAC cloud nodes to ensure low-latency performance for Malaysian users.
3. **Delivery Process**:
   - **Discovery & Planning**: Blueprint systems, database layouts, APIs, and project scope.
   - **Design & Prototyping**: Create pixel-perfect UI/UX designs and clickable prototypes.
   - **Agile Development**: Bi-weekly sprints, weekly demonstrations, continuous integration, and regression testing.
   - **Deploy & Support**: Production cloud launching, server optimization, CI/CD setup, and 24/7 SLA monitoring.
4. **WhatsApp & Phone**: +91 80728 10080 (Indian number). Always mention that they can click the WhatsApp floating button on the bottom left for immediate human chat!
5. **Email**: info@praxire.com (For project briefs, RFP submissions, or careers).

Instructions for your responses:
- Keep your messages friendly, professional, consultative, and concise (under 200 words).
- Use bullet points and paragraphs to make text highly readable.
- If asked how to connect or contact us, provide the email info@praxire.com and phone +91 80728 10080.
- Highlight that we work with Malaysia clients and cross-border teams seamlessly.
- Remind users about our WhatsApp contact +91 80728 10080.
- If asked about pricing, suggest booking a free consultation call.`;

    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m) => ({
        role: m.isBot ? 'assistant' : 'user',
        content: m.text,
      })),
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openRouterKey}`,
        'HTTP-Referer': 'https://praxire.com',
        'X-Title': 'Praxire Assistant Widget',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter request failed:', errorText);
      throw new Error(`OpenRouter returned status ${response.status}`);
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      'I apologize, but I am having trouble answering right now. Please email us at info@praxire.com or contact us on WhatsApp!';

    res.json({ reply });
  } catch (error) {
    console.error('Praxire chatbot API error:', error);
    res.status(500).json({ error: 'Failed to generate chat assistant reply.' });
  }
});

module.exports = router;
