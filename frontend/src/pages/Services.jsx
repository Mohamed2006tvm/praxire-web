import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiSearch, FiLayout, FiCode, FiZap } from 'react-icons/fi';
import { useLanguage } from '../lib/LanguageContext';
import { servicesPageTranslations } from '../data/servicesPageTranslations';
import SEO from '../components/SEO';

// Import localized service data
import { serviceCategories as originalCategories, allServices as originalServices } from '../data/servicesData';
import { serviceCategories as msCategories, allServices as msServices } from '../data/servicesData_ms';
import { serviceCategories as sgCategories, allServices as sgServices } from '../data/servicesData_sg';
import { serviceCategories as taCategories, allServices as taServices } from '../data/servicesData_ta';

export default function Services() {
  const { lang } = useLanguage();
  const tPage = servicesPageTranslations[lang] || servicesPageTranslations.en;

  const [activeCategory, setActiveCategory] = useState('all');

  const servicesData =
    lang === 'ms'
      ? msServices
      : lang === 'sg'
      ? sgServices
      : lang === 'ta'
      ? taServices
      : originalServices;

  const categoriesData =
    lang === 'ms'
      ? msCategories
      : lang === 'sg'
      ? sgCategories
      : lang === 'ta'
      ? taCategories
      : originalCategories;

  const filteredServices =
    activeCategory === 'all'
      ? servicesData
      : servicesData.filter((s) => s.category === activeCategory);

  const stats = tPage.services.stats;

  const processIcons = [FiSearch, FiLayout, FiCode, FiZap];

  return (
    <div className="bg-white">
      <SEO 
        title="Our Services | IT & Software Development Company"
        description="Explore the services offered by Praxire, including custom software development, web development, mobile app development, and UI/UX design in Tiruvannamalai and Tamil Nadu."
        keywords="Web Development Company in Tiruvannamalai, App Development Company in Tiruvannamalai, Custom Software Development in Tiruvannamalai, Website Designers in Tiruvannamalai, Mobile App Developers in Tiruvannamalai, UI UX Design Services, SaaS Development Company, Startup Product Development, Software Development Agency in Tiruvannamalai"
      />
      {/* ─── Hero Section ───────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0B1120] via-[#101d3a] to-[#0f1729] py-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
          <div className="absolute top-10 right-1/3 w-48 h-48 bg-primary-light/10 rounded-full blur-[80px]" />
        </div>

        {/* Grid Lines (subtle) */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-primary-light text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-light animate-pulse" />
              {tPage.services.heroBadge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {tPage.services.heroTitle1} <span className="bg-gradient-to-r from-primary-light via-accent to-primary bg-clip-text text-transparent">{tPage.services.heroTitle2}</span>
            </h1>
            <p className="mt-6 text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
              {tPage.services.heroSubtitle}
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 py-6 px-4">
                <div className="text-3xl md:text-4xl font-extrabold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Category Filter ─────────────────────────────────── */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
            {categoriesData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-surface-card text-text-secondary hover:text-primary hover:bg-primary/5 border border-border'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services Grid ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Title */}
        {activeCategory !== 'all' && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary">
              {categoriesData.find((c) => c.id === activeCategory)?.label}
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mt-3" />
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-white rounded-2xl border border-border p-7 flex flex-col card-hover hover:border-primary/30 relative overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 flex flex-col flex-1">
                  {/* Icon + Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center shrink-0 shadow-md shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
                      <service.icon size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6 flex-1">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <FiCheckCircle className="text-accent shrink-0 w-3.5 h-3.5" />
                        <span className="text-xs font-medium text-text-primary">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/services/${service.id}`}
                    className="mt-auto inline-flex items-center gap-2 text-primary font-semibold text-sm group/link hover:gap-3 transition-all"
                  >
                    {tPage.services.learnMore}
                    <FiArrowRight className="group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Service Count */}
        <div className="text-center mt-10 text-sm text-text-secondary">
          {tPage.services.showing} <span className="font-bold text-primary">{filteredServices.length}</span> {tPage.services.of} <span className="font-bold">{servicesData.length}</span> {tPage.services.servicesWord}
        </div>
      </section>

      {/* ─── Process Section ──────────────────────────────────── */}
      <section className="bg-surface-card border-y border-border py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold text-sm tracking-wider uppercase">{tPage.services.processBadge}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-3">
              {tPage.services.processTitle}
            </h2>
            <p className="mt-4 text-text-secondary text-lg">
              {tPage.services.processSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tPage.services.processSteps.map((item, idx) => {
              const Icon = processIcons[idx] || FiSearch;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative"
                >
                  {/* Connector line */}
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-10 left-[calc(100%_-_16px)] w-[calc(100%_-_40px)] h-px border-t-2 border-dashed border-primary/20 z-0" />
                  )}
                  <div className="bg-white rounded-2xl p-8 border border-border relative z-10 h-full">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Icon size={22} />
                      </div>
                      <span className="text-3xl font-extrabold text-primary/20">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ─── Bottom CTA ─────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0B1120] via-[#101d3a] to-[#0f1729] py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              {tPage.services.ctaTitle}
            </h2>
            <p className="mt-6 text-slate-400 text-lg max-w-2xl mx-auto">
              {tPage.services.ctaSubtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-0.5"
              >
                {tPage.services.ctaPrimary}
                <FiArrowRight />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white hover:bg-white/10 font-semibold transition-all"
              >
                {tPage.services.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
