const express = require('express');
const prisma = require('../config/db');

const { formLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

const { sendNewsletterWelcome } = require('../config/mail');

// POST /api/newsletter — Public: Subscribe to newsletter
router.post('/', formLimiter, async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      if (existing.isActive) {
        return res.status(409).json({ error: 'Email already subscribed.' });
      }
      // Re-activate
      await prisma.newsletterSubscriber.update({
        where: { email },
        data: { isActive: true },
      });

      try {
        await sendNewsletterWelcome(email);
      } catch (mailError) {
        console.error('Newsletter mail failed:', mailError);
      }

      return res.json({ message: 'Welcome back! Subscription reactivated.' });
    }

    await prisma.newsletterSubscriber.create({ data: { email } });

    try {
      await sendNewsletterWelcome(email);
    } catch (mailError) {
      console.error('Newsletter mail failed:', mailError);
    }

    res.status(201).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to subscribe.' });
  }
});

// POST /api/newsletter/unsubscribe — Public: Unsubscribe
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    await prisma.newsletterSubscriber.update({
      where: { email },
      data: { isActive: false },
    });
    res.json({ message: 'Unsubscribed successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to unsubscribe.' });
  }
});

module.exports = router;
