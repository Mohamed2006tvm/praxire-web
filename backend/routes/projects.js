const express = require('express');
const prisma = require('../config/db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/projects — Public: Get all projects (optionally filter by category)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category } : {};

    const projects = await prisma.portfolioProject.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects.' });
  }
});

// GET /api/projects/featured — Public: Get featured projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await prisma.portfolioProject.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured projects.' });
  }
});

// POST /api/projects — Admin: Create project
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { title, description, category, image, technologies, liveUrl, githubUrl, isFeatured } = req.body;
    const project = await prisma.portfolioProject.create({
      data: { title, description, category, image, technologies, liveUrl, githubUrl, isFeatured },
    });
    res.status(201).json({ project });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project.' });
  }
});

// PUT /api/projects/:id — Admin: Update project
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const project = await prisma.portfolioProject.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ project });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project.' });
  }
});

// DELETE /api/projects/:id — Admin: Delete project
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), async (req, res) => {
  try {
    await prisma.portfolioProject.delete({ where: { id: req.params.id } });
    res.json({ message: 'Project deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project.' });
  }
});

module.exports = router;
