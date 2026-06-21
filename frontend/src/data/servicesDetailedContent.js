


export const servicesDetailedContent = {
  // ── Software Development ───────────────────────
  'software-consulting': {
    detailedExplanation: 'Praxire provides expert, independent technology consulting to translate business objectives into high-performing IT roadmaps. We review your current digital assets, detect architectural weaknesses, security gaps, and inefficiencies, and formulate an execution plan designed to maximize return on investment. Our consultants ensure you adopt scalable technologies that prevent technical debt.',
    keyDifferentiators: [
      { feature: 'Roadmap Alignment', praxireWay: 'Directly linked to measurable business KPIs and sprint-ready developer tasks.', industryStandard: 'Vague, theoretical slide decks that are hard to translate into code.' },
      { feature: 'Tech Neutrality', praxireWay: 'Strictly neutral vendor evaluations based on benchmark metrics and scale capabilities.', industryStandard: 'Biased recommendations aligned with affiliate agreements or narrow stack experience.' },
      { feature: 'Cost Optimization', praxireWay: 'Granular assessment of cloud overheads, licensing, and redundant processes to lower long-term TCO.', industryStandard: 'Over-provisioned systems that ignore ongoing operating costs.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Tech Audit & Interviews', description: 'Deep-dive review of codebase, database structures, deployment configurations, and staff capability.' },
      { phase: '02', title: 'Bottleneck Identification', description: 'Pinpointing performance choke points, security liabilities, and resource integration issues.' },
      { phase: '03', title: 'Architecture Blueprinting', description: 'Designing future-state target architectures, data flows, and security profiles.' },
      { phase: '04', title: 'Actionable Roadmap', description: 'Delivery of phase-by-phase implementation guidelines, timeline planning, and budgeting estimates.' }
    ]
  },
  'erp-software-development': {
    detailedExplanation: 'We build custom enterprise resource planning (ERP) platforms tailored to align with your organization\'s unique operational processes. Unlike restrictive off-the-shelf software that forces you to modify your workflows, our ERP systems are built from scratch or configured dynamically to support your exact financial, HR, inventory, procurement, and supply chain processes, ensuring seamless visibility across operations.',
    keyDifferentiators: [
      { feature: 'Workflow Alignment', praxireWay: '100% custom-mapped workflows matching your specific operational business rules.', industryStandard: 'Rigid standard modules requiring expensive external workarounds.' },
      { feature: 'Data Consolidation', praxireWay: 'Single-source-of-truth database architecture with sub-second cross-module updates.', industryStandard: 'Fragmented data tables synchronized via delayed overnight batch jobs.' },
      { feature: 'User Adoption', praxireWay: 'Intuitive modern interfaces designed for frontline workers, minimizing training time.', industryStandard: 'Complex legacy screens loaded with redundant menus and entry fields.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Operational Mapping', description: 'Documenting existing workflows, approval structures, data fields, and bottlenecks.' },
      { phase: '02', title: 'Database Normalization', description: 'Creating clean schemas that eliminate redundancies and support instant report generation.' },
      { phase: '03', title: 'Module Construction', description: 'Parallel development of finance, inventory, HR, and sales channels using modular API frameworks.' },
      { phase: '04', title: 'UAT & Migration', description: 'Rigorous user acceptance testing and automated legacy data migration with zero downtime.' }
    ]
  },
  'custom-crm-development': {
    detailedExplanation: 'Praxire engineers bespoke Customer Relationship Management (CRM) tools built to empower your sales, marketing, and customer support channels. We optimize the database structures to load client history, deals, and communication streams instantly, integrating automated lead scoring pipelines and omnichannel alerts (Email, SMS, WhatsApp) to convert contacts into long-term clients.',
    keyDifferentiators: [
      { feature: 'Speed & Response', praxireWay: 'Instant page transitions and live websocket updates for active call centers.', industryStandard: 'Slow loading dashboards that delay client engagement.' },
      { feature: 'Omnichannel Sync', praxireWay: 'Deep native integration with WhatsApp API, email clients, and phone channels.', industryStandard: 'Reliance on fragile third-party sync plugins that disconnect frequently.' },
      { feature: 'Analytics Insights', praxireWay: 'Custom predictive dashboards identifying customer health metrics and renewal opportunities.', industryStandard: 'Basic export spreadsheets without actionable customer trends.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Sales Funnel Auditing', description: 'Analyzing client acquisition patterns, contact touchpoints, and custom fields.' },
      { phase: '02', title: 'Database Design', description: 'Structuring high-availability data tables designed to query millions of accounts instantly.' },
      { phase: '03', title: 'API Integration & Sync', description: 'Connecting telephony platforms, email providers, and messaging gateways directly.' },
      { phase: '04', title: 'Sales Rep Rollout', description: 'Iterative dashboard release focusing on optimizing speed, mobile access, and search speeds.' }
    ]
  },
  'ar-vr-development': {
    detailedExplanation: 'We design immersive augmented and virtual reality platforms built to solve industrial training, medical simulations, and retail interactive requirements. Utilizing Unity and Unreal Engine, we compile highly realistic 3D environments, spatial mapping configurations, and physical interactions optimized to run smoothly on modern headsets (Oculus, Apple Vision Pro) and web-based XR frameworks.',
    keyDifferentiators: [
      { feature: 'Render Performance', praxireWay: 'Rigorous polygon count optimization and occlusion culling ensuring 90+ FPS to prevent motion sickness.', industryStandard: 'Unoptimized assets causing lag and visual stuttering.' },
      { feature: 'Physics Fidelity', praxireWay: 'Precision collision boundaries and tactile feedback systems mirroring real-world mechanics.', industryStandard: 'Standard gravity approximations that fail high-accuracy training scenarios.' },
      { feature: 'Hardware Portability', praxireWay: 'Multi-target compilation supporting standalone headsets, tablets, and mobile web browsers.', industryStandard: 'Platform lock-in restricting deployments to a single vendor.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Environment Storyboarding', description: 'Drafting spatial interactions, training scripts, 3D assets, and interactive flows.' },
      { phase: '02', title: '3D Asset Engineering', description: 'Modeling and texturing highly accurate models optimized for mobile/VR graphics chips.' },
      { phase: '03', title: 'Interaction Programming', description: 'Developing gravity reactions, controller tracking, and spatial sound environments.' },
      { phase: '04', title: 'Multi-device QA', description: 'Rigorous framerate checking and validation across Oculus, iOS, Android, and Vision Pro.' }
    ]
  },
  'iot-development': {
    detailedExplanation: 'Praxire builds hardware-integrated IoT solutions that establish secure, bi-directional telemetry pipelines. We implement edge data parsing on microcontrollers, stream sensor feeds securely via MQTT/Websockets, and compile robust backend layers that run predictive anomalies and manage device fleets at scale.',
    keyDifferentiators: [
      { feature: 'Data Efficiency', praxireWay: 'Custom binary payload serialization reducing cellular data usage and battery drain by up to 70%.', industryStandard: 'Heavy JSON strings sent repeatedly, exhausting battery and bandwidth.' },
      { feature: 'Secured Enclaves', praxireWay: 'End-to-end encryption with hardware-based cryptographic keys and TLS token rotation.', industryStandard: 'Unencrypted messaging ports vulnerable to device spoofing.' },
      { feature: 'Edge Intelligence', praxireWay: 'Offline-first anomaly detection on devices to trigger safety cutoffs without network dependency.', industryStandard: 'Full reliance on cloud replies, introducing lag and offline risks.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Hardware Integration', description: 'Selecting sensors, microcontrollers (ESP32, Raspberry Pi), and planning power circuits.' },
      { phase: '02', title: 'Firmware Architecture', description: 'Developing lightweight runtime code with automated reconnect algorithms.' },
      { phase: '03', title: 'Cloud Broker Setup', description: 'Establishing scalable MQTT brokers and time-series databases (InfluxDB).' },
      { phase: '04', title: 'Telemetry Validation', description: 'Simulating fleet loads to test network resilience and dashboard latencies.' }
    ]
  },
  'microservices': {
    detailedExplanation: 'We migrate fragile monolithic backends into modular, containerized microservices architectures. By decoupling business logic into independent services (e.g., Auth, Payments, Inventory), we allow your systems to scale dynamically under load, isolate system errors, and let developer groups launch updates independently without system downtime.',
    keyDifferentiators: [
      { feature: 'Failure Isolation', praxireWay: 'Automated circuit breakers and backup fallbacks that keep the main application online if a single service drops.', industryStandard: 'Monoliths where a database query crash brings down the entire site.' },
      { feature: 'Scalability Control', praxireWay: 'Independent serverless or container auto-scaling based on specific service CPU demands.', industryStandard: 'Scaling the entire monolith, wasting infrastructure costs.' },
      { feature: 'API Orchestration', praxireWay: 'Centralized API Gateway with unified authentication, request caching, and request tracing.', industryStandard: 'Disorganized service endpoints with duplicated security setups.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Monolith Auditing', description: 'Analyzing codebase dependencies, database tables, and service separations.' },
      { phase: '02', title: 'Domain-Driven Design', description: 'Defining context boundaries, service APIs, and message broker channels (RabbitMQ/Kafka).' },
      { phase: '03', title: 'Dockerization & CI/CD', description: 'Containerizing services and configuring automated pipelines to deploy to Kubernetes.' },
      { phase: '04', title: 'Traffic Routing', description: 'Setting up API Gateway proxies, secure tokens, and tracing (OpenTelemetry).' }
    ]
  },
  'product-development': {
    detailedExplanation: 'We partner with startups and enterprises to bring raw software ideas to life. From building rapid, market-ready Minimum Viable Products (MVPs) to executing mature global rollouts, we engineer modern layouts, scalable API foundations, and agile testing routines that reduce time-to-market while keeping software quality pristine.',
    keyDifferentiators: [
      { feature: 'Time-to-Market', praxireWay: 'Rapid prototype assembly using pre-tested authentication, payments, and logging skeletons.', industryStandard: 'Starting from scratch every time, delaying launch by months.' },
      { feature: 'Architectural Focus', praxireWay: 'Initial codebases structured cleanly to allow rapid product changes without major rewrites.', industryStandard: 'Hasty, messy code that needs to be completely discarded after the MVP phase.' },
      { feature: 'Iterative Loops', praxireWay: 'Bi-weekly release schedules with built-in analytics to measure user engagement metrics.', industryStandard: 'Long periods of closed development without customer feedback.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'UX & Feature Mapping', description: 'Drafting user flows, wireframes, database schemas, and prioritizing feature backlogs.' },
      { phase: '02', title: 'Interactive Mockups', description: 'Creating clickable high-fidelity Figma designs to align visual direction before coding.' },
      { phase: '03', title: 'Agile MVP Coding', description: 'Developing core features in bi-weekly sprints, deploying continuously to staging.' },
      { phase: '04', title: 'Launch & Metrics Sync', description: 'Configuring monitoring tools (Sentry/PostHog) and deploying production code.' }
    ]
  },
  'maintenance-support': {
    detailedExplanation: 'Praxire offers dedicated maintenance and IT support contracts to protect the stability and performance of your applications. We run security patch updates, optimize database configurations, verify backup systems, and provide prompt incident recovery to maintain 99.9% application availability.',
    keyDifferentiators: [
      { feature: 'Incident SLA', praxireWay: 'Guaranteed 15-minute response times for critical production issues with direct developer communication.', industryStandard: 'Standard ticket systems that take days to receive a template response.' },
      { feature: 'Proactive Alerting', praxireWay: 'Custom anomaly alerts tracking system memory, error rates, and response latencies before they hit users.', industryStandard: 'Waiting for users to complain about downtime before investigating.' },
      { feature: 'Patch Compliance', praxireWay: 'Scheduled weekly security and package updates tested first in sandbox environments.', industryStandard: 'Infrequent updates that leave databases exposed to security vulnerabilities.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Environment Auditing', description: 'Analyzing existing infrastructure, security configurations, and logging pipelines.' },
      { phase: '02', title: 'Monitoring Integration', description: 'Deploying dashboard monitors (Prometheus, Grafana, Datadog) to track site health.' },
      { phase: '03', title: 'Backup Scheduling', description: 'Automating database backups and verifying sandbox recovery systems.' },
      { phase: '04', title: 'Ongoing Sprints', description: 'Continuous ticket resolution, routine database tuning, and security audits.' }
    ]
  },

  // ── Application Development ────────────────────
  'web-application': {
    detailedExplanation: 'We build fast, secure, and modern web applications designed to load instantly and scale seamlessly. Utilizing React, Next.js, and Express, we ensure every interface uses server-side rendering or edge generation to optimize Largest Contentful Paint (LCP) scores, providing a premium experience that drives user engagement.',
    keyDifferentiators: [
      { feature: 'Render Efficiency', praxireWay: 'Edge-cached rendering, dynamic image compression, and minimal JS bundles for load speeds under 1.2s.', industryStandard: 'Heavy script payloads causing noticeable loading delay and high bounce rates.' },
      { feature: 'State Management', praxireWay: 'Optimized state queries reducing unnecessary re-renders in heavy client dashboards.', industryStandard: 'Uncoordinated react state leading to UI lag and freezing.' },
      { feature: 'Accessibility (A11y)', praxireWay: 'Full WCAG compliance with keyboard navigation, screen reader access, and semantic structures.', industryStandard: 'Poorly structured layouts that fail basic accessibility tests.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Component Blueprinting', description: 'Defining routing layout, context structures, UI states, and mock database models.' },
      { phase: '02', title: 'Responsive Design', description: 'Crafting responsive layouts for desktop, tablet, and mobile browsers.' },
      { phase: '03', title: 'API Integration', description: 'Developing secure endpoints, query state caching, and live socket channels.' },
      { phase: '04', title: 'Edge Deployment', description: 'Setting up global edge distribution networks (CDN) to ensure rapid loads.' }
    ]
  },
  'custom-application': {
    detailedExplanation: 'We engineer custom business applications designed to solve unique organizational problems. We map out complex database tables, write secure API systems, and construct intuitive administration panels that give your organization complete control over its data workflows.',
    keyDifferentiators: [
      { feature: 'Operational Fit', praxireWay: 'Built exactly to support your unique business operations and data flows.', industryStandard: 'Adapting off-the-shelf software with messy, slow plugins.' },
      { feature: 'Security Standards', praxireWay: 'RBAC (Role-Based Access Control) with multi-factor authentication and database audit logs.', industryStandard: 'Basic authentication without detailed access records or safety checks.' },
      { feature: 'Integration Capacity', praxireWay: 'Seamless connections to your existing database, ERP, and CRM platforms via custom APIs.', industryStandard: 'Isolated systems that create duplicate data manual entries.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Requirements Scoping', description: 'Documenting database entries, system interfaces, and access roles.' },
      { phase: '02', title: 'Architecture Mapping', description: 'Designing database models, API specs, and visual UI layouts.' },
      { phase: '03', title: 'Parallel Development', description: 'Developing frontend and backend modules with continuous automated tests.' },
      { phase: '04', title: 'Launch & Training', description: 'Data migration, launching to production, and creating administrator guide books.' }
    ]
  },
  'application-modernization': {
    detailedExplanation: 'We modernize slow legacy systems into clean, cloud-native web applications. We refactor old codebase bases, migrate legacy databases (e.g. MS SQL, Oracle) to modern, optimized database systems, and build modern UI interfaces without losing historical data or interrupting ongoing operations.',
    keyDifferentiators: [
      { feature: 'Migration Risk', praxireWay: 'Zero-downtime phased migration utilizing custom database replication tools.', industryStandard: 'Risky all-at-once switches that cause data loss and operational downtime.' },
      { feature: 'Performance Gain', praxireWay: 'Up to 5x improvements in page response speeds and database query times after refactoring.', industryStandard: 'Wrapper layers that hide old, slow database architectures.' },
      { feature: 'Cloud Cost Savings', praxireWay: 'Serverless and containerized deployment cutting infrastructure overhead by up to 50%.', industryStandard: 'Lifting virtual machines directly without optimization.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Legacy Audit', description: 'Analyzing database schemas, legacy endpoints, and source code issues.' },
      { phase: '02', title: 'Decoupling Architecture', description: 'Separating frontend from backend logic using modular REST/GraphQL APIs.' },
      { phase: '03', title: 'Data Mapping', description: 'Creating automated migration tools to move legacy data formats to modern databases.' },
      { phase: '04', title: 'Phased Rollout', description: 'Gradual user traffic routing, validation checking, and deprecating old systems.' }
    ]
  },
  'application-management': {
    detailedExplanation: 'Praxire manages your application lifecycle, including deployment pipelines, user analytics, security compliance, and feature releases. We ensure your production servers are monitored 24/7, maintaining top performance and minimizing operational resource demands.',
    keyDifferentiators: [
      { feature: 'Uptime Commitment', praxireWay: 'Guaranteed 99.95% uptime SLA backed by active load balancing and auto-failovers.', industryStandard: 'Standard hosting packages without proactive management or failovers.' },
      { feature: 'Security Monitoring', praxireWay: 'Real-time threat detection, automated port scans, and automated security dependency updates.', industryStandard: 'Manual, irregular system updates that risk delayed security patches.' },
      { feature: 'CI/CD Automation', praxireWay: 'Automated deployment validation with immediate rollback capabilities if tests fail.', industryStandard: 'Manual FTP transfers that invite human errors during updates.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Setup Infrastructure', description: 'Configuring cloud networks (AWS/GCP), load-balancers, and firewalls.' },
      { phase: '02', title: 'Deploy Pipelines', description: 'Building secure GitHub Actions code pipelines with testing checks.' },
      { phase: '03', title: 'Health Logging', description: 'Setting up monitoring dashboards, alerting thresholds, and status page channels.' },
      { phase: '04', title: 'Release Support', description: 'Deploying monthly updates, running security scans, and optimizing system costs.' }
    ]
  },
  'application-maintenance': {
    detailedExplanation: 'We provide routine software maintenance, optimization, and bug fixing services. We update packages, repair visual bugs, optimize slow database tables, and verify that your system remains compliant with the latest security standards.',
    keyDifferentiators: [
      { feature: 'Bug Resolution', praxireWay: 'Dedicated support engineers resolving high-priority bugs within hours.', industryStandard: 'Waiting days for feedback, leading to prolonged system issues.' },
      { feature: 'Security Compliancy', praxireWay: 'Routine vulnerability scanning, OWASP top 10 auditing, and database encryptions.', industryStandard: 'Basic updates that miss hidden security issues.' },
      { feature: 'Code Quality', praxireWay: 'Documenting code refactoring to ensure clean architecture and prevent technical debt.', industryStandard: 'Hasty code overrides that make future modifications difficult.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Code Review', description: 'Identifying architectural weaknesses, outdated packages, and database choke points.' },
      { phase: '02', title: 'Issue Tracking', description: 'Setting up shared Kanban systems for tracking tickets and sprint progress.' },
      { phase: '03', title: 'Routine Patches', description: 'Testing updates in staging sandbox environments before production releases.' },
      { phase: '04', title: 'Database Optimization', description: 'Re-indexing database columns and cleaning log history to speed up queries.' }
    ]
  },

  'application-integration': {
    detailedExplanation: 'Praxire connects disconnected business tools (ERPs, CRMs, Payment Gateways, and Logistics APIs) into unified ecosystems. We build custom API integrations, implement secure OAuth systems, and set up queue channels to prevent data loss during network disruptions.',
    keyDifferentiators: [
      { feature: 'Reliable Sync', praxireWay: 'Message queues (e.g. RabbitMQ) ensuring data transactions are not lost if systems go offline.', industryStandard: 'Direct database connections that lose records during timeout errors.' },
      { feature: 'API Security', praxireWay: 'Secure token rotations, rate-limiting, and detailed request log history.', industryStandard: 'Hardcoded credentials without request limits or security monitoring.' },
      { feature: 'Error Recovery', praxireWay: 'Automated retry routines with error alerts sent to Discord/Slack channels.', industryStandard: 'Silent errors that go unnoticed until clients report data mismatches.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'API Documentation Audit', description: 'Reviewing API configurations, authentication methods, and rate restrictions.' },
      { phase: '02', title: 'Schema Mapping', description: 'Designing converters to map data fields between systems.' },
      { phase: '03', title: 'Broker Integration', description: 'Implementing queue brokers and transaction logging services.' },
      { phase: '04', title: 'Resilience Testing', description: 'Simulating API timeouts and validating data recovery pipelines.' }
    ]
  },
  'ecommerce-application': {
    detailedExplanation: 'We build headless, conversion-optimized e-commerce platforms designed for speed. Utilizing Next.js, headless CMS engines, and secure payment integrations, we deliver sub-second page transition speeds that increase sales conversions and search engine rankings.',
    keyDifferentiators: [
      { feature: 'Loading Speed', praxireWay: 'Sub-1s Largest Contentful Paint (LCP) on mobile networks via headless edge architectures.', industryStandard: 'Heavy template builders causing sluggish page loads and cart abandonment.' },
      { feature: 'Checkout Reliability', praxireWay: 'Optimized checkouts with multi-gateway fallbacks and automated cart recovery checks.', industryStandard: 'Standard single-gateway setups that cost sales during payment downtime.' },
      { feature: 'Dynamic Search', praxireWay: 'Instant product search and filtering utilizing index-based search technologies.', industryStandard: 'Slow database searches that frustrate users looking for products.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Inventory Schema Planning', description: 'Designing database tables for products, variants, and price rates.' },
      { phase: '02', title: 'UI Conversion Mapping', description: 'Creating clean cart systems, custom search filters, and checkout screens.' },
      { phase: '03', title: 'Headless Setup', description: 'Connecting Next.js frontends to Shopify API or custom database engines.' },
      { phase: '04', title: 'Checkout Testing', description: 'Verifying payment routing, discount vouchers, and automated tax calculations.' }
    ]
  },

  // ── Technology Services ────────────────────────
  'mobile-app-development': {
    detailedExplanation: 'We design and build native-performance cross-platform mobile apps for iOS and Android. Utilizing Flutter and React Native, we compile single-codebase solutions that run at 60 FPS, reducing development timelines by half without compromising UI smoothness or hardware access.',
    keyDifferentiators: [
      { feature: 'Performance', praxireWay: 'Native compilations reaching 60+ FPS with optimized list renders and image caching.', industryStandard: 'Sluggish web-view containers that delay interface loading.' },
      { feature: 'Hardware Access', praxireWay: 'Direct device integration (Camera, GPS, Bluetooth, biometric logins) via custom native plugins.', industryStandard: 'Basic wrappers that fail to utilize hardware functions efficiently.' },
      { feature: 'Offline-First', praxireWay: 'Local database syncing (SQLite/WatermelonDB) allowing complete offline usage with automated sync when back online.', industryStandard: 'Blank loading screens that crash when network connection drops.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Interface Storyboarding', description: 'Creating mobile layout mockups and detailing mobile navigation paths.' },
      { phase: '02', title: 'Local Sync Engineering', description: 'Building the local database structure and synchronization logic.' },
      { phase: '03', title: 'Native Code Integration', description: 'Coding custom interfaces and integrating push notifications and GPS tracking.' },
      { phase: '04', title: 'App Store Submission', description: 'Running Google Play and Apple App Store checklist validations for quick approvals.' }
    ]
  },
  'hire-dedicated-developers': {
    detailedExplanation: 'Augment your development team with Praxire\'s pre-vetted engineers. We provide dedicated React, Node.js, and Mobile developers who integrate directly into your sprint channels, daily standups, and codebase systems.',
    keyDifferentiators: [
      { feature: 'Talent Level', praxireWay: 'Senior engineers with corporate project experience and strong communication skills.', industryStandard: 'Junior engineers who require significant oversight and training.' },
      { feature: 'Setup Speed', praxireWay: 'Engineers onboarding and ready to commit code to your repository within 3 business days.', industryStandard: 'Recruiting cycles that delay project starts by several weeks.' },
      { feature: 'Management Overhead', praxireWay: 'Praxire manages HR, benefits, and local taxes, providing a single monthly invoice.', industryStandard: 'Handling complex international payrolls and hardware setups directly.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Requirement Profiling', description: 'Reviewing your codebase, technology stack, and engineering requirements.' },
      { phase: '02', title: 'Candidate Selection', description: 'Matching your project requirements with our pre-vetted developer pool.' },
      { phase: '03', title: 'Integration Sprints', description: 'Onboarding developers, configuring repository access, and setting up daily standups.' },
      { phase: '04', title: 'Scale Management', description: 'Reviewing monthly output metrics and adjusting resource capacity as needed.' }
    ]
  },
  'full-stack-development': {
    detailedExplanation: 'Praxire offers complete, end-to-end full-stack development services. We build responsive user interfaces, design optimized database structures, and engineer secure backend APIs, ensuring all parts of your system communicate seamlessly.',
    keyDifferentiators: [
      { feature: 'Architecture Sync', praxireWay: 'Unified schemas (e.g. Prisma TypeScript types) preventing data mismatch errors between frontend and backend.', industryStandard: 'Separate teams using inconsistent APIs that cause communication delays.' },
      { feature: 'System Scalability', praxireWay: 'Optimized database index queries and memory caching (Redis) designed to scale.', industryStandard: 'Basic servers that fail as user data databases grow.' },
      { feature: 'Testing Coverage', praxireWay: 'Automated testing covering frontend clicks and backend database transactions.', industryStandard: 'Manual UI testing that misses hidden backend script crashes.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Database & Schema Setup', description: 'Mapping database tables and configuring secure object relationships.' },
      { phase: '02', title: 'Backend API Development', description: 'Building secure endpoints and integrating authentication controls.' },
      { phase: '03', title: 'Frontend UI Coding', description: 'Developing responsive web interfaces and connecting frontend states to API queries.' },
      { phase: '04', title: 'CI/CD Pipeline Setup', description: 'Automating build testing and deploying the application to cloud servers.' }
    ]
  },
  'saas-development': {
    detailedExplanation: 'We build multi-tenant SaaS platforms with robust subscription billing architectures. We construct secure client database separations, integrate Stripe billing subscription tiers, and build administration tools that give you complete visibility over user metrics.',
    keyDifferentiators: [
      { feature: 'Tenant Isolation', praxireWay: 'Secure database routing structures preventing any cross-tenant data leaks.', industryStandard: 'Shared query tables vulnerable to tenant data exposure errors.' },
      { feature: 'Billing Architecture', praxireWay: 'Flexible subscription logic supporting usage billing, discounts, and custom plans out-of-the-box.', industryStandard: 'Hardcoded billing plans that are difficult to modify later.' },
      { feature: 'Tenant Provisioning', praxireWay: 'Instant tenant setups with automated database schema configurations.', industryStandard: 'Manual setup processes that delay client onboardings.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Multi-Tenant Architecture', description: 'Designing database partition models and sub-domain routing rules.' },
      { phase: '02', title: 'Stripe Billing Flow', description: 'Mapping billing webhooks, account upgrades, and subscription plans.' },
      { phase: '03', title: 'User Dashboards', description: 'Building tenant management panels, invitation links, and analytics graphs.' },
      { phase: '04', title: 'Security Auditing', description: 'Testing database tenant boundaries and configuring user access control rules.' }
    ]
  },
  'artificial-intelligence': {
    detailedExplanation: 'We develop custom AI solutions to automate operational workflows and analyze data. We train predictive models, build custom LLM endpoints, and integrate artificial intelligence components directly into your application pages.',
    keyDifferentiators: [
      { feature: 'Implementation Speed', praxireWay: 'Hybrid models using optimized API gateways (e.g. OpenRouter) alongside custom local models.', industryStandard: 'Complex, expensive modeling projects that take months to deploy.' },
      { feature: 'Cost Optimization', praxireWay: 'Dynamic prompt optimization and token cache strategies to lower LLM operation bills by up to 50%.', industryStandard: 'Unoptimized model requests that lead to high monthly API invoices.' },
      { feature: 'Data Privacy', praxireWay: 'Secure data pipelines ensuring user information is sanitized before hitting model brokers.', industryStandard: 'Sending unencrypted user records to public model APIs.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Data Profiling', description: 'Analyzing existing database entries, system inputs, and training resources.' },
      { phase: '02', title: 'Model Selection', description: 'Selecting appropriate open-source models (Llama, Mistral) or API gateways (Gemini).' },
      { phase: '03', title: 'Integration Sprints', description: 'Developing system Prompts, parsing pipelines, and connecting user screens.' },
      { phase: '04', title: 'Evaluation Loops', description: 'Testing reply accuracy metrics and deploying caching configurations.' }
    ]
  },
  'data-analytics': {
    detailedExplanation: 'Praxire builds custom data analytics systems to transform raw business records into insights. We structure ETL (Extract, Transform, Load) pipelines, aggregate user actions, and assemble analytical views that help teams make data-driven decisions.',
    keyDifferentiators: [
      { feature: 'Query Performance', praxireWay: 'Aggregated database index tables delivering analytics charts under 200ms.', industryStandard: 'Slow queries that timeout when analyzing large databases.' },
      { feature: 'Data Cleanliness', praxireWay: 'Automated data parsing scripts that clean formatting errors and duplicate logs.', industryStandard: 'Raw database records loaded with inconsistencies and errors.' },
      { feature: 'Chart Intuitiveness', praxireWay: 'Clean, interactive visual charts with drill-down views built using modern web chart libraries.', industryStandard: 'Static tables and basic bar charts that lack data details.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Data Resource Mapping', description: 'Identifying data origins (SQL, log files, third-party platforms).' },
      { phase: '02', title: 'ETL Pipeline Setup', description: 'Building extraction pipelines and scheduled data formatting scripts.' },
      { phase: '03', title: 'aggregation schemas', description: 'Designing database rollup tables to optimize analytical calculations.' },
      { phase: '04', title: 'Visual Dashboard Coding', description: 'Developing web dashboards with custom filters and chart components.' }
    ]
  },
  'business-intelligence': {
    detailedExplanation: 'We build enterprise Business Intelligence dashboards that centralize your key business metrics. We compile executive dashboards, schedule automated reports, and set up performance notifications, giving managers clear visibility over company goals.',
    keyDifferentiators: [
      { feature: 'Aggregation Capacity', praxireWay: 'Unified data structures consolidation from sales platforms, CRM, ERP, and marketing APIs.', industryStandard: 'Separate reports that require manual data matching.' },
      { feature: 'Real-time Updates', praxireWay: 'Live websocket connections showing dashboard changes immediately.', industryStandard: 'Weekly static data reports that delay management action.' },
      { feature: 'Notification Alerts', praxireWay: 'Automated critical alert messages sent directly to Slack or Microsoft Teams.', industryStandard: 'Waiting for users to manually check reports for target shifts.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'KPI Mapping Workshop', description: 'Defining target business metrics, report schedules, and user access levels.' },
      { phase: '02', title: 'Data Source Connect', description: 'Configuring API adapters to connect different database endpoints.' },
      { phase: '03', title: 'Dashboard Prototyping', description: 'Figma mockups of executive summary dashboards for manager review.' },
      { phase: '04', title: 'Rollout & Alerts Setup', description: 'Publishing web reports and setting up automated email notifications.' }
    ]
  },
  'ux-ui-design': {
    detailedExplanation: 'Praxire designs beautiful, user-centric web and mobile interfaces. We build complete Figma component libraries, test layouts with target audiences, and create interactive mockups, ensuring that your application is both visually stunning and highly intuitive.',
    keyDifferentiators: [
      { feature: 'Developer Handoff', praxireWay: 'Complete Figma design systems with matching CSS variables, spacing classes, and responsive specs.', industryStandard: 'Static image mockups that are difficult to translate accurately into code.' },
      { feature: 'Aesthetics Standard', praxireWay: 'Premium layouts featuring modern typography, glassmorphism, harmonious palettes, and smooth UI transitions.', industryStandard: 'Basic template layouts using generic color schemes.' },
      { feature: 'User-Centric focus', praxireWay: 'Usability validations and heatmaps mapping user flow friction points.', industryStandard: 'Styling decisions made without user flow tests.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Wireframing Flows', description: 'Mapping low-fidelity user journeys and interface navigation structures.' },
      { phase: '02', title: 'Design System Creation', description: 'Defining design variables, input form components, and button variations.' },
      { phase: '03', title: 'High-Fidelity Mockups', description: 'Designing pixel-perfect screens and assembling interactive prototypes.' },
      { phase: '04', title: 'Developer Handoff Support', description: 'Reviewing CSS styles with engineers during frontend coding sprints.' }
    ]
  },

  // ── Quality & DevOps ──────────────────────────
  'embedded-product': {
    detailedExplanation: 'We develop embedded software and firmware for IoT devices and industrial controllers. We write lightweight C/C++ runtimes, configure RTOS environments, and optimize power configurations, ensuring device stability and performance.',
    keyDifferentiators: [
      { feature: 'Memory Optimization', praxireWay: 'Firmware optimized to fit in low-cost microcontrollers, cutting hardware unit costs.', industryStandard: 'Heavy runtimes that require expensive microchips to execute.' },
      { feature: 'System Stability', praxireWay: 'Rigorous memory monitoring and watchdogs that prevent code crashes and freezes.', industryStandard: 'Devices requiring manual hardware resets due to memory leaks.' },
      { feature: 'Over-The-Air (OTA)', praxireWay: 'Secure, encrypted OTA update channels with automated revert features if builds fail.', industryStandard: 'No remote updates, requiring local cable connections to fix firmware.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Schematic Review', description: 'Reviewing circuit board diagrams, memory limits, and pin assignments.' },
      { phase: '02', title: 'Kernel Configuration', description: 'Configuring FreeRTOS tasks and hardware driver channels.' },
      { phase: '03', title: 'Firmware Coding', description: 'Developing task loops, sensors reading logic, and MQTT channels.' },
      { phase: '04', title: 'Hardware Sandbox Test', description: 'Running continuous firmware updates and logging power draw metrics.' }
    ]
  },
  'devops': {
    detailedExplanation: 'We build robust DevOps pipelines to automate deployment workflows and monitor infrastructure. We configure Kubernetes clusters, set up Terraform cloud configs, and compile Docker build pipelines, allowing developer groups to ship code faster and with less risk.',
    keyDifferentiators: [
      { feature: 'Deploy Automation', praxireWay: 'Automated CI/CD pipelines deploying to Kubernetes clusters with zero-downtime rolls.', industryStandard: 'Manual deployment scripts that require maintenance windows.' },
      { feature: 'Infrastructure-as-Code', praxireWay: '100% cloud configuration documented in Terraform code sheets.', industryStandard: 'Manual setups in cloud portals that are difficult to track.' },
      { feature: 'Monitoring Coverage', praxireWay: 'Centralized dashboards tracking CPU usages, network limits, and request errors.', industryStandard: 'Looking at system logs only after server outages occur.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Infrastructure Audit', description: 'Analyzing server configurations, security networks, and deployment scripts.' },
      { phase: '02', title: 'Dockerizing Applications', description: 'Writing optimized Dockerfiles to containerize applications.' },
      { phase: '03', title: 'Terraform Script Setup', description: 'Drafting cloud configuration scripts for virtual machines and databases.' },
      { phase: '04', title: 'CI/CD Pipeline Launch', description: 'Creating automated deployment pipelines using GitHub Actions.' }
    ]
  },
  'qa-testing': {
    detailedExplanation: 'We provide comprehensive software testing services, including automated, performance, and security testing. We write test scripts (Cypress/Playwright) to validate user flows and simulate traffic spikes to ensure application reliability.',
    keyDifferentiators: [
      { feature: 'Test Automation', praxireWay: 'Automated browser testing runs triggered on every code commit, blocking bug releases.', industryStandard: 'Manual testing routines that delay releases and miss bugs.' },
      { feature: 'Performance Testing', praxireWay: 'Load simulation tests checking application response times under high concurrency.', industryStandard: 'Hoping the app scales without performing server load tests.' },
      { feature: 'Security Validations', praxireWay: 'Automated vulnerability checks scanning package files for security liabilities.', industryStandard: 'Basic manual tests that overlook backend security issues.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Test Spec Planning', description: 'Documenting user flows, database fields, and critical server processes.' },
      { phase: '02', title: 'Playwright Setup', description: 'Writing automated browser test scripts to validate UI elements.' },
      { phase: '03', title: 'API Integration Testing', description: 'Coding integration checks to test server endpoints.' },
      { phase: '04', title: 'Load Simulation Tests', description: 'Running virtual user traffic to test server limits.' }
    ]
  },
  'seo-optimization': {
    detailedExplanation: 'Praxire optimizes website structures, loading speeds, and keyword placements to boost organic search rankings. We run technical audits, set up structured schema markups, and configure CDN caches, driving search engine traffic and user conversions.',
    keyDifferentiators: [
      { feature: 'Technical SEO focus', praxireWay: 'Core Web Vitals optimizations, semantic markups, and edge-redirect paths.', industryStandard: 'Adding keywords without fixing underlying server loading bottlenecks.' },
      { feature: 'Structured Schemas', praxireWay: 'JSON-LD schema markups that help search engines understand page details.', industryStandard: 'Generic page titles that miss rich snippet opportunities.' },
      { feature: 'Analytics Audits', praxireWay: 'Custom conversion tracking dashboards monitoring active search keywords.', industryStandard: 'Generic traffic updates without keyword conversion analytics.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'SEO Technical Audit', description: 'Checking page speed scores, crawling issues, and meta tag setups.' },
      { phase: '02', title: 'Keyword Strategy', description: 'Analyzing search volumes, competitor ranks, and keyword opportunities.' },
      { phase: '03', title: 'On-Page Optimization', description: 'Refactoring page layouts, headings, images, and schema tags.' },
      { phase: '04', title: 'Performance Tuning', description: 'Optimizing CDN assets and cache headers to improve load speeds.' }
    ]
  },
  'digital-marketing': {
    detailedExplanation: 'We design and execute data-driven digital marketing campaigns. We set up tracking tags, build landing pages, and optimize ad campaigns across search and social channels, maximizing user acquisition budgets.',
    keyDifferentiators: [
      { feature: 'Conversion Tracking', praxireWay: 'Custom server-side tracking (e.g. Meta Conversions API) bypasses ad blockers for accurate attribution.', industryStandard: 'Standard browser pixel tracking that misses up to 30% of user conversions.' },
      { feature: 'LCP Landing Pages', praxireWay: 'Custom built landing pages loading under 1s, reducing bounce rates and ad costs.', industryStandard: 'Directing ad traffic to slow template pages that lose user interest.' },
      { feature: 'ROI Analysis', praxireWay: 'Dashboards showing ad spend return metrics linked to customer database entries.', industryStandard: 'Reporting clicks and impressions without linking them to final sales.' }
    ],
    howWeDeliver: [
      { phase: '01', title: 'Audience Strategy', description: 'Profiling customer targets, marketing channels, and landing page designs.' },
      { phase: '02', title: 'Tracking Installation', description: 'Configuring GTM, Analytics, and API conversion trackers.' },
      { phase: '03', title: 'Landing Page Build', description: 'Developing conversion-optimized, fast-loading campaign pages.' },
      { phase: '04', title: 'Campaign Optimizations', description: 'A/B testing ad copies, page variations, and adjusting ad spend.' }
    ]
  }
};
