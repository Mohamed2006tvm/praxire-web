import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiMail, FiLinkedin, FiCompass } from 'react-icons/fi';
import { useLanguage } from '../lib/LanguageContext';
import SEO from '../components/SEO';

const foundersList = [
  { 
    name: 'Vishal G', 
    role: 'CEO', 
    initials: 'VG',
    image: '/images/founders/vishal-g-ceo-praxire.png',
    bioKey: 'vishalBio',
    linkedin: 'https://www.linkedin.com/in/vishal-g-a61943301',
    email: 'g.vishal1608@gmail.com'
  },
  { 
    name: 'Mohamed M', 
    role: 'Co-Founder', 
    initials: 'MM',
    image: '/images/founders/mohamed-m-co-founder-praxire.png',
    bioKey: 'mohamedBio',
    linkedin: 'https://www.linkedin.com/in/mohamed-m-719176328?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    email: 'mohamed2006tvm@gmail.com'
  },
];

export default function AboutFounders() {
  const { t } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(null);

  const handleEmailClick = (e, email) => {
    // Attempt to copy the email to clipboard as a backup/shortcut
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2500);
    }).catch((err) => {
      console.error("Failed to copy email: ", err);
    });
  };

  return (
    <div className="bg-white min-h-screen text-text-primary">
      <SEO 
        title="Praxire Leadership | Vishal G, CEO & Mohamed M, Co-Founder"
        description="Meet the visionary leadership team behind Praxire. Vishal G (CEO) and Mohamed M (Co-Founder) guide the architectural standards and client solution engineering at our software company in Tiruvannamalai."
        keywords="Praxire Leadership, Vishal G CEO, Mohamed M Co-Founder, Software Company in Tiruvannamalai, IT Company in Tiruvannamalai, Web Development Company in Tiruvannamalai, Startup Technology Partner"
        image={[
          "/images/founders/mohamed-m-co-founder-praxire.png",
          "/images/founders/vishal-g-ceo-praxire.png"
        ]}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "Praxire Leadership | Vishal G, CEO & Mohamed M, Co-Founder",
          "description": "Meet the visionary leadership team behind Praxire. Vishal G (CEO) and Mohamed M (Co-Founder) guide the architectural standards and client solution engineering at our software company in Tiruvannamalai.",
          "mainEntity": [
            {
              "@type": "Person",
              "name": "Vishal G",
              "jobTitle": "CEO",
              "worksFor": {
                "@type": "Organization",
                "name": "Praxire",
                "url": "https://praxire.com"
              },
              "image": "https://praxire.com/images/founders/vishal-g-ceo-praxire.png",
              "sameAs": "https://www.linkedin.com/in/vishal-g-a61943301"
            },
            {
              "@type": "Person",
              "name": "Mohamed M",
              "jobTitle": "Co-Founder",
              "worksFor": {
                "@type": "Organization",
                "name": "Praxire",
                "url": "https://praxire.com"
              },
              "image": "https://praxire.com/images/founders/mohamed-m-co-founder-praxire.png",
              "sameAs": "https://www.linkedin.com/in/mohamed-m-719176328?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            }
          ]
        })}
      </script>
      {/* ─── Hero Header ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 py-24 text-white border-b border-gray-800">
        <div className="absolute inset-0 bg-[grid-linear-gradient] opacity-10 pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-primary/20 text-primary mb-6">
              {t.about.hero.badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight text-white">
              {t.about.leadership.title}
            </h1>
            <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {t.about.leadership.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Profiles Section ──────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {foundersList.map((f, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-surface-card p-8 md:p-10 rounded-3xl border border-border shadow-sm flex flex-col justify-between card-hover relative overflow-hidden"
              itemScope
              itemType="https://schema.org/Person"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-accent" />
              <div>
                <div className="flex items-center gap-6 mb-8">
                  {f.image ? (
                    <img 
                      src={f.image} 
                      alt={`${f.name} - ${f.role} of Praxire, Software and Web Development Company in Tiruvannamalai`} 
                      className="w-20 h-20 rounded-full object-cover shadow-inner shrink-0 border border-border"
                      itemProp="image"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center font-bold text-3xl text-primary shadow-inner shrink-0">
                      {f.initials}
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary" itemProp="name">{f.name}</h2>
                    <p className="text-primary text-sm font-semibold mt-1" itemProp="jobTitle">{f.role}</p>
                    <meta itemProp="worksFor" content="Praxire" />
                  </div>
                </div>
                
                <p className="text-text-secondary leading-relaxed text-base" itemProp="description">
                  {t.about.leadership[f.bioKey]}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex items-center gap-4">
                <a 
                  href={f.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all shadow-sm"
                  aria-label="LinkedIn Profile"
                >
                  <FiLinkedin size={18} />
                </a>
                <div className="relative">
                  <a 
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${f.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handleEmailClick(e, f.email)}
                    className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all shadow-sm cursor-pointer"
                    aria-label="Send Email"
                  >
                    <FiMail size={18} />
                  </a>
                  {copiedEmail === f.email && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap z-30"
                    >
                      Copied to clipboard!
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Leadership Vision Section ────────────────────── */}
      <section className="py-20 bg-surface-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 text-primary opacity-5 pointer-events-none">
              <FiCompass size={300} />
            </div>
            
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <FiCompass size={28} />
              </div>
              <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">
                {t.about.leadership.visionTitle}
              </h2>
            </div>
            
            <div className="lg:col-span-8">
              <p className="text-text-secondary text-lg leading-relaxed italic border-l-4 border-primary pl-6 py-2">
                "{t.about.leadership.visionText}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ───────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 rounded-3xl p-6 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[grid-linear-gradient] opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
              {t.about.closing.text}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-bold shadow-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto text-sm md:text-base text-center"
            >
              {t.about.closing.cta}
              <FiChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
