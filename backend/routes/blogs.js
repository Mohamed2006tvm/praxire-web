const express = require('express');
const prisma = require('../config/db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/blogs — Public: List published blogs
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { isPublished: true };
    if (category) where.category = category;

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        include: { author: { select: { name: true, avatar: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.blog.count({ where }),
    ]);

    res.json({
      blogs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs.' });
  }
});

// GET /api/blogs/:slug — Public: Get single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: req.params.slug },
      include: { author: { select: { name: true, avatar: true } } },
    });
    if (!blog || !blog.isPublished) {
      return res.status(404).json({ error: 'Blog not found.' });
    }
    res.json({ blog });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog.' });
  }
});

// GET /api/blogs/admin/all — Admin: Get all blogs (including drafts)
router.get('/admin/all', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ blogs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs.' });
  }
});

// POST /api/blogs — Admin: Create blog
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { title, excerpt, content, coverImage, category, tags, isPublished } = req.body;

    // Auto-generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + Date.now().toString(36);

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        category,
        tags: tags || [],
        isPublished: isPublished || false,
        authorId: req.user.id,
      },
    });

    res.status(201).json({ blog });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ error: 'Failed to create blog.' });
  }
});

// PUT /api/blogs/:id — Admin: Update blog
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { title, excerpt, content, coverImage, category, tags, isPublished } = req.body;

    const data = { excerpt, content, coverImage, category, tags, isPublished };
    if (title) {
      data.title = title;
      data.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        + '-' + Date.now().toString(36);
    }

    const blog = await prisma.blog.update({
      where: { id: req.params.id },
      data,
    });

    res.json({ blog });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog.' });
  }
});

// DELETE /api/blogs/:id — Admin: Delete blog
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    await prisma.blog.delete({ where: { id: req.params.id } });
    res.json({ message: 'Blog deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog.' });
  }
});

module.exports = router;
