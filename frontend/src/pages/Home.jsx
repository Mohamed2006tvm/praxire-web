import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight,
  FiCode,
  FiSmartphone,
  FiCpu,
  FiCloud,
  FiBarChart2,
  FiTrendingUp,
  FiShield,
  FiClock,
  FiUsers,
  FiDollarSign,
  FiZap,
  FiSearch,
  FiLayout,
  FiServer,
  FiDatabase,
  FiTerminal,
  FiActivity,
  FiChevronDown,
  FiVolumeX,
  FiVolume2,
  FiChevronRight,
  FiCheck
} from 'react-icons/fi';
import { projectsAPI, testimonialsAPI } from '@/lib/api';
import { useLanguage } from '../lib/LanguageContext';
import SEO from '../components/SEO';

// ─── Stats Counter Component ─────────────────────────────
function Counter({ value, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Home() {
  const { t } = useLanguage();

  const fallbackProjects = [
    {
      id: 'praxire-erp',
      title: 'Praxire ERP',
      description: 'A comprehensive enterprise resource planning solution featuring real-time inventory management, automated invoicing, customer relationship management (CRM), and interactive analytics dashboards.',
      category: 'Software',
      image: '/images/portfolio/praxire-erp.png',
      technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'PostgreSQL'],
      isFeatured: true,
    },
    {
      id: 'my-dream-surprise',
      title: 'My Dream Surprise',
      description: 'A premium surprise event planning platform and hall booking system for birthday parties and special events, featuring custom themes, packages, and reservation management.',
      image: '/images/portfolio/my-dream-surprise.png',
      technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'PostgreSQL'],
      isFeatured: true,
    },
    {
      id: 'dropzii',
      title: 'Dropzii',
      description: 'A taxi business booking and fleet management ecosystem with a high-fidelity interactive user interface, ride tracking, and integrated operational datasheets.',
      category: 'Websites',
      image: '/images/portfolio/dropzii.png',
      technologies: ['React', 'Tailwind CSS', 'Google Sheets API', 'Frontend'],
      isFeatured: true,
    },
  ];

  const [featuredProjects, setFeaturedProjects] = useState(fallbackProjects);
  const [testimonials, setTestimonials] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // CTA Interactive Spotlight & Terminal logs
  const [ctaMouse, setCtaMouse] = useState({ x: 0, y: 0 });
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [terminalLines, setTerminalLines] = useState([
    'praxire-engine --init',
    '✓ Loaded system core...',
    '✓ Synchronized client clusters...'
  ]);

  useEffect(() => {
    const outputs = [
      '⚡ Compiling cloud endpoints...',
      '✓ Optimizing responsive assets...',
      '✔ Deployment success: 100% SLA',
      '⚡ Awaiting connection proposal...',
      'praxire-engine --init',
      '✓ Loaded system core...',
      '✓ Synchronized client clusters...'
    ];
    let index = 0;
    const interval = setInterval(() => {
      setTerminalLines((prev) => {
        const nextLines = [...prev.slice(1), outputs[index]];
        index = (index + 1) % outputs.length;
        return nextLines;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  useEffect(() => {
    projectsAPI.getFeatured().then((res) => setFeaturedProjects(res.data.projects || [])).catch(() => { });
    testimonialsAPI.getAll().then((res) => setTestimonials(res.data.testimonials || [])).catch(() => { });
  }, []);

  const serviceIcons = [FiCode, FiSmartphone, FiCpu, FiCloud, FiBarChart2, FiTrendingUp];
  const services = t.home.services.items.map((item, index) => ({
    icon: serviceIcons[index] || FiCode,
    title: item.title,
    desc: item.desc,
  }));

  const whyIcons = [FiUsers, FiZap, FiDollarSign, FiClock, FiShield, FiTrendingUp];
  const whyChooseUs = t.home.why.items.map((item, index) => ({
    icon: whyIcons[index] || FiUsers,
    title: item.title,
    desc: item.desc,
  }));

  const [activeStep, setActiveStep] = useState(0);


  // ── FAQ State
  const [activeFaq, setActiveFaq] = useState(null);

  const techStackData = {
    frontend: [
      { name: 'React 19 / Next.js', desc: 'Modern single-page and server-rendered web applications.', rating: '98%' },
      { name: 'Vue / Nuxt.js', desc: 'Lightweight, high-performance user interface engineering.', rating: '95%' },
      { name: 'Tailwind CSS', desc: 'Utility-first utility styling for pixel-perfect responsive designs.', rating: '100%' },
      { name: 'React Native & Flutter', desc: 'High-performance native mobile apps for iOS & Android.', rating: '94%' },
      { name: 'TypeScript / Modern JS', desc: 'Type-safe, robust, and maintainable codebase architectures.', rating: '97%' },
      { name: 'HTML5 & CSS3 API', desc: 'Semantic layout engines, smooth animations, and transitions.', rating: '100%' }
    ],
    backend: [
      { name: 'Node.js & Express', desc: 'Asynchronous, event-driven runtime environment for server-side logic.', rating: '98%' },
      { name: 'NestJS / TypeScript', desc: 'Enterprise-grade structured backend architectures and API gateways.', rating: '94%' },
      { name: 'Python & FastAPI', desc: 'High-performance APIs tailored for machine learning models.', rating: '96%' },
      { name: 'Go (Golang)', desc: 'Concurrency-first microservices and cloud utility tools.', rating: '92%' },
      { name: 'PostgreSQL & MySQL', desc: 'Relational database systems with robust transaction logic.', rating: '98%' },
      { name: 'MongoDB & Redis', desc: 'Document store and high-performance in-memory caching.', rating: '96%' }
    ],
    cloud: [
      { name: 'Amazon Web Services (AWS)', desc: 'Comprehensive cloud hosting, EC2, Lambda, S3, RDS, IAM.', rating: '98%' },
      { name: 'Google Cloud Platform (GCP)', desc: 'BigQuery, App Engine, and specialized machine learning APIs.', rating: '93%' },
      { name: 'Docker & Kubernetes', desc: 'Microservices containerization and orchestration at scale.', rating: '95%' },
      { name: 'Terraform IaC', desc: 'Declarative infrastructure as code pipelines.', rating: '91%' },
      { name: 'GitHub Actions / CI-CD', desc: 'Automated software integration, testing, and deployment.', rating: '98%' },
      { name: 'Nginx & Cloudflare', desc: 'Reverse proxying, load balancing, CDN caching, and DDoS shielding.', rating: '100%' }
    ],
    ai: [
      { name: 'OpenAI API & LLMs', desc: 'GPT integration, custom agentic systems, and embeddings.', rating: '97%' },
      { name: 'LangChain & LlamaIndex', desc: 'Frameworks for orchestration of retrieval-augmented generation.', rating: '94%' },
      { name: 'TensorFlow & PyTorch', desc: 'Custom neural networks, deep learning model training, and fine-tuning.', rating: '90%' },
      { name: 'Pandas & NumPy', desc: 'Data transformation, ingestion, cleansing, and analytical computing.', rating: '98%' },
      { name: 'Apache Spark', desc: 'Distributed cluster-computing framework for big data pipelines.', rating: '92%' },
      { name: 'Pinecone / Vector DBs', desc: 'High-performance vector indices for semantic search applications.', rating: '95%' }
    ]
  };

  const processSteps = t.home.process.steps.map((step, index) => {
    const stepIcons = [FiSearch, FiLayout, FiCode, FiShield, FiTrendingUp];
    return {
      ...step,
      icon: stepIcons[index] || FiSearch
    };
  });

  const stepBulletPoints = {
    0: [
      'Detailed product discovery workshop & scope alignment',
      'Audit of existing infrastructure, databases, and dependencies',
      'Comprehensive technical roadmap and feasibility report'
    ],
    1: [
      'High-fidelity interactive UX/UI prototypes in Figma',
      'System architecture blueprints & entity-relationship diagrams',
      'Comprehensive API contract definition & schema modeling'
    ],
    2: [
      'Incremental features delivered in 2-week agile sprints',
      'Continuous Integration/Continuous Deployment (CI/CD) pipelines',
      'Interactive mid-sprint demo sessions and sandbox access'
    ],
    3: [
      'Unit, integration, and end-to-end automated test suites',
      'Rigorous vulnerability assessments and security checks',
      'Device, browser compatibility, and load testing runs'
    ],
    4: [
      'Zero-downtime production deployment and DNS handovers',
      '24/7 server health monitoring and automated backups',
      'Dedicated post-launch warranty and priority SLAs'
    ]
  };

  return (
    <div className="overflow-hidden bg-white text-text-primary">
      <SEO 
        title="Best Software & Web Development Company in Tiruvannamalai"
        description="Praxire is a leading web development, mobile app development, UI/UX design, and custom software development company in Tiruvannamalai, Tamil Nadu. We build high-performance custom ERP, CRM, and SaaS products."
        keywords="Praxire, Web Development Company in Tiruvannamalai, App Development Company in Tiruvannamalai, Custom Software Development in Tiruvannamalai, Website Designers in Tiruvannamalai, Mobile App Developers in Tiruvannamalai, UI UX Design Services, SaaS Development Company, Startup Product Development, Software Development Agency in Tiruvannamalai, IT company, software companies in tamil nadu, IT companies in tamil nadu, web development in tiruvannamalai, IT service app development in tiruvannamalai, Best IT software company in tamilnadu, Best software company in Tiruvannamalai"
      />
      {/* ─── Hero Section with Background Video ─────────────── */}
      <section className="relative w-full aspect-video sm:h-screen bg-black overflow-hidden z-10">
        {/* Background Video */}
        <video
          ref={videoRef}
          src="/Entry video/IMG_4549.MOV"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          controlsList="nodownload"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] bg-black select-none pointer-events-none z-0"
        />

        {/* Mute/Unmute Speaker Button */}
        <button
          onClick={toggleMute}
          className="absolute right-4 sm:right-8 bottom-4 sm:bottom-12 z-20 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm border border-white/10 shadow-lg transition-all hover:scale-105"
          aria-label={isMuted ? "Unmute Video" : "Mute Video"}
        >
          {isMuted ? (
            <FiVolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
          ) : (
            <FiVolume2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          )}
        </button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 text-white animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-extrabold bg-black/45 px-3 py-1 rounded-full backdrop-blur-sm shadow-md">
            {t.home.hero.scrollText || "Scroll to Explore"}
          </span>
          <FiChevronDown className="w-5 h-5 text-white drop-shadow-md" />
        </div>
      </section>

      {/* ─── Brands That Trust Us Section ─────────────────── */}
      <section className="py-12 bg-slate-50 border-b border-border relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-text-secondary/70">
            {t.home.brands.title}
          </span>
          <div className="w-8 h-[2px] bg-blue-600 mx-auto mt-3 mb-10" />

          <div className="relative w-full overflow-hidden py-4">
            {/* Gradients on sides for fading effect */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee pause-hover flex items-center gap-14 md:gap-20">
              {/* Set 1 */}
              <div className="flex items-center gap-14 md:gap-20 shrink-0">
                <img
                  src="/images/brands/9d633d_3a52a20d68a64b1c8b3903b9bef00238~mv2.png"
                  alt="Brand Logo 1"
                  className="h-12 sm:h-18 w-auto object-contain transition-transform hover:scale-105 duration-300"
                />
                <img
                  src="/images/brands/Arunai_Engineering_College_Logo.jpg"
                  alt="Brand Logo 2"
                  className="h-12 sm:h-18 w-auto object-contain transition-transform hover:scale-105 duration-300 rounded"
                />
                <img
                  src="/images/brands/circle_logo-B9bCCZuK.png"
                  alt="Brand Logo 3"
                  className="h-12 sm:h-18 w-auto object-contain transition-transform hover:scale-105 duration-300"
                />
                <img
                  src="/images/brands/image.png"
                  alt="Brand Logo 4"
                  className="h-12 sm:h-18 w-auto object-contain transition-transform hover:scale-105 duration-300"
                />
                <img
                  src="/images/brands/sglogo2.png"
                  alt="Brand Logo 5"
                  className="h-12 sm:h-18 w-auto object-contain transition-transform hover:scale-105 duration-300"
                />
              </div>

              {/* Set 2 */}
              <div className="flex items-center gap-14 md:gap-20 shrink-0">
                <img
                  src="/images/brands/9d633d_3a52a20d68a64b1c8b3903b9bef00238~mv2.png"
                  alt="Brand Logo 1"
                  className="h-12 sm:h-18 w-auto object-contain transition-transform hover:scale-105 duration-300"
                />
                <img
                  src="/images/brands/Arunai_Engineering_College_Logo.jpg"
                  alt="Brand Logo 2"
                  className="h-12 sm:h-18 w-auto object-contain transition-transform hover:scale-105 duration-300 rounded"
                />
                <img
                  src="/images/brands/circle_logo-B9bCCZuK.png"
                  alt="Brand Logo 3"
                  className="h-12 sm:h-18 w-auto object-contain transition-transform hover:scale-105 duration-300"
                />
                <img
                  src="/images/brands/image.png"
                  alt="Brand Logo 4"
                  className="h-12 sm:h-18 w-auto object-contain transition-transform hover:scale-105 duration-300"
                />
                <img
                  src="/images/brands/sglogo2.png"
                  alt="Brand Logo 5"
                  className="h-12 sm:h-18 w-auto object-contain transition-transform hover:scale-105 duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services Section ──────────────────────────────── */}
      <section id="services" className="py-24 bg-surface-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary font-bold text-sm tracking-wider uppercase">{t.home.services.badge}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-3">
              {t.home.services.title}
            </h2>
            <p className="mt-4 text-text-secondary text-lg">
              {t.home.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {services.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-border card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <item.icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* View All Services CTA */}
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold transition-all duration-300 group"
            >
              {t.home.services.viewAll}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Praxire ────────────────────────────── */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        {/* Background ambient accents */}
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-extrabold text-[11px] uppercase tracking-widest inline-block border border-blue-100">
              {t.home.why.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-4 leading-tight tracking-tight">
              {t.home.why.title}
            </h2>
            <p className="mt-4 text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {t.home.why.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, idx) => {
              const whyBadges = [
                "100% Certified Talents",
                "On-Time Sprint Guarantee",
                "No Hidden Cost / Flat Rate",
                "15-Min Response SLA",
                "Vulnerability Proofed",
                "Built to Handle Millions"
              ];
              return (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/50 p-8 shadow-sm hover:shadow-2xl hover:border-blue-500/30 transition-all duration-500 transform hover:-translate-y-1.5 group relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Accent glow on hover */}
                  <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-blue-500/0 rounded-full blur-xl group-hover:bg-blue-500/5 group-hover:scale-150 transition-all duration-700" />

                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-inner">
                      <item.icon size={24} className="stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center justify-between">
                    <span className="inline-block px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-lg transition-all">
                      {whyBadges[idx]}
                    </span>
                    <span className="text-slate-300 font-extrabold text-xs tracking-widest uppercase group-hover:text-blue-500 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Box for building trust */}
          <div className="mt-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-6 md:p-12 shadow-xl shadow-blue-500/20 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)]" />
            <div className="relative z-10 max-w-2xl text-center md:text-left space-y-3">
              <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
                Ready to build something extraordinary?
              </h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                Consult with our system architects for free. Let's map out your project's technology stack and execution timeline together.
              </p>
            </div>
            <div className="relative z-10 shrink-0 w-full md:w-auto">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-white text-blue-700 hover:bg-slate-50 font-bold rounded-2xl shadow-lg hover:scale-102 transition-all text-sm uppercase tracking-wider w-full md:w-auto text-center"
              >
                Schedule Discovery Call
                <FiArrowRight className="stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Process Section ───────────────────────────── */}
      <section className="py-24 bg-surface-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold text-sm tracking-wider uppercase">{t.home.process.badge}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-3">
              {t.home.process.title}
            </h2>
            <p className="mt-4 text-text-secondary text-lg">
              {t.home.process.subtitle}
            </p>
          </div>

          {/* ──── DESKTOP VIEW (Creative Interactive Layout) ──── */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Steps List (Interactive Left Side Timeline) */}
            <div className="lg:col-span-4 relative flex flex-col justify-between py-4 pl-8">
              {/* Vertical timeline line */}
              <div className="absolute left-[23px] top-8 bottom-8 w-[2px] bg-slate-200">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 origin-top"
                  style={{ transform: `scaleY(${activeStep / (processSteps.length - 1)})` }}
                />
              </div>

              {processSteps.map((step, idx) => {
                const isActive = activeStep === idx;
                const isCompleted = idx < activeStep;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className="w-full flex items-center gap-6 text-left relative focus:outline-none cursor-pointer group py-2"
                  >
                    {/* Circle timeline anchor */}
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${isActive
                      ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-lg shadow-blue-500/35 font-bold'
                      : isCompleted
                        ? 'bg-blue-600 border-blue-600 text-white font-bold'
                        : 'bg-white border-slate-200 text-slate-500 group-hover:border-slate-400 group-hover:text-slate-800'
                      }`}>
                      {step.number}
                    </div>

                    <div className="flex-1">
                      <span className={`text-[10px] font-extrabold tracking-widest uppercase block transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-500'
                        }`}>
                        Phase {step.number}
                      </span>
                      <h3 className={`font-black text-lg transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-800'
                        }`}>
                        {step.title}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detailed Interactive Display Card (Right Side) */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/60 shadow-2xl relative overflow-hidden flex flex-col justify-between p-8 min-h-[460px]">
              {/* background ambient decoration */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-8 items-center h-full"
                >
                  {/* Left Side: Text Details */}
                  <div className="space-y-6 flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center shadow-inner">
                        {(() => {
                          const Icon = processSteps[activeStep].icon;
                          return <Icon size={26} />;
                        })()}
                      </div>
                      <div>
                        <span className="text-blue-600 font-extrabold text-xs uppercase tracking-widest block">
                          Phase {processSteps[activeStep].number}
                        </span>
                        <h3 className="text-2xl font-black text-slate-900 mt-0.5 leading-tight">
                          {processSteps[activeStep].title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed">
                      {processSteps[activeStep].desc}
                    </p>

                    {/* Detailed checklists */}
                    <div className="pt-6 border-t border-slate-100 space-y-3">
                      {stepBulletPoints[activeStep]?.map((point, index) => (
                        <div key={index} className="flex items-start gap-3 text-xs text-slate-600">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <FiCheck size={12} className="stroke-[3]" />
                          </div>
                          <span className="font-medium leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Side: High-Fidelity Simulated Mockup Container */}
                  <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-6 flex flex-col justify-center shadow-inner min-h-[300px]">
                    {(() => {
                      switch (activeStep) {
                        case 0:
                          return (
                            <div className="bg-slate-950 rounded-xl p-5 pt-8 font-mono text-[11px] text-slate-400 space-y-3.5 border border-slate-800 shadow-2xl relative overflow-hidden">
                              <div className="absolute top-0 right-0 left-0 h-6 bg-slate-900 border-b border-slate-800 flex items-center justify-end px-3 gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                              </div>
                              <div className="text-slate-500 font-bold border-b border-slate-800 pb-2 flex items-center justify-between mt-1">
                                <span>SYSTEM_INTEGRITY_AUDIT</span>
                                <span className="flex items-center gap-1.5 text-amber-500">
                                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                  scanning
                                </span>
                              </div>
                              <div className="space-y-2 pt-1">
                                <div className="flex items-center gap-2 text-emerald-400">
                                  <span>[✓]</span> <span>Cloud Infrastructure Audit</span>
                                </div>
                                <div className="flex items-center gap-2 text-emerald-400">
                                  <span>[✓]</span> <span>Database Redundancy Scan</span>
                                </div>
                                <div className="flex items-center gap-2 text-emerald-400">
                                  <span>[✓]</span> <span>Security Vulnerability Scan</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 animate-pulse">
                                  <span>[..]</span> <span>Cost-Efficiency Estimation</span>
                                </div>
                              </div>
                            </div>
                          );
                        case 1:
                          return (
                            <div className="bg-slate-100 rounded-xl p-5 border border-slate-200 shadow-inner h-[240px] flex flex-col justify-between relative overflow-hidden">
                              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                <div className="flex items-center gap-2">
                                  <span className="w-3 h-3 rounded-full bg-red-400" />
                                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                                  <span className="w-3 h-3 rounded-full bg-green-400" />
                                </div>

                                <span className="text-[10px] font-mono text-slate-400">figma_canvas.fig</span>
                              </div>

                              <div className="flex-1 my-3 border border-dashed border-slate-300 rounded-lg p-3 flex flex-col justify-between bg-white relative">
                                <div className="absolute top-2 left-2 text-[9px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/50">
                                  x: 104px | y: 48px
                                </div>

                                <div className="space-y-2 mt-6">
                                  <div className="h-3 bg-slate-100 rounded-md w-3/4 mx-auto" />
                                  <div className="flex gap-2 justify-center">
                                    <div className="h-6 bg-blue-600 rounded w-16 border border-blue-700 shadow-sm" />
                                    <div className="h-6 bg-slate-100 rounded w-16 border border-slate-200" />
                                  </div>
                                </div>

                                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider text-center mt-2">
                                  Desktop Layout Guide
                                </div>
                              </div>
                            </div>
                          );
                        case 2:
                          return (
                            <div className="bg-slate-950 rounded-xl p-5 font-mono text-[11px] text-slate-300 space-y-2 border border-slate-800 shadow-2xl overflow-hidden h-[240px]">
                              <div className="text-slate-500 border-b border-slate-800 pb-2 flex justify-between">
                                <span>GIT BRANCH: main</span>
                                <span className="text-[10px] text-blue-400 font-bold">● syncing</span>
                              </div>
                              <div className="space-y-2.5 pt-2">
                                <div>
                                  <div className="text-emerald-400 font-bold">commit 9c4a8fd</div>
                                  <div className="text-slate-400 truncate pl-2">feat: add resume upload API controller</div>
                                </div>
                                <div>
                                  <div className="text-emerald-400 font-bold">commit a12e3ff</div>
                                  <div className="text-slate-400 truncate pl-2">refactor: optimize database connection pools</div>
                                </div>
                                <div>
                                  <div className="text-emerald-400 font-bold">commit b88d44e</div>
                                  <div className="text-slate-400 truncate pl-2">test: mock routes for student metrics</div>
                                </div>
                              </div>
                            </div>
                          );
                        case 3:
                          return (
                            <div className="bg-slate-950 rounded-xl p-5 font-mono text-[11px] text-slate-400 space-y-2 border border-slate-800 shadow-2xl h-[240px]">
                              <div className="text-slate-500 border-b border-slate-800 pb-2 flex justify-between">
                                <span>JEST TEST RUNNER</span>
                                <span className="text-emerald-400 font-bold">All Passed</span>
                              </div>
                              <div className="space-y-2 pt-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-emerald-400 font-bold bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-900/50">PASS</span>
                                  <span className="text-slate-300 font-medium">tests/applyModal.test.js</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-emerald-400 font-bold bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-900/50">PASS</span>
                                  <span className="text-slate-300 font-medium">tests/auth.test.js</span>
                                </div>
                                <div className="pt-2 text-slate-500 border-t border-slate-900 text-[10px] space-y-0.5">
                                  <div>Tests:  12 passed, 12 total</div>
                                  <div>Suites: 2 passed, 2 total</div>
                                  <div>Time:   1.48s</div>
                                </div>
                              </div>
                            </div>
                          );
                        case 4:
                          return (
                            <div className="bg-slate-900 rounded-xl p-5 text-[11px] border border-slate-800 shadow-2xl h-[240px] flex flex-col justify-between">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                <span className="text-slate-400 font-mono">DEPLOY_STATUS</span>
                                <span className="flex items-center gap-2 text-emerald-400 font-bold">
                                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                  Live (production)
                                </span>
                              </div>
                              <div className="space-y-2.5 my-3">
                                <div className="flex justify-between text-slate-500 font-mono">
                                  <span>Domain</span>
                                  <span className="text-slate-200 font-semibold">praxire.com</span>
                                </div>
                                <div className="flex justify-between text-slate-500 font-mono">
                                  <span>Uptime Score</span>
                                  <span className="text-emerald-400 font-bold">100 / 100</span>
                                </div>
                                <div className="flex justify-between text-slate-500 font-mono">
                                  <span>SSL Cert</span>
                                  <span className="text-emerald-400 font-semibold">Active (Let's Encrypt)</span>
                                </div>
                              </div>
                              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-full" />
                              </div>
                            </div>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ──── MOBILE VIEW (Timeline Dot Selector & Card Slider) ──── */}
          <div className="block lg:hidden space-y-8">
            {/* Step Selector Horizontal Timeline Line */}
            <div className="relative flex justify-between items-center max-w-sm mx-auto px-6">
              {/* Background Progress Bar */}
              <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 z-0">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 ease-out"
                  style={{ width: `${(activeStep / (processSteps.length - 1)) * 100}%` }}
                />
              </div>

              {processSteps.map((step, idx) => {
                const isActive = idx === activeStep;
                const isCompleted = idx < activeStep;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className="relative z-10 focus:outline-none cursor-pointer"
                  >
                    <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${isActive
                      ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-lg shadow-blue-500/30'
                      : isCompleted
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-slate-300 text-slate-500'
                      }`}>
                      {step.number}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Card Content */}
            <div className="px-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-xl flex flex-col gap-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                        {(() => {
                          const Icon = processSteps[activeStep].icon;
                          return <Icon size={22} />;
                        })()}
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest block">
                          Phase {processSteps[activeStep].number}
                        </span>
                        <h3 className="font-extrabold text-slate-900 text-base">
                          {processSteps[activeStep].title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed">
                      {processSteps[activeStep].desc}
                    </p>

                    {/* Step-specific custom highlights for mobile richness */}
                    <div className="pt-4 border-t border-slate-100 space-y-2.5">
                      {stepBulletPoints[activeStep]?.map((point, index) => (
                        <div key={index} className="flex items-start gap-2.5 text-xs text-slate-600">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <FiCheck size={10} className="stroke-[3]" />
                          </div>
                          <span className="font-medium">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Graphic Mockup Box */}
                  <div className="w-full pt-4 border-t border-slate-100">
                    {(() => {
                      switch (activeStep) {
                        case 0:
                          return (
                            <div className="bg-slate-950 rounded-xl p-4 font-mono text-[11px] text-slate-400 space-y-2 border border-slate-800 shadow-inner h-36">
                              <div className="text-slate-500 font-bold border-b border-slate-800 pb-1.5 flex items-center justify-between">
                                <span>AUDIT_CHECKLIST</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                              </div>
                              <div className="flex items-center gap-1.5 text-emerald-400">
                                <span>✓</span> <span>Infrastructure Scan</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-emerald-400">
                                <span>✓</span> <span>Cloud Overheads Assessment</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-500">
                                <span>[..]</span> <span>Tech Feasibility Report</span>
                              </div>
                            </div>
                          );
                        case 1:
                          return (
                            <div className="bg-slate-100 rounded-xl p-4 border border-slate-200/60 shadow-inner h-36 flex flex-col justify-between">
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                                <span className="w-12 h-2 rounded bg-slate-200" />
                              </div>
                              <div className="border border-dashed border-slate-300 rounded-lg p-2 flex-1 my-2 flex items-center justify-center bg-white">
                                <div className="w-full space-y-1.5">
                                  <div className="h-2 bg-slate-200 rounded w-2/3 mx-auto" />
                                  <div className="flex gap-1.5 justify-center">
                                    <div className="h-5 bg-slate-100 rounded w-10 border border-slate-200" />
                                    <div className="h-5 bg-slate-100 rounded w-10 border border-slate-200" />
                                  </div>
                                </div>
                              </div>
                              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">Figma UI Canvas</div>
                            </div>
                          );
                        case 2:
                          return (
                            <div className="bg-slate-950 rounded-xl p-4 font-mono text-[10px] text-slate-300 space-y-1.5 border border-slate-800 shadow-inner h-36 overflow-hidden">
                              <div className="text-slate-500 border-b border-slate-800 pb-1 flex justify-between">
                                <span>GIT REPO</span>
                                <span className="text-[9px] text-blue-400">main</span>
                              </div>
                              <div className="text-emerald-400 font-semibold mt-1">commit 9c4a8fd</div>
                              <div className="text-slate-400 truncate">Author: praxire-dev</div>
                              <div className="text-slate-500 truncate">Date: Today</div>
                              <div className="text-blue-300 truncate pl-2 mt-1">feat: add resume upload API</div>
                              <div className="text-blue-300 truncate pl-2">test: careers route integrated</div>
                            </div>
                          );
                        case 3:
                          return (
                            <div className="bg-slate-950 rounded-xl p-4 font-mono text-[10px] text-slate-400 space-y-1 border border-slate-800 shadow-inner h-36">
                              <div className="text-slate-500 border-b border-slate-800 pb-1 flex justify-between">
                                <span>TEST RUNNER</span>
                                <span className="text-emerald-400">100%</span>
                              </div>
                              <div className="text-emerald-400 font-bold mt-1">PASS  tests/applyModal.test.js</div>
                              <div className="text-emerald-400 font-bold">PASS  tests/auth.test.js</div>
                              <div className="text-slate-500 pt-1">Tests: 12 passed, 12 total</div>
                              <div className="text-slate-500">Time:  1.42s</div>
                            </div>
                          );
                        case 4:
                          return (
                            <div className="bg-slate-900 rounded-xl p-4 text-[11px] border border-slate-800 shadow-inner h-36 flex flex-col justify-between">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                                <span className="text-slate-400 font-mono">DEPLOY_STATUS</span>
                                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                  Live
                                </span>
                              </div>
                              <div className="space-y-1 mt-2">
                                <div className="flex justify-between text-slate-500 font-mono">
                                  <span>Domain</span>
                                  <span className="text-slate-300 font-semibold">praxire.com</span>
                                </div>
                                <div className="flex justify-between text-slate-500 font-mono">
                                  <span>Performance</span>
                                  <span className="text-emerald-400 font-bold">100 / 100</span>
                                </div>
                              </div>
                              <div className="h-1 bg-slate-800 rounded-full overflow-hidden mt-2">
                                <div className="h-full bg-blue-500 w-full" />
                              </div>
                            </div>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Latest Projects Showcase ───────────────────────── */}
      {featuredProjects.length > 0 && (
        <section className="py-24 bg-surface-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-bold text-sm tracking-wider uppercase">{t.home.portfolio.badge}</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-3">
                {t.home.portfolio.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <Link
                  to="/portfolio"
                  key={project.id}
                  className="bg-white rounded-3xl border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-2xl hover:border-blue-500/20 transition-all duration-500 transform hover:-translate-y-1.5 group cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden flex items-center justify-center">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-4xl opacity-25 font-bold text-gray-400">
                        {project.title.substring(0, 2).toUpperCase()}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                      <span className="px-6 py-3 bg-white/95 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        Explore Project
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{project.category}</span>
                    <h3 className="text-xl font-bold text-text-primary mt-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-text-secondary text-sm mt-3 leading-relaxed flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 rounded-md bg-gray-100 text-xs font-medium text-text-secondary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-primary/20 text-primary hover:text-primary-dark font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                {t.home.portfolio.viewAll}
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── Client Testimonials ────────────────────────────── */}
      {testimonials.length > 0 && (() => {
        const allTestimonials = [...testimonials, ...testimonials, ...testimonials];
        const col1 = allTestimonials.filter((_, idx) => idx % 3 === 0);
        const col2 = allTestimonials.filter((_, idx) => idx % 3 === 1);
        const col3 = allTestimonials.filter((_, idx) => idx % 3 === 2);

        const renderMarqueeColumn = (items, reverse = false) => {
          const doubleItems = [...items, ...items];
          return (
            <div className="h-[560px] overflow-hidden relative">
              {/* Premium fade masks */}
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-surface-card via-surface-card/90 to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-surface-card via-surface-card/90 to-transparent z-10 pointer-events-none" />

              <div className={`flex flex-col gap-5 py-4 ${reverse ? 'animate-marquee-vertical-reverse' : 'animate-marquee-vertical'} pause-hover`}>
                {doubleItems.map((item, idx) => (
                  <div
                    key={`${item.id || item.name}-${idx}`}
                    className="group relative bg-white p-7 rounded-2xl border border-slate-300 hover:border-primary/25 hover:shadow-[0_8px_30px_-12px_rgba(37,99,235,0.15)] transition-all duration-500 flex flex-col justify-between"
                  >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Quote icon */}
                    <div className="mb-4">
                      <svg className="w-8 h-8 text-primary/15" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Content */}
                    <p className="text-text-secondary leading-relaxed text-[15px] mb-6">
                      {item.content}
                    </p>

                    {/* Star Rating */}
                    <div className="flex gap-0.5 mb-5">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3.5 pt-5 border-t border-border/50">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/15 to-violet-500/10 flex items-center justify-center font-bold text-primary text-sm ring-2 ring-primary/10 ring-offset-2 ring-offset-white">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-text-primary text-sm">{item.name}</h4>
                        <p className="text-text-secondary text-xs mt-0.5">{item.position}, <span className="text-primary/70 font-medium">{item.company}</span></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        };

        return (
          <section className="py-28 bg-surface-card border-t border-border overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto mb-20">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary font-bold text-xs tracking-widest uppercase mb-6">
                  {t.home.testimonials.badge}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary mt-3 tracking-tight">
                  {t.home.testimonials.title}
                </h2>
                <p className="mt-4 text-text-secondary text-lg max-w-xl mx-auto">
                  Hear from the teams and founders who trust Praxire to deliver mission-critical solutions.
                </p>
              </div>

              {/* Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="block">
                  {renderMarqueeColumn(col1, false)}
                </div>
                <div className="hidden md:block">
                  {renderMarqueeColumn(col2, true)}
                </div>
                <div className="hidden lg:block">
                  {renderMarqueeColumn(col3, false)}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ─── Frequently Asked Questions Section ────────────── */}
      <section id="faq" className="py-24 bg-white border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-wider uppercase">{t.home.faq.badge}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-3">
              {t.home.faq.title}
            </h2>
            <p className="mt-4 text-text-secondary text-lg">
              {t.home.faq.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {t.home.faq.items.slice(0, 4).map((item, idx) => (
              <div
                key={idx}
                className="border border-border rounded-2xl overflow-hidden bg-surface-card transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-6 font-bold text-lg text-text-primary flex items-center justify-between gap-4 cursor-pointer hover:bg-white transition-colors"
                >
                  <span>{item.q}</span>
                  <span className={`text-primary font-bold text-2xl transition-transform duration-300 ${activeFaq === idx ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${activeFaq === idx ? 'max-h-48 border-t border-border/50' : 'max-h-0'
                    }`}
                >
                  <p className="p-6 text-text-secondary text-base leading-relaxed bg-white/50">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-primary/30 text-primary font-bold rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              View All Questions
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Call To Action Section ─────────────────────────── */}
      <section className="py-24 bg-surface-card border-t border-border relative overflow-hidden">
        {/* Soft background accents */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary font-bold text-xs tracking-widest uppercase mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Let's Collaborate
          </span>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-text-primary mb-6">
            {t.home.cta.title}
          </h2>

          {/* Subtitle */}
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
            {t.home.cta.subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              to="/contact"
              className="group/btn px-10 py-4 rounded-2xl bg-primary hover:bg-primary-dark text-white font-semibold transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 text-center"
            >
              <span className="flex items-center justify-center gap-2">
                {t.home.cta.primary}
                <FiArrowRight className="transition-transform group-hover/btn:translate-x-1" />
              </span>
            </Link>
            <Link
              to="/services"
              className="px-10 py-4 rounded-2xl bg-white border border-border hover:border-primary/20 hover:shadow-md text-text-primary font-semibold transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              Our Services
              <FiChevronRight className="text-text-secondary" />
            </Link>
          </div>

          {/* Trust Stats Row */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '50+', label: 'Projects Delivered', icon: <FiCheck className="text-primary" /> },
              { value: '99.9%', label: 'System Uptime', icon: <FiShield className="text-emerald-500" /> },
              { value: '<2hrs', label: 'Avg Response Time', icon: <FiClock className="text-amber-500" /> },
              { value: '4.9★', label: 'Client Rating', icon: <FiUsers className="text-violet-500" /> },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/15 transition-all duration-300 group cursor-default">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg">{stat.icon}</span>
                  <span className="text-2xl md:text-3xl font-extrabold text-text-primary group-hover:text-primary transition-colors">{stat.value}</span>
                </div>
                <p className="text-text-secondary text-xs font-medium tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div> */}
        </div>
      </section>
    </div>
  );
}
