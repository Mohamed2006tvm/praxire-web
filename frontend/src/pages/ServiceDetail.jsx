import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext';
import { servicesPageTranslations } from '../data/servicesPageTranslations';
import {
  FiArrowLeft,
  FiCheckCircle,
  FiArrowRight,
  FiSettings,
  FiMail,
  FiPhone,
  FiGlobe,
  FiActivity,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import SEO from '../components/SEO';

// Original data
import { allServices as originalServices, serviceCategories as originalCategories } from '../data/servicesData';
import { servicesDetailedContent as originalDetailedContent } from '../data/servicesDetailedContent';

// Translated data
import { allServices as msServices, serviceCategories as msCategories } from '../data/servicesData_ms';
import { servicesDetailedContent as msDetailedContent } from '../data/servicesDetailedContent_ms';

import { allServices as sgServices, serviceCategories as sgCategories } from '../data/servicesData_sg';
import { servicesDetailedContent as sgDetailedContent } from '../data/servicesDetailedContent_sg';

import { allServices as taServices, serviceCategories as taCategories } from '../data/servicesData_ta';
import { servicesDetailedContent as taDetailedContent } from '../data/servicesDetailedContent_ta';

const getServiceImage = (serviceId) => {
  if (['artificial-intelligence', 'data-analytics', 'business-intelligence'].includes(serviceId)) {
    return '/images/services/ai_analytics.png';
  }
  if (['mobile-app-development', 'hire-dedicated-developers', 'ux-ui-design'].includes(serviceId)) {
    return '/images/services/mobile_app.png';
  }
  if (['devops', 'qa-testing', 'embedded-product', 'seo-optimization', 'digital-marketing'].includes(serviceId)) {
    return '/images/services/devops_qa.png';
  }
  if (['web-application', 'ecommerce-application', 'saas-development', 'custom-application', 'application-modernization', 'application-management', 'application-maintenance', 'cloud-application', 'application-integration'].includes(serviceId)) {
    return '/images/services/web_app.png';
  }
  return '/images/services/software_dev.png';
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const { lang } = useLanguage();
  const tPage = servicesPageTranslations[lang] || servicesPageTranslations.en;

  // Resolve language-specific service lists and detailed contents
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

  const servicesDetailedContent =
    lang === 'ms'
      ? msDetailedContent
      : lang === 'sg'
      ? sgDetailedContent
      : lang === 'ta'
      ? taDetailedContent
      : originalDetailedContent;

  const service = servicesData.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md bg-white p-8 rounded-2xl border border-border shadow-xl"
        >
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiSettings size={28} className="animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">{tPage.detail.notFoundTitle}</h2>
          <p className="text-text-secondary text-sm mb-6">
            {tPage.detail.notFoundDesc}
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold transition-all shadow-md shadow-primary/20"
          >
            <FiArrowLeft /> {tPage.detail.backToAllServicesButton}
          </Link>
        </motion.div>
      </div>
    );
  }

  // Get current category label
  const categoryLabel = categoriesData.find((c) => c.id === service.category)?.label || '';

  // Get related services in same category (excluding current)
  const relatedServices = servicesData
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  const whatsappUrl = `https://wa.me/918072810080?text=Hi%20Praxire,%20I'm%20interested%20in%20your%20${encodeURIComponent(service.title)}%20service.`;

  const detailContent = servicesDetailedContent[service.id] || {
    detailedExplanation: service.description,
    keyDifferentiators: [
      { feature: 'Quality Control', praxireWay: 'Rigorous tests, bi-weekly client feedback, and sub-second scale audits.', industryStandard: 'Basic validation checks and slow development cycles.' },
      { feature: 'Architecture', praxireWay: 'Clean codebases designed for modular expansions and high security.', industryStandard: 'Generic code setups prone to technical debt.' },
    ],
    howWeDeliver: [
      { phase: '01', title: 'Discovery & Plan', description: 'Detailed architectural planning, scoping inputs, and outlining system flows.' },
      { phase: '02', title: 'Design & Proto', description: 'Creating interactive Figma wireframes and aligning UI templates.' },
      { phase: '03', title: 'Sprint Cycles', description: 'Incremental code development and automated integration testing.' },
      { phase: '04', title: 'Launch & Support', description: 'Server deployment, setting up alerting monitors, and routine SLAs.' },
    ],
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title={`${service.title} Services`}
        description={`Custom ${service.title} solutions by Praxire, the leading software and web development company in Tiruvannamalai, Tamil Nadu. Build scalable applications with our expert developers.`}
        keywords={`Praxire ${service.title}, ${service.title} in Tiruvannamalai, ${service.title} in Tamil Nadu, Web Development Company in Tiruvannamalai, App Development Company in Tiruvannamalai, Custom Software Development, Software Company in Tiruvannamalai, IT Company in Tiruvannamalai`}
      />
      {/* ─── Hero Section ───────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0B1120] via-[#101d3a] to-[#0f1729] py-24 overflow-hidden">
        {/* Decorative Blur Orbs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />
        </div>

        {/* Diagonal Tech Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary-light hover:text-white text-sm font-semibold mb-8 transition-colors group"
          >
            <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
            {tPage.detail.backToServices}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Title & Intro */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-primary-light text-xs font-extrabold uppercase tracking-wider mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
                  {categoryLabel}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                  {service.title}
                </h1>
                <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-xl">
                  {service.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-0.5 text-sm"
                  >
                    {tPage.detail.requestProposal}
                    <FiArrowRight />
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold transition-all hover:-translate-y-0.5 text-sm shadow-md shadow-[#25D366]/15"
                  >
                    <FaWhatsapp size={18} />
                    {tPage.detail.whatsappConsultation}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Unique Image Mockup Display */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md flex items-center justify-center group overflow-hidden shadow-2xl"
              >
                {/* Visual Mockup Image */}
                <img
                  src={getServiceImage(service.id)}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:scale-105 group-hover:opacity-85 transition-all duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-80" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
                
                {/* Floating Icon overlay */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-[#0f172a] text-white flex items-center justify-center shadow-2xl relative z-10 transform group-hover:rotate-6 transition-all duration-500 border border-white/15">
                  <service.icon size={36} className="sm:size-[40px]" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Detailed Deep Dive & Comparison ────────────────── */}
      <section className="py-24 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Side: Rich Detailed Explanation */}
            <div className="lg:col-span-6">
              <span className="text-primary font-bold text-xs uppercase tracking-widest">{tPage.detail.deepDiveBadge}</span>
              <h2 className="text-3xl font-extrabold text-text-primary mt-2 mb-6">
                {tPage.detail.deepDiveTitle}
              </h2>
              <div className="space-y-6 text-text-secondary text-base leading-relaxed">
                <p className="font-medium text-text-primary text-lg leading-relaxed">
                  {detailContent.detailedExplanation.split('. ')[0]}.
                </p>
                <p className="leading-relaxed">
                  {detailContent.detailedExplanation.split('. ').slice(1).join('. ')}
                </p>
                <p className="leading-relaxed">
                  {tPage.detail.praxireScaleDesc}
                </p>
              </div>

              {/* Stat callout */}
              <div className="mt-8 p-6 bg-slate-50 border border-border rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FiActivity size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-sm">{tPage.detail.scaleTitle}</h4>
                  <p className="text-text-secondary text-xs mt-0.5">
                    {tPage.detail.scaleDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Why Praxire is Superior (Direct Comparison) */}
            <div className="lg:col-span-6 bg-slate-50 p-8 rounded-3xl border border-border">
              <span className="text-primary font-bold text-xs uppercase tracking-widest">{tPage.detail.metricsBadge}</span>
              <h3 className="text-2xl font-extrabold text-text-primary mt-2 mb-6">
                {tPage.detail.superiorTitle}
              </h3>
              <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                {tPage.detail.superiorDesc}
              </p>

              <div className="space-y-6">
                {detailContent.keyDifferentiators.map((diff, index) => (
                  <div key={index} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                    <h4 className="font-bold text-text-primary text-base mb-3">{diff.feature}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Praxire Way */}
                      <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                        <span className="text-xs font-extrabold text-primary uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                          <FiCheckCircle className="text-primary animate-pulse" size={14} /> {tPage.detail.praxireWay}
                        </span>
                        <p className="text-text-primary text-xs leading-relaxed font-medium">
                          {diff.praxireWay}
                        </p>
                      </div>
                      {/* Others */}
                      <div className="bg-slate-200/50 p-4 rounded-xl border border-slate-200">
                        <span className="text-xs font-extrabold text-text-secondary uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-text-secondary" /> {tPage.detail.industryStandard}
                        </span>
                        <p className="text-text-secondary text-xs leading-relaxed">
                          {diff.industryStandard}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Service Features/Capabilities ──────────────────── */}
      <section className="py-20 bg-slate-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">{tPage.detail.capabilitiesBadge}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-2">
              {tPage.detail.capabilitiesTitle}
            </h2>
            <p className="text-text-secondary text-sm mt-3 leading-relaxed">
              {tPage.detail.capabilitiesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-border hover:border-primary/20 shadow-sm transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <FiCheckCircle size={16} />
                  </div>
                  <h3 className="font-bold text-text-primary text-base group-hover:text-primary transition-colors">
                    {feature}
                  </h3>
                </div>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {tPage.detail.capabilityDesc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Client Focus: Malaysia & International ──────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0B1120] to-[#1e293b] rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/10 text-white relative overflow-hidden shadow-2xl">
            {/* Grid decoration */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7">
                <span className="text-primary-light font-extrabold text-xs uppercase tracking-widest bg-white/10 border border-white/10 px-3 py-1 rounded-full">
                  {tPage.detail.malaysiaBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mt-4 leading-tight">
                  {tPage.detail.malaysiaTitle}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
                  {tPage.detail.malaysiaDesc}
                </p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tPage.detail.malaysiaPoints.map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <FiGlobe className="text-primary-light shrink-0" size={18} />
                      <span className="text-xs font-semibold text-slate-200">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-xs text-center">
                  <span className="text-3xl font-extrabold text-white">10+</span>
                  <p className="text-xs text-slate-400 font-medium mt-1">{tPage.detail.malaysiaStatLabel}</p>
                  <p className="text-slate-300 text-xs mt-3 leading-relaxed">
                    {tPage.detail.malaysiaStatDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Custom Process Flow ──────────────────────── */}
      <section className="py-20 bg-slate-50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">{tPage.detail.methodologyBadge}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-2">
              {tPage.detail.methodologyTitle}
            </h2>
            <p className="text-text-secondary text-sm mt-3 leading-relaxed">
              {tPage.detail.methodologySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {detailContent.howWeDeliver.map((p, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-border relative group hover:border-primary/20 transition-all card-hover flex flex-col justify-between">
                <div>
                  <div className="text-3xl font-extrabold text-primary/25 mb-4 group-hover:text-primary/40 transition-colors">{p.phase}</div>
                  <h4 className="font-bold text-text-primary text-base mb-2 group-hover:text-primary transition-colors">{p.title}</h4>
                  <p className="text-text-secondary text-xs leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Related Services Sidebar/Grid ──────────────────── */}
      {relatedServices.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <span className="text-primary font-bold text-xs uppercase tracking-widest">{tPage.detail.exploreMoreBadge}</span>
                <h3 className="text-2xl font-extrabold text-text-primary mt-2">
                  {tPage.detail.relatedTitle} {categoryLabel}
                </h3>
              </div>
              <Link
                to="/services"
                className="text-primary hover:text-primary-dark font-semibold text-sm flex items-center gap-1.5 transition-colors group"
              >
                {tPage.detail.allServicesLink} <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rs) => (
                <Link
                  key={rs.id}
                  to={`/services/${rs.id}`}
                  className="group bg-slate-50 border border-border hover:border-primary/20 rounded-2xl p-6 transition-all hover:bg-white hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                      <rs.icon size={20} />
                    </div>
                    <h4 className="font-bold text-text-primary group-hover:text-primary transition-colors text-base mb-2">
                      {rs.title}
                    </h4>
                    <p className="text-text-secondary text-xs leading-relaxed line-clamp-2">
                      {rs.description}
                    </p>
                  </div>
                  <span className="mt-4 text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    {tPage.services.learnMore} <FiArrowRight />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Bottom Call to Action ──────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#0B1120] via-[#101d3a] to-[#0f1729] text-white overflow-hidden relative border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            {tPage.detail.ctaTitle}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            {tPage.detail.ctaSubtitle.replace('{title}', service.title)}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5"
            >
              {tPage.detail.consultationFormButton}
              <FiArrowRight />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold transition-all hover:-translate-y-0.5 shadow-md"
            >
              <FaWhatsapp size={18} />
              {tPage.detail.chatWhatsappButton}
            </a>
          </div>
          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-slate-400">
            <a href="mailto:info@praxire.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <FiMail /> info@praxire.com
            </a>
            <span className="hidden sm:inline text-white/10">|</span>
            <a href="tel:+918072810080" className="flex items-center gap-2 hover:text-white transition-colors">
              <FiPhone /> +91 80728 10080
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
