const express = require('express');
const prisma = require('../config/db');
const { authenticate, authorize } = require('../middleware/auth');
const { formLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

const { sendContactMails } = require('../config/mail');

// POST /api/contacts — Public: Submit a contact/lead form
router.post('/', formLimiter, async (req, res) => {
  try {
    const { name, email, phone, companyName, message, type } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const contact = await prisma.contact.create({
      data: { name, email, phone, companyName, message, type: type || 'contact' },
    });

    // Send automated email notifications in background
    try {
      await sendContactMails(contact);
    } catch (mailError) {
      console.error('Mail notification failed:', mailError);
    }

    res.status(201).json({ message: 'Thank you! We will get back to you soon.', contact });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Failed to submit contact form.' });
  }
});

// GET /api/contacts — Admin: Get all leads
router.get('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { companyName: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.contact.count({ where }),
    ]);

    res.json({
      contacts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts.' });
  }
});

// PUT /api/contacts/:id/read — Admin: Mark lead as read
router.put('/:id/read', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const contact = await prisma.contact.update({
      where: { id: req.params.id },
      data: { isRead: true },
    });
    res.json({ contact });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact.' });
  }
});

// DELETE /api/contacts/:id — Admin: Delete a lead
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    await prisma.contact.delete({ where: { id: req.params.id } });
    res.json({ message: 'Contact deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact.' });
  }
});

// GET /api/contacts/export/csv — Admin: Export leads as CSV
router.get('/export/csv', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } });

    const header = 'Name,Email,Phone,Company,Message,Date\n';
    const rows = contacts
      .map(
        (c) =>
          `"${c.name}","${c.email}","${c.phone || ''}","${c.companyName || ''}","${c.message.replace(/"/g, '""')}","${c.createdAt.toISOString()}"`
      )
      .join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=praxire-leads.csv');
    res.send(header + rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to export contacts.' });
  }
});

module.exports = router;
