const express = require('express');
const prisma = require('../config/db');
const { authenticate, authorize } = require('../middleware/auth');
const { uploadResume } = require('../middleware/upload');
const { formLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// GET /api/internships — Public: List active internship roles (Admin: all roles with includeInactive=true)
router.get('/', async (req, res) => {
  try {
    const { includeInactive } = req.query;

    let isActiveFilter = { isActive: true };
    if (includeInactive === 'true') {
      try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const jwt = require('jsonwebtoken');
          const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
          if (decoded && (decoded.role === 'ADMIN' || decoded.role === 'SUPER_ADMIN')) {
            isActiveFilter = {};
          }
        }
      } catch (err) {
        // Token error
      }
    }

    const roles = await prisma.internshipRole.findMany({
      where: isActiveFilter,
      orderBy: { createdAt: 'desc' },
    });
    res.json({ roles });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch internship roles.' });
  }
});

// POST /api/internships — Admin: Create new internship role
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { title, department, duration, description, requirements } = req.body;
    const role = await prisma.internshipRole.create({
      data: { title, department, duration, description, requirements },
    });
    res.status(201).json({ role });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create internship role.' });
  }
});

// PUT /api/internships/:id — Admin: Update role
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const role = await prisma.internshipRole.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ role });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update internship role.' });
  }
});

// DELETE /api/internships/:id — Admin: Delete role
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), async (req, res) => {
  try {
    await prisma.internshipRole.delete({ where: { id: req.params.id } });
    res.json({ message: 'Internship role deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete internship role.' });
  }
});

// GET /api/internships/:id — Public/Admin: Get a single internship role
router.get('/:id', async (req, res) => {
  try {
    const role = await prisma.internshipRole.findUnique({
      where: { id: req.params.id },
    });
    if (!role) {
      return res.status(404).json({ error: 'Internship role not found.' });
    }
    res.json({ role });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch internship role.' });
  }
});

const { uploadToDrive } = require('../config/googleDrive');
const fs = require('fs');

// POST /api/internships/:id/apply — Public: Apply for an internship
router.post('/:id/apply', formLimiter, (req, res, next) => {
  req.uploadSubDir = 'resumes/internships';
  next();
}, uploadResume.single('resume'), async (req, res) => {
  try {
    const { name, email, phone, coverNote } = req.body;
    const roleId = req.params.id;

    if (!name || !email || !phone || !req.file) {
      return res.status(400).json({ error: 'Name, email, phone, and resume are required.' });
    }

    const role = await prisma.internshipRole.findUnique({ where: { id: roleId } });
    if (!role) return res.status(404).json({ error: 'Internship role not found.' });

    // Upload to Google Drive
    let resumeUrl = `/uploads/resumes/internships/${req.file.filename}`;
    try {
      const driveUrl = await uploadToDrive(
        req.file.path,
        req.file.mimetype,
        `${Date.now()}_${name.replace(/\s+/g, '_')}_internship_resume_${req.file.originalname}`
      );
      if (driveUrl) {
        resumeUrl = driveUrl;
        // Delete local temporary file to clean up space
        try {
          fs.unlinkSync(req.file.path);
        } catch (err) {
          console.error('Failed to delete temporary local file:', err);
        }
      }
    } catch (driveError) {
      console.error('Google Drive upload failed, falling back to local file link:', driveError);
    }

    const application = await prisma.internshipApplication.create({
      data: {
        name,
        email,
        phone,
        coverNote,
        resumeUrl,
        roleId,
      },
    });

    res.status(201).json({ message: 'Internship application submitted!', application });
  } catch (error) {
    console.error('Internship apply error:', error);
    res.status(500).json({ error: 'Failed to submit application.' });
  }
});

// GET /api/internships/applications/all — Admin: Get all internship applications
router.get('/applications/all', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where = status ? { status } : {};

    const [applications, total] = await Promise.all([
      prisma.internshipApplication.findMany({
        where,
        include: { role: { select: { title: true, department: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.internshipApplication.count({ where }),
    ]);

    res.json({
      applications,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications.' });
  }
});

// PUT /api/internships/applications/:id/status — Admin: Update application status
router.put('/applications/:id/status', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { status } = req.body;
    const application = await prisma.internshipApplication.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json({ application });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update application status.' });
  }
});

module.exports = router;
