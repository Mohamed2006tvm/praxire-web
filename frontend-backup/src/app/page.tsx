'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
} from 'react-icons/fi';
import { projectsAPI, testimonialsAPI } from '@/lib/api';

// ─── Stats Counter Component ─────────────────────────────
function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
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
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    projectsAPI.getFeatured().then((res) => setFeaturedProjects(res.data)).catch(() => {});
    testimonialsAPI.getAll().then((res) => setTestimonials(res.data)).catch(() => {});
  }, []);

  const services = [
    { icon: FiCode, title: 'Website Development', desc: 'Custom Next.js & React platforms optimized for speed and conversion.' },
    { icon: FiSmartphone, title: 'Mobile App Development', desc: 'Native and cross-platform mobile apps built with React Native.' },
    { icon: FiCpu, title: 'AI & Machine Learning Solutions', desc: 'Predictive intelligence, NLP, and customized automation systems.' },
    { icon: FiCloud, title: 'Cloud Solutions', desc: 'Scalable AWS, GCP, and Azure cloud infrastructure and migrations.' },
    { icon: FiBarChart2, title: 'Digital Marketing', desc: 'Data-driven growth strategies to acquire and retain target clients.' },
    { icon: FiTrendingUp, title: 'SEO Services', desc: 'Organic growth and page ranking boosts through advanced optimization.' },
  ];

  const whyChooseUs = [
    { icon: FiUsers, title: 'Expert Team', desc: 'Seasoned software engineers, architects, and product designers.' },
    { icon: FiZap, title: 'Fast Delivery', desc: 'Agile sprints delivering functional products on strict timelines.' },
    { icon: FiDollarSign, title: 'Affordable Pricing', desc: 'Flexible engagement models tailor-fit to enterprise and startup budgets.' },
    { icon: FiClock, title: '24/7 Support', desc: 'Dedicated client support engineers ensuring 100% platform uptime.' },
    { icon: FiShield, title: 'Secure Solutions', desc: 'Enterprise-grade security controls, compliance audits, and data privacy.' },
    { icon: FiTrendingUp, title: 'Scalable Technology', desc: 'Future-proof system architectures designed to handle millions of requests.' },
  ];

  return (
    <div className="overflow-hidden bg-white text-text-primary">
      {/* ─── Hero Section ───────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-hero py-20">
        {/* Animated Tech Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                Enterprise IT Partner
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary leading-tight">
                Transforming Businesses <br />
                <span className="text-gradient">Through Technology</span>
              </h1>
              <p className="mt-6 text-lg text-text-secondary max-w-lg leading-relaxed">
                Praxire delivers innovative software, web, mobile, AI, and digital transformation solutions to supercharge your business scale.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold flex items-center gap-2 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5"
                >
                  Get Free Consultation
                  <FiArrowRight />
                </Link>
                <Link
                  href="/services"
                  className="px-8 py-4 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold transition-all shadow-md shadow-primary/5 hover:-translate-y-0.5"
                >
                  View Services
                </Link>
              </div>
            </motion.div>

            {/* Hero Right Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:flex justify-center"
            >
              <svg className="w-full max-w-[500px] h-auto animate-float" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="250" cy="250" r="180" stroke="rgba(15,23,42,0.05)" strokeWidth="2" />
                <circle cx="250" cy="250" r="120" stroke="rgba(37,99,235,0.08)" strokeWidth="2" />
                <circle cx="250" cy="250" r="60" stroke="rgba(37,99,235,0.15)" strokeWidth="2" strokeDasharray="5 5" />
                
                {/* Floating Node Orbs */}
                <circle cx="250" cy="70" r="12" fill="#2563EB" className="animate-pulse" />
                <circle cx="100" cy="300" r="8" fill="#3B82F6" />
                <circle cx="400" cy="280" r="10" fill="#1D4ED8" />
                <circle cx="200" cy="380" r="6" fill="#60A5FA" />

                {/* Central Brain/Server Icon Representation */}
                <rect x="210" y="210" width="80" height="80" rx="20" fill="url(#paint0_linear)" className="glow" />
                <path d="M235 240H265M235 250H265M235 260H255" stroke="white" strokeWidth="3" strokeLinecap="round" />

                <defs>
                  <linearGradient id="paint0_linear" x1="210" y1="210" x2="290" y2="290" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563EB" />
                    <stop offset="1" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Statistics Section ────────────────────────────── */}
      <section className="py-12 bg-white border-y border-border relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-extrabold text-primary"><Counter value={120} suffix="+" /></h3>
              <p className="mt-2 text-sm md:text-base text-text-secondary font-medium">Projects Completed</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-extrabold text-primary"><Counter value={95} suffix="+" /></h3>
              <p className="mt-2 text-sm md:text-base text-text-secondary font-medium">Happy Clients</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-extrabold text-primary"><Counter value={25} suffix="+" /></h3>
              <p className="mt-2 text-sm md:text-base text-text-secondary font-medium">Team Members</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-extrabold text-primary"><Counter value={99} suffix="%" /></h3>
              <p className="mt-2 text-sm md:text-base text-text-secondary font-medium">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services Section ──────────────────────────────── */}
      <section className="py-24 bg-surface-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary font-bold text-sm tracking-wider uppercase">Our Offerings</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-3">
              Services We Specialize In
            </h2>
            <p className="mt-4 text-text-secondary text-lg">
              Deliver innovative, modern solutions crafted by engineers with global expertise to grow your company presence and infrastructure.
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
        </div>
      </section>

      {/* ─── Why Choose Praxire ────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary font-bold text-sm tracking-wider uppercase">Why Choose Praxire</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-3">
              Built For Reliability and Scale
            </h2>
            <p className="mt-4 text-text-secondary text-lg">
              We leverage modern architectures and engineering frameworks to align directly with enterprise standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Latest Projects Showcase ───────────────────────── */}
      {featuredProjects.length > 0 && (
        <section className="py-24 bg-surface-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <span className="text-primary font-bold text-sm tracking-wider uppercase">Portfolio</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-3">
                  Recent Case Studies
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="mt-4 md:mt-0 text-primary font-semibold hover:text-primary-dark flex items-center gap-1.5 transition-colors"
              >
                View Full Showcase <FiArrowRight />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project: any) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl border border-border overflow-hidden flex flex-col h-full card-hover"
                >
                  <div className="aspect-video bg-gray-50 flex items-center justify-center relative">
                    <span className="text-text-secondary text-sm font-medium">Project Showcase</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{project.category}</span>
                    <h3 className="text-xl font-bold text-text-primary mt-2">{project.title}</h3>
                    <p className="text-text-secondary text-sm mt-3 leading-relaxed flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.technologies.slice(0, 3).map((t: string) => (
                        <span key={t} className="px-2 py-1 rounded-md bg-gray-100 text-xs font-medium text-text-secondary">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Client Testimonials ────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-white border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-bold text-sm tracking-wider uppercase">Testimonials</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-3">
                Loved by Tech Leaders & Founders
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t: any) => (
                <div
                  key={t.id}
                  className="bg-surface-card p-8 rounded-2xl border border-border"
                >
                  <p className="text-text-secondary italic leading-relaxed">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-primary/25 flex items-center justify-center font-bold text-primary">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary text-sm">{t.name}</h4>
                      <p className="text-text-secondary text-xs">{t.position}, {t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Call To Action Section ─────────────────────────── */}
      <section className="py-20 bg-gradient-primary text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Ready to Build Something Extraordinary?
          </h2>
          <p className="mt-4 text-white/80 text-lg max-w-2xl mx-auto">
            Get in touch for a comprehensive system audit or architectural consulting session. No commitments.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-white text-primary hover:bg-gray-100 font-semibold transition-all shadow-lg hover:-translate-y-0.5"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl border border-white/30 hover:bg-white/10 text-white font-semibold transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
