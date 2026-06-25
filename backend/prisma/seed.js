const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // ─── 1. Create Super Admin ──────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || 'superadmin@praxire.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'PraxireAdmin2026!';
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const superAdmin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      name: 'Super Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      firstName: 'Super',
      lastName: 'Admin',
    },
  });
  console.log('✅ Super Admin created:', superAdmin.email);

  console.log('🧹 Purging old testimonials...');
  await prisma.testimonial.deleteMany({});

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      position: 'CEO',
      company: 'TechVista Solutions',
      content: 'Praxire transformed our entire digital infrastructure. Their team delivered an exceptional e-commerce platform that boosted our online sales by 300%. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Ahmed Hassan',
      position: 'Founder',
      company: 'FinPro Digital',
      content: 'The mobile app Praxire developed for us exceeded all expectations. Clean UI, fast performance, and they delivered ahead of schedule. Our app store rating went from 3.2 to 4.8 stars!',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      position: 'Marketing Director',
      company: 'CloudWave Inc.',
      content: "Praxire's digital marketing and SEO services doubled our organic traffic within 4 months. Their data-driven approach and transparent reporting set them apart from others.",
      rating: 5,
    },
    {
      name: 'Nishanth',
      position: 'Founder',
      company: 'Dropzii',
      content: 'Praxire developed a professional and user-friendly website for our taxi business, Dropzii. The team delivered exactly what we needed with great design and smooth functionality. Highly recommended for anyone looking for quality web development services.',
      rating: 5,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: t,
    });
  }
  console.log('✅ Testimonials seeded:', testimonials.length);

  // ─── 3. Seed Portfolio Projects ────────────────────────
  console.log('🧹 Purging old projects...');
  await prisma.portfolioProject.deleteMany({});

  const projects = [
    {
      title: 'My Dream Surprise',
      description: 'A premium surprise event planning platform and hall booking system for birthday parties and special events, featuring custom themes, packages, and reservation management.',
      category: 'Websites',
      image: '/images/portfolio/my-dream-surprise.png',
      technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'PostgreSQL'],
      isFeatured: true,
    },
    {
      title: 'Dropzii',
      description: 'A taxi business booking and fleet management ecosystem with a high-fidelity interactive user interface, ride tracking, and integrated operational datasheets.',
      category: 'Websites',
      image: '/images/portfolio/dropzii.png',
      technologies: ['React', 'Tailwind CSS', 'Google Sheets API', 'Frontend'],
      isFeatured: true,
    },
    {
      title: 'Techspark Academy',
      description: 'An AI and technology education institute offering hands-on training courses with structured student progress trackers and syllabus integration.',
      category: 'Websites',
      image: '/images/portfolio/techspark-academy.png',
      technologies: ['React', 'Tailwind CSS', 'Google Sheets API', 'Frontend'],
      isFeatured: false,
    },
    {
      title: 'Praxire ERP',
      description: 'A comprehensive enterprise resource planning solution featuring real-time inventory management, automated invoicing, customer relationship management (CRM), and interactive analytics dashboards.',
      category: 'Software',
      image: '/images/portfolio/praxire-erp.png',
      technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'PostgreSQL'],
      isFeatured: true,
    },
  ];

  for (const p of projects) {
    await prisma.portfolioProject.create({ data: p });
  }
  console.log('✅ Projects seeded:', projects.length);

  // ─── 4. Seed Career Positions ──────────────────────────
  const careers = [
    {
      title: 'Senior Full-Stack Developer',
      department: 'Engineering',
      location: 'Remote / Hybrid',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Join our core engineering team to build scalable web applications using React, Node.js, and cloud technologies.',
      requirements: ['React/Next.js proficiency', 'Node.js & Express', 'PostgreSQL/MongoDB', 'Git & CI/CD', 'REST API design'],
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Create beautiful, intuitive interfaces for web and mobile applications that delight our clients and their users.',
      requirements: ['Figma/Adobe XD mastery', 'Responsive design', 'Design systems', 'User research', 'Prototyping'],
    },
    {
      title: 'AI/ML Engineer',
      department: 'AI & Data',
      location: 'Remote',
      type: 'Full-time',
      experience: '2-5 years',
      description: 'Develop and deploy machine learning models and AI solutions for enterprise clients across various industries.',
      requirements: ['Python & TensorFlow/PyTorch', 'NLP or Computer Vision', 'Data pipeline experience', 'Cloud ML services', 'Statistics & math'],
    },
  ];

  for (const c of careers) {
    const existing = await prisma.career.findFirst({ where: { title: c.title } });
    if (!existing) {
      await prisma.career.create({ data: c });
    }
  }
  console.log('✅ Career positions seeded:', careers.length);

  // ─── 5. Seed Internship Roles ──────────────────────────
  const internships = [
    {
      title: 'Sales Executive Intern',
      department: 'Sales',
      duration: '3 months',
      description: 'Learn enterprise sales strategies, client acquisition, and CRM management while working with our sales team.',
      requirements: ['Strong communication skills', 'Interest in technology sales', 'Basic CRM knowledge', 'Self-motivated'],
    },
    {
      title: 'Business Development Executive Intern',
      department: 'Business Development',
      duration: '3 months',
      description: 'Help identify and pursue new business opportunities, partnerships, and market expansion strategies.',
      requirements: ['Research skills', 'Business acumen', 'Presentation skills', 'Analytical mindset'],
    },
    {
      title: 'Lead Generator Intern',
      department: 'Marketing',
      duration: '2 months',
      description: 'Support our lead generation efforts through outreach campaigns, social media, and targeted prospecting.',
      requirements: ['Social media proficiency', 'Email marketing basics', 'Data entry skills', 'Attention to detail'],
    },
    {
      title: 'Content Researcher Intern',
      department: 'Content',
      duration: '3 months',
      description: 'Research and compile content for blogs, whitepapers, and case studies on technology trends and solutions.',
      requirements: ['Excellent writing skills', 'Research methodology', 'Technology interest', 'SEO basics'],
    },
    {
      title: 'Script Writer Intern',
      department: 'Content',
      duration: '2 months',
      description: 'Write engaging scripts for product demos, explainer videos, and social media content that showcases our solutions.',
      requirements: ['Creative writing skills', 'Video scripting experience', 'Storytelling ability', 'Technology understanding'],
    },
  ];

  for (const i of internships) {
    const existing = await prisma.internshipRole.findFirst({ where: { title: i.title } });
    if (!existing) {
      await prisma.internshipRole.create({ data: i });
    }
  }
  console.log('✅ Internship roles seeded:', internships.length);

  // ─── 6. Seed Blog Posts ────────────────────────────────
  const blogs = [
    {
      title: 'The Future of AI in Enterprise Software Development',
      slug: 'future-of-ai-enterprise-software-2026',
      excerpt: 'Explore how artificial intelligence is reshaping the way enterprises build, deploy, and maintain software applications in 2026.',
      content: `## Introduction\n\nArtificial Intelligence is no longer just a buzzword — it has become an integral part of modern software development. From automated code generation to intelligent testing frameworks, AI is transforming every aspect of the software development lifecycle.\n\n## Key Trends\n\n### 1. AI-Powered Code Generation\nTools like GitHub Copilot and similar AI assistants have matured significantly, now capable of generating entire modules of production-ready code with proper error handling and security considerations.\n\n### 2. Intelligent Testing\nAI-driven testing frameworks can now automatically generate test cases, identify edge cases, and predict potential failure points before they occur in production.\n\n### 3. Predictive Analytics\nModern enterprises leverage AI to predict system failures, optimize resource allocation, and make data-driven decisions about technology investments.\n\n## Conclusion\n\nThe integration of AI into enterprise software development is not just an option — it's a necessity for staying competitive in today's rapidly evolving technological landscape.`,
      category: 'AI',
      tags: ['AI', 'Enterprise', 'Software Development', 'Machine Learning'],
      isPublished: true,
      authorId: superAdmin.id,
    },
    {
      title: '10 Essential Web Development Trends for 2026',
      slug: 'web-development-trends-2026',
      excerpt: 'Stay ahead of the curve with these 10 critical web development trends that are shaping the digital landscape this year.',
      content: `## The Web Development Landscape in 2026\n\nWeb development continues to evolve at a breathtaking pace. Here are the trends that every developer and business should be aware of.\n\n## 1. Server Components & Edge Computing\nServer-side rendering has evolved beyond traditional SSR. Modern frameworks now support streaming server components that render on the edge, reducing latency to near-zero.\n\n## 2. AI-Integrated Development\nAI is now embedded into every stage of web development, from design to deployment.\n\n## 3. WebAssembly Goes Mainstream\nWASM is enabling near-native performance in browsers, opening up new possibilities for complex web applications.\n\n## 4. Progressive Web Apps 2.0\nPWAs have become indistinguishable from native apps, with full hardware access and offline capabilities.\n\n## 5. Zero-Trust Security Architecture\nEvery web application now implements zero-trust principles by default.\n\nThese trends represent the cutting edge of web development in 2026.`,
      category: 'WEB_DEVELOPMENT',
      tags: ['Web Development', 'Trends', 'Technology', 'Frontend'],
      isPublished: true,
      authorId: superAdmin.id,
    },
  ];

  for (const b of blogs) {
    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
  }
  console.log('✅ Blog posts seeded:', blogs.length);

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📋 Admin Login Credentials:');
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Password: ${adminPassword}\n`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
