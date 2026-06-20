'use client';

import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiCheck, FiUsers, FiAward } from 'react-icons/fi';

const values = [
  { icon: FiAward, title: 'Innovation', desc: 'Constantly testing new architectures, AI algorithms, and frontend layouts.' },
  { icon: FiCheck, title: 'Integrity', desc: '100% transparency in deployment steps, sprint progress, and code delivery.' },
  { icon: FiTarget, title: 'Excellence', desc: 'Crafting pixel-perfect designs and robust server logic with strict testing coverage.' },
  { icon: FiUsers, title: 'Customer Success', desc: 'We align directly with customer key metrics to drive high-performance results.' },
];

const founders = [
  { name: 'Vishal G', role: 'Co-Founder & CEO', initials: 'VG' },
  { name: 'Mohamed M', role: 'Co-Founder & CTO', initials: 'MM' },
];

const timeline = [
  { year: '2023', title: 'The Genesis', desc: 'Praxire was founded to bridge the gap between startup agility and enterprise reliability.' },
  { year: '2024', title: 'Global Delivery', desc: 'Scaled operations to deliver cross-border custom software applications and cloud support.' },
  { year: '2025', title: 'AI Automation Integration', desc: 'Established a dedicated AI/ML engineering division focusing on predictive algorithms.' },
  { year: '2026', title: 'The Next Level', desc: 'Providing full-suite software solutions, custom web, mobile, and digital transformation.' },
];

export default function About() {
  return (
    <div className="py-12 bg-white">
      {/* ─── Hero Header ───────────────────────────────────── */}
      <section className="bg-surface-card py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold text-sm tracking-wider uppercase">Our Identity</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mt-3">
              About Praxire
            </h1>
            <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
              We are a team of software engineers, architects, designers, and growth experts committed to transforming digital landscapes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Mission & Vision ──────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission Card */}
          <div className="bg-surface-card p-8 rounded-2xl border border-border flex gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <FiTarget size={26} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Our Mission</h2>
              <p className="mt-4 text-text-secondary leading-relaxed text-base">
                &ldquo;Helping businesses grow through innovative digital solutions.&rdquo;
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-surface-card p-8 rounded-2xl border border-border flex gap-6">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
              <FiEye size={26} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Our Vision</h2>
              <p className="mt-4 text-text-secondary leading-relaxed text-base">
                &ldquo;To become a globally recognized technology company.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Company Values ────────────────────────────────── */}
      <section className="py-20 bg-surface-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-text-primary">Core Values</h2>
            <p className="mt-4 text-text-secondary">
              These values represent the foundation of our engineering principles and company culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {values.map((v, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-border card-hover">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <v.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-text-primary">{v.title}</h3>
                <p className="mt-3 text-text-secondary text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Founders Section ──────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-text-primary">Leadership Team</h2>
          <p className="mt-4 text-text-secondary">
            Our co-founders lead with a technology-first approach and extensive corporate engineering background.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {founders.map((f, idx) => (
            <div key={idx} className="bg-surface-card p-8 rounded-2xl border border-border text-center flex flex-col items-center card-hover">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center font-bold text-2xl text-primary mb-6">
                {f.initials}
              </div>
              <h3 className="text-xl font-bold text-text-primary">{f.name}</h3>
              <p className="text-text-secondary text-sm mt-1">{f.role}</p>
              <p className="mt-4 text-text-secondary text-sm leading-relaxed">
                Dedicated to scaling Praxire client solutions while establishing high architectural standards.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Company Timeline ──────────────────────────────── */}
      <section className="py-24 bg-surface-card border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-text-primary text-center mb-16">Our Journey</h2>
          
          <div className="relative border-l-2 border-primary/30 ml-4 md:ml-32 space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12">
                {/* Year tag left aligned on desktop */}
                <div className="hidden md:block absolute -left-32 top-1 font-bold text-primary text-xl">
                  {item.year}
                </div>
                {/* Timeline node dot */}
                <div className="absolute -left-2 top-2 w-4 h-4 rounded-full bg-primary border-4 border-white" />
                
                <div>
                  <span className="inline-block md:hidden font-bold text-primary text-sm mb-1">{item.year}</span>
                  <h3 className="text-xl font-bold text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-text-secondary text-sm leading-relaxed max-w-xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
