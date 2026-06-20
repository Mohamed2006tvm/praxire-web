import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/LanguageContext';
import SEO from '../components/SEO';
import {
  FiTrendingUp,
  FiCode,
  FiSmartphone,
  FiLayers,
  FiCpu,
  FiCompass,
  FiActivity,
  FiZap,
  FiArrowRight,
  FiShield,
  FiCheck,
  FiArrowUpRight
} from 'react-icons/fi';

// Fallback content in case translations are not loaded
const fallbackData = {
  hero: {
    badge: 'Our Perspective',
    title: 'What We Think',
    subtitle: 'Ideas, insights, and perspectives shaping the future of digital innovation.',
    description: 'At Praxire, we share practical knowledge, industry trends, and valuable lessons gathered from building products and working with businesses.',
  },
  philosophy: {
    title: 'Our Philosophy',
    subtitle: 'The core principles that guide how we build, design, and innovate.',
    items: [
      { title: 'Solve Real Problems', desc: 'Technology should solve real business problems, not just exist for its own sake.' },
      { title: 'User-Centric Design', desc: 'Great software is built around users, not features.' },
      { title: 'Power of Simplicity', desc: 'Simplicity creates better experiences and more robust codebases.' },
      { title: 'Human-First Innovation', desc: 'True innovation comes from understanding people first.' },
    ],
  },
  areas: {
    title: 'Areas We Explore',
    subtitle: 'The domains we investigate to push the boundaries of digital execution.',
    items: [
      { title: 'Startup Growth', desc: 'Helping early-stage companies build, launch, and scale their MVP platforms.' },
      { title: 'Web Development', desc: 'Creating high-performance, responsive websites and web applications.' },
      { title: 'Mobile Applications', desc: 'Engineering native and cross-platform apps with smooth performance.' },
      { title: 'Custom Software Solutions', desc: 'Tailoring enterprise systems, ERPs, CRMs, and APIs to business needs.' },
      { title: 'Artificial Intelligence', desc: 'Integrating LLMs, machine learning, and automation into workflows.' },
      { title: 'Product Design & UX', desc: 'Crafting beautiful interfaces with high usability and aesthetics.' },
      { title: 'Digital Transformation', desc: 'Modernizing legacy infrastructure for cloud readiness and digital scale.' },
      { title: 'Business Automation', desc: 'Streamlining operations, reducing overheads, and increasing efficiency.' },
    ],
  },
  beliefs: {
    title: 'What We Believe',
    subtitle: 'Our fundamental values for technology deployment.',
    items: [
      { title: 'Tailored Technology', desc: 'Every business deserves technology tailored to its needs.' },
      { title: 'Sustainable Growth', desc: 'Data-driven decisions create sustainable growth.' },
      { title: 'Strategic Advantage', desc: 'User experience is a business advantage.' },
      { title: 'Scale & Efficiency', desc: 'Automation increases efficiency and scalability.' },
      { title: 'Continuous Learning', desc: 'Continuous learning drives innovation.' },
    ],
  },
};

// Map philosophy items to icons
const philosophyIcons = [
  FiZap,
  FiCompass,
  FiLayers,
  FiActivity
];

// Map explore areas to custom icons and unique accent gradients
const areaDetails = [
  { icon: FiTrendingUp, gradient: 'from-blue-500 to-indigo-500', shadow: 'shadow-blue-500/10' },
  { icon: FiCode, gradient: 'from-sky-500 to-blue-600', shadow: 'shadow-sky-500/10' },
  { icon: FiSmartphone, gradient: 'from-indigo-500 to-purple-600', shadow: 'shadow-indigo-500/10' },
  { icon: FiLayers, gradient: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/10' },
  { icon: FiCpu, gradient: 'from-emerald-500 to-teal-600', shadow: 'shadow-emerald-500/10' },
  { icon: FiCompass, gradient: 'from-amber-500 to-orange-500', shadow: 'shadow-amber-500/10' },
  { icon: FiActivity, gradient: 'from-rose-500 to-red-600', shadow: 'shadow-rose-500/10' },
  { icon: FiZap, gradient: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-500/10' },
];

export default function WhatWeThink() {
  const { t } = useLanguage();
  const pageData = t?.whatWeThinkPage || fallbackData;

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-700 pb-24 font-sans selection:bg-primary/20 selection:text-primary-dark">
      <SEO 
        title="What We Think | Tech Insights & Engineering Philosophy"
        description="Ideas, technical insights, and product development philosophy shaping digital innovation at Praxire. Read about startup growth, web/mobile apps, and custom software systems."
        keywords="What We Think, Praxire Insights, Tech Philosophy, Software Company in Tiruvannamalai, Web Development Company in Tiruvannamalai, App Development Company in Tiruvannamalai"
      />
      
      {/* ── 1. Hero Section ── */}
      <section className="relative py-32 bg-white border-b border-slate-100 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute -top-32 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] animate-pulse-glow" />
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[120px]" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary/5 text-primary border border-primary/10 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {pageData.hero.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-4xl mx-auto">
              {pageData.hero.title.split(' ').map((word, idx, arr) => {
                if (idx >= arr.length - 2) {
                  return <span key={idx} className="text-gradient">{word} </span>;
                }
                return word + ' ';
              })}
            </h1>
            <p className="text-slate-900 text-lg sm:text-xl font-semibold max-w-3xl mx-auto leading-relaxed">
              {pageData.hero.subtitle}
            </p>
            <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">
              {pageData.hero.description}
            </p>

            <div className="pt-6 flex flex-wrap justify-center gap-4">
              <a
                href="#philosophy"
                className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/25 cursor-pointer flex items-center gap-2"
              >
                <span>Read Our Philosophy</span>
                <FiArrowRight />
              </a>
              <Link
                to="/blog"
                className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200/85 text-slate-800 border border-slate-200 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <span>Explore Technical Blogs</span>
                <FiArrowUpRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Our Philosophy Section ── */}
      <section id="philosophy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Left Column: Bold philosophy callout */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {pageData.philosophy.title}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {pageData.philosophy.subtitle}
            </p>
            <div className="p-6 bg-gradient-to-br from-primary to-accent rounded-3xl text-white shadow-xl shadow-primary/10 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
              <p className="text-sm italic font-medium leading-relaxed z-10 relative">
                "We believe that technology is a bridge, not a destination. Everything we design, write, and deploy is engineered to align business metrics with outstanding human experiences."
              </p>
              <div className="mt-4 flex items-center gap-3 z-10 relative">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">P</div>
                <div>
                  <p className="text-xs font-bold">Praxire Engineering Board</p>
                  <p className="text-[10px] text-white/80">Systems Architects</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Grid of 4 philosophy items */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pageData.philosophy.items.map((item, idx) => {
              const IconComponent = philosophyIcons[idx] || FiShield;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:border-primary/30 transition-all card-hover group shadow-sm"
                >
                  <div className="p-3 rounded-xl bg-primary/5 text-primary w-fit group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <IconComponent size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-4 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ── 3. Areas We Explore Section ── */}
      <section className="bg-slate-100/50 border-t border-b border-slate-200/60 py-24 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
              Our Domains
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
              {pageData.areas.title}
            </h2>
            <p className="text-slate-600 text-base mt-3">
              {pageData.areas.subtitle}
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {pageData.areas.items.map((item, idx) => {
              const details = areaDetails[idx] || { icon: FiCode, gradient: 'from-blue-500 to-indigo-500', shadow: 'shadow-blue-500/10' };
              const IconComponent = details.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 transition-all card-hover group shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className={`p-3 rounded-xl text-white bg-gradient-to-br ${details.gradient} w-fit shadow-md ${details.shadow} transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300`}>
                      <IconComponent size={20} />
                    </div>
                    <h3 className="text-base font-extrabold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-slate-100/60 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to="/services" className="text-xs font-bold text-primary flex items-center gap-1">
                      <span>Explore Services</span>
                      <FiArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 4. What We Believe Section ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
            Core Beliefs
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
            {pageData.beliefs.title}
          </h2>
          <p className="text-slate-600 text-base mt-2">
            {pageData.beliefs.subtitle}
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="space-y-6"
        >
          {pageData.beliefs.items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white border border-slate-200/80 hover:border-primary/20 p-6 rounded-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between transition-all card-hover shadow-sm group"
            >
              <div className="flex gap-4 items-start sm:items-center">
                <div className="flex items-center justify-center font-mono font-bold text-lg bg-primary/5 text-primary rounded-xl h-12 w-12 shrink-0 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 sm:mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div className="text-emerald-500 shrink-0 self-end sm:self-center p-1 rounded-full bg-emerald-50">
                <FiCheck size={16} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 5. Call To Action ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl text-center md:text-left"
        >
          {/* Radial visual glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Have a vision you'd like to build?
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Let's discuss how we can partner to apply our technology principles, engineering frameworks, and product design paradigms directly to your next project.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto justify-center">
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/20 text-center flex items-center justify-center gap-2"
              >
                <span>Get in Touch</span>
                <FiArrowRight />
              </Link>
              <Link
                to="/services"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20 font-semibold text-sm transition-all text-center"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
