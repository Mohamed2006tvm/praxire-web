import {
  FiShoppingCart,
  FiSmartphone,
  FiCode,
  FiCpu,
  FiLayout,
  FiSearch,
  FiTrendingUp,
  FiCloud,
  FiSettings,
  FiDatabase,
  FiServer,
  FiGlobe,
  FiLayers,
  FiTool,
  FiPackage,
  FiUsers,
  FiShield,
  FiActivity,
  FiBox,
  FiTarget,
  FiGitBranch,
  FiPieChart,
  FiBarChart2,
  FiGrid,
  FiRefreshCw,
  FiLink,
  FiHardDrive,
  FiCheckCircle,
} from 'react-icons/fi';



export const serviceCategories = [
  {
    id: 'all',
    label: 'All Services',
  },
  {
    id: 'software-development',
    label: 'Software Development',
  },
  {
    id: 'application-development',
    label: 'Application Development',
  },
  {
    id: 'technology-services',
    label: 'Technology Services',
  },
  {
    id: 'quality-devops',
    label: 'Quality & DevOps',
  },
];

export const allServices = [
  // ── Software Development ───────────────────────
  {
    id: 'software-consulting',
    category: 'software-development',
    icon: FiTarget,
    title: 'Software Consulting',
    description: 'Strategic technology advisory services to align your IT roadmap with business goals, reduce risks, and accelerate digital transformation.',
    features: ['Technology Assessment', 'Architecture Planning', 'Vendor Selection', 'Roadmap Design'],
  },
  {
    id: 'erp-software-development',
    category: 'software-development',
    icon: FiDatabase,
    title: 'ERP Software Development',
    description: 'Custom enterprise resource planning systems that unify your operations — finance, HR, supply chain, and inventory — into a single platform.',
    features: ['Module Customization', 'Workflow Automation', 'Real-time Reporting', 'Third-party Integration'],
  },
  {
    id: 'custom-crm-development',
    category: 'software-development',
    icon: FiUsers,
    title: 'Custom CRM Development',
    description: 'Tailored customer relationship management systems designed to manage leads, automate sales pipelines, and improve client retention.',
    features: ['Lead Management', 'Sales Pipeline', 'Customer Analytics', 'Marketing Automation'],
  },

  {
    id: 'product-development',
    category: 'software-development',
    icon: FiPackage,
    title: 'Product Development',
    description: 'End-to-end product engineering from ideation to launch — including MVP development, iteration cycles, and market-ready releases.',
    features: ['MVP Strategy', 'Agile Sprints', 'User Testing', 'Go-to-Market Support'],
  },
  {
    id: 'maintenance-support',
    category: 'software-development',
    icon: FiTool,
    title: 'Maintenance & Support',
    description: 'Ongoing application support, bug fixing, performance optimization, and infrastructure monitoring to keep systems running 24/7.',
    features: ['24/7 Monitoring', 'Bug Resolution', 'Performance Tuning', 'Security Patches'],
  },

  // ── Application Development ────────────────────
  {
    id: 'web-application',
    category: 'application-development',
    icon: FiGlobe,
    title: 'Web Application Development',
    description: 'Full-stack web applications built with React, Next.js, and Node.js — optimized for performance, accessibility, and scalability.',
    features: ['Responsive Design', 'Progressive Web Apps', 'REST & GraphQL APIs', 'Real-time Features'],
  },
  {
    id: 'custom-application',
    category: 'application-development',
    icon: FiCode,
    title: 'Custom Application Development',
    description: 'Bespoke software built from the ground up to solve unique business challenges that off-the-shelf products cannot address.',
    features: ['Requirements Analysis', 'Custom Architecture', 'Scalable Backend', 'Enterprise Security'],
  },
  {
    id: 'application-modernization',
    category: 'application-development',
    icon: FiRefreshCw,
    title: 'Application Modernization',
    description: 'Transform legacy systems into modern, cloud-native applications using the latest frameworks and migration strategies.',
    features: ['Legacy Migration', 'Code Refactoring', 'Cloud-native Conversion', 'Tech Stack Upgrade'],
  },
  {
    id: 'application-management',
    category: 'application-development',
    icon: FiSettings,
    title: 'Application Management',
    description: 'Comprehensive application lifecycle management including monitoring, optimization, incident response, and continuous improvement.',
    features: ['Lifecycle Management', 'Incident Response', 'SLA Management', 'Continuous Improvement'],
  },
  {
    id: 'application-maintenance',
    category: 'application-development',
    icon: FiShield,
    title: 'Application Maintenance',
    description: 'Proactive maintenance services to ensure your applications remain secure, updated, and performing at peak efficiency.',
    features: ['Preventive Maintenance', 'Version Upgrades', 'Compatibility Testing', 'Backup & Recovery'],
  },

  {
    id: 'application-integration',
    category: 'application-development',
    icon: FiLink,
    title: 'Application Integration',
    description: 'Seamlessly connect disparate business systems, third-party APIs, and data sources into a unified, interoperable ecosystem.',
    features: ['API Development', 'Data Synchronization', 'Middleware Solutions', 'iPaaS Integration'],
  },
  {
    id: 'ecommerce-application',
    category: 'application-development',
    icon: FiShoppingCart,
    title: 'E-Commerce Application',
    description: 'Scalable online stores with secure payment gateways, inventory management, and conversion-optimized checkout flows.',
    features: ['Payment Integration', 'Inventory System', 'Mobile Commerce', 'Analytics Dashboard'],
  },

  // ── Technology Services ────────────────────────
  {
    id: 'mobile-app-development',
    category: 'technology-services',
    icon: FiSmartphone,
    title: 'Mobile App Development',
    description: 'Native iOS/Android and cross-platform mobile apps built with React Native and Flutter for maximum reach and performance.',
    features: ['Cross-platform', 'Native Performance', 'Push Notifications', 'Offline Support'],
  },
  {
    id: 'hire-dedicated-developers',
    category: 'technology-services',
    icon: FiUsers,
    title: 'Hire Dedicated Developers',
    description: 'Augment your team with pre-vetted, full-time dedicated developers skilled in React, Node.js, Python, Java, and more.',
    features: ['Pre-vetted Engineers', 'Flexible Engagement', 'Daily Standups', 'IP Protection'],
  },
  {
    id: 'full-stack-development',
    category: 'technology-services',
    icon: FiLayers,
    title: 'Full Stack Development',
    description: 'Complete front-end to back-end development using modern tech stacks — React, Node.js, Python, PostgreSQL, MongoDB, and more.',
    features: ['Frontend & Backend', 'Database Design', 'API Architecture', 'Deployment & CI/CD'],
  },
  {
    id: 'saas-development',
    category: 'technology-services',
    icon: FiServer,
    title: 'SaaS Development',
    description: 'Multi-tenant SaaS platforms with subscription billing, role-based access, usage analytics, and white-label customization.',
    features: ['Multi-tenancy', 'Subscription Billing', 'Usage Analytics', 'White-label Options'],
  },

  {
    id: 'ux-ui-design',
    category: 'technology-services',
    icon: FiLayout,
    title: 'UX/UI Design',
    description: 'User-centric design services — from wireframes to high-fidelity prototypes — that ensure your products are intuitive and engaging.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
  },

  // ── Quality & DevOps ──────────────────────────

  {
    id: 'qa-testing',
    category: 'quality-devops',
    icon: FiCheckCircle,
    title: 'QA & Testing',
    description: 'Comprehensive testing services — manual, automated, performance, and security testing — to ship bug-free, reliable software.',
    features: ['Automated Testing', 'Performance Testing', 'Security Audits', 'Regression Testing'],
  },

];
