const express = require('express');
const prisma = require('../config/db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/analytics — Admin: Dashboard analytics
router.get('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const [
      totalContacts,
      unreadContacts,
      totalCareerApps,
      totalInternshipApps,
      totalBlogs,
      publishedBlogs,
      totalProjects,
      totalSubscribers,
      recentContacts,
      recentCareerApps,
      recentInternshipApps,
    ] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.count({ where: { isRead: false } }),
      prisma.careerApplication.count(),
      prisma.internshipApplication.count(),
      prisma.blog.count(),
      prisma.blog.count({ where: { isPublished: true } }),
      prisma.portfolioProject.count(),
      prisma.newsletterSubscriber.count({ where: { isActive: true } }),
      prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.careerApplication.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { career: { select: { title: true } } },
      }),
      prisma.internshipApplication.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { role: { select: { title: true } } },
      }),
    ]);

    // Monthly leads trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyLeads = await prisma.contact.groupBy({
      by: ['createdAt'],
      where: { createdAt: { gte: sixMonthsAgo } },
      _count: true,
    });

    res.json({
      overview: {
        totalContacts,
        unreadContacts,
        totalCareerApps,
        totalInternshipApps,
        totalBlogs,
        publishedBlogs,
        totalProjects,
        totalSubscribers,
      },
      recent: {
        contacts: recentContacts,
        careerApplications: recentCareerApps,
        internshipApplications: recentInternshipApps,
      },
      totalApplications: totalCareerApps + totalInternshipApps,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics.' });
  }
});

module.exports = router;
