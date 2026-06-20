const express = require('express');
const prisma = require('../config/db');
const { authenticate, authorize } = require('../middleware/auth');
const { uploadResume } = require('../middleware/upload');
const { formLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// GET /api/careers — Public: List active positions (Admin: all positions with includeInactive=true)
router.get('/', async (req, res) => {
  try {
    const { includeInactive } = req.query;

    // Allow admins to fetch inactive positions
    let isActiveFilter = { isActive: true };
    if (includeInactive === 'true') {
      // Verify admin token
      try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const jwt = require('jsonwebtoken');
          const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
          if (decoded && (decoded.role === 'ADMIN' || decoded.role === 'SUPER_ADMIN')) {
            isActiveFilter = {}; // No filter — return all
          }
        }
      } catch {
        // Bad token — fall back to active-only
      }
    }

    const careers = await prisma.career.findMany({
      where: isActiveFilter,
      orderBy: { createdAt: 'desc' },
    });
    res.json({ careers });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch careers.' });
  }
});

// GET /api/careers/:id — Public: Get single position
router.get('/:id', async (req, res) => {
  try {
    const career = await prisma.career.findUnique({
      where: { id: req.params.id },
    });
    if (!career) return res.status(404).json({ error: 'Position not found.' });
    res.json({ career });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch career.' });
  }
});

// POST /api/careers — Admin: Create a new position
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { title, department, location, type, experience, description, requirements } = req.body;
    const career = await prisma.career.create({
      data: { title, department, location, type, experience, description, requirements },
    });
    res.status(201).json({ career });
  } catch (error) {
    console.error('Create career error:', error);
    res.status(500).json({ error: 'Failed to create position.' });
  }
});

// PUT /api/careers/:id — Admin: Update position
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const career = await prisma.career.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ career });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update position.' });
  }
});

// DELETE /api/careers/:id — Admin: Delete position
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), async (req, res) => {
  try {
    await prisma.career.delete({ where: { id: req.params.id } });
    res.json({ message: 'Position deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete position.' });
  }
});

const { sendCareerMails } = require('../config/mail');

const { uploadToDrive } = require('../config/googleDrive');
const fs = require('fs');

// POST /api/careers/:id/apply — Public: Apply for a position (with resume)
router.post('/:id/apply', formLimiter, (req, res, next) => {
  req.uploadSubDir = 'resumes/careers';
  next();
}, uploadResume.single('resume'), async (req, res) => {
  try {
    const { name, email, phone, coverNote } = req.body;
    const careerId = req.params.id;

    if (!name || !email || !phone || !req.file) {
      return res.status(400).json({ error: 'Name, email, phone, and resume are required.' });
    }

    const career = await prisma.career.findUnique({ where: { id: careerId } });
    if (!career) return res.status(404).json({ error: 'Position not found.' });

    // Upload to Google Drive
    let resumeUrl = `/uploads/resumes/careers/${req.file.filename}`;
    try {
      const driveUrl = await uploadToDrive(
        req.file.path,
        req.file.mimetype,
        `${Date.now()}_${name.replace(/\s+/g, '_')}_resume_${req.file.originalname}`
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

    const application = await prisma.careerApplication.create({
      data: {
        name,
        email,
        phone,
        coverNote,
        resumeUrl,
        careerId,
      },
    });

    // Send automated email notifications in background
    try {
      await sendCareerMails(application, career.title);
    } catch (mailError) {
      console.error('Career application mail failed:', mailError);
    }

    res.status(201).json({ message: 'Application submitted successfully!', application });
  } catch (error) {
    console.error('Career application error:', error);
    res.status(500).json({ error: 'Failed to submit application.' });
  }
});

// GET /api/careers/applications/all — Admin: Get all career applications
router.get('/applications/all', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = status ? { status } : {};

    const [applications, total] = await Promise.all([
      prisma.careerApplication.findMany({
        where,
        include: { career: { select: { title: true, department: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.careerApplication.count({ where }),
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

// PUT /api/careers/applications/:id/status — Admin: Update application status
router.put('/applications/:id/status', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { status } = req.body;
    const application = await prisma.careerApplication.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json({ application });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update application status.' });
  }
});

module.exports = router;
