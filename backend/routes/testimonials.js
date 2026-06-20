const express = require('express');
const prisma = require('../config/db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/testimonials — Public: Get active testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ testimonials });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials.' });
  }
});

// POST /api/testimonials — Admin: Create testimonial
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { name, position, company, content, avatar, rating } = req.body;
    const testimonial = await prisma.testimonial.create({
      data: { name, position, company, content, avatar, rating },
    });
    res.status(201).json({ testimonial });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create testimonial.' });
  }
});

// PUT /api/testimonials/:id — Admin: Update testimonial
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const testimonial = await prisma.testimonial.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ testimonial });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimonial.' });
  }
});

// DELETE /api/testimonials/:id — Admin: Delete testimonial
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: req.params.id } });
    res.json({ message: 'Testimonial deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimonial.' });
  }
});

module.exports = router;
