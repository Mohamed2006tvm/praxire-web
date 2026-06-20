import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBookOpen, FiClock, FiCalendar, FiChevronRight } from 'react-icons/fi';
import { internshipsAPI } from '@/lib/api';
import { useLanguage } from '../lib/LanguageContext';
import SEO from '../components/SEO';

export default function Internships() {
  const { t } = useLanguage();
  const [internships, setInternships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    internshipsAPI.getAll()
      .then((res) => {
        setInternships(res.data.roles || []);
      })
      .catch((_err) => {
        // Silently handle — fallback to empty list
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="bg-white min-h-screen pb-24">
      <SEO 
        title="Student Internships | Tech Training & Mentorship"
        description="Apply for software engineering and web development internships at Praxire. Gain hands-on experience and mentorship in Tiruvannamalai, Tamil Nadu."
        keywords="Praxire Internships, Student Internships Tiruvannamalai, IT Internships Tamil Nadu, Software Development Internships, Startup Tech Internships"
      />
      {/* Hero Header */}
      <section className="bg-surface-card py-20 border-b border-border text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold text-sm tracking-wider uppercase">{t.internships.hero.badge}</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mt-4">
              {t.internships.hero.title}
            </h1>
            <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
              {t.internships.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Internships List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-2xl font-bold text-text-primary mb-8">{t.internships.available}</h2>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="spinner"></div>
          </div>
        ) : internships.length > 0 ? (
          <div className="space-y-6">
            {internships.map((role) => (
              <div
                key={role.id}
                className="bg-white p-6 rounded-2xl border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6 card-hover"
              >
                <div>
                  <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                    <FiBookOpen className="text-primary" />
                    {role.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-text-secondary font-medium">
                    <span className="flex items-center gap-1"><FiCalendar /> {role.duration}</span>
                    <span className="flex items-center gap-1"><FiClock /> {t.internships.remoteFlexible}</span>
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">{role.department}</span>
                  </div>
                </div>
                <Link
                  to={`/apply/internship/${role.id}`}
                  className="px-5 py-2.5 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-semibold transition-all flex items-center gap-1 text-center justify-center whitespace-nowrap"
                >
                  {t.internships.applyNow}
                  <FiChevronRight />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface-card rounded-2xl border border-border">
            <p className="text-text-secondary font-medium">{t.internships.noRoles}</p>
          </div>
        )}
      </section>
    </div>
  );
}
