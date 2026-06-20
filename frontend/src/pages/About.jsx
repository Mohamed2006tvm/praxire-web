import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiTarget, 
  FiEye, 
  FiAward, 
  FiGlobe, 
  FiSmartphone, 
  FiCpu, 
  FiLayers, 
  FiFeather, 
  FiZap, 
  FiHeart, 
  FiTrendingUp, 
  FiActivity, 
  FiMessageCircle,
  FiChevronRight
} from 'react-icons/fi';
import { useLanguage } from '../lib/LanguageContext';
import SEO from '../components/SEO';

export default function About() {
  const { t } = useLanguage();

  const serviceIcons = [FiGlobe, FiSmartphone, FiCpu, FiLayers, FiFeather, FiZap];
  const services = t.about.whatWeDo.services.map((s, idx) => ({
    icon: serviceIcons[idx] || FiCpu,
    title: s.title,
    desc: s.desc,
  }));

  const whyUsIcons = [FiHeart, FiTrendingUp, FiActivity, FiMessageCircle, FiAward];
  const whyUsItems = t.about.whyUs.items.map((w, idx) => ({
    icon: whyUsIcons[idx] || FiAward,
    title: w.title,
    desc: w.desc,
  }));

  return (
    <div className="bg-white min-h-screen text-text-primary">
      <SEO 
        title="About Us | Software & IT Company in Tiruvannamalai"
        description="Learn about Praxire, the top software company in Tiruvannamalai, Tamil Nadu. Discover our mission, core values, and our custom web and mobile app development engineering process."
        keywords="About Praxire, Software Company in Tiruvannamalai, IT Company in Tiruvannamalai, Web Development Company in Tiruvannamalai, Startup Tech Agency in Tiruvannamalai, IT Company in Tamil Nadu, Startup Technology Partner"
      />
      {/* ─── Hero Header ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 border-b border-border">
        <div className="absolute inset-0 bg-[grid-linear-gradient] opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-primary/10 text-primary mb-6">
              {t.about.hero.badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-text-primary tracking-tight max-w-4xl mx-auto leading-tight">
              {t.about.hero.title}
            </h1>
            <p className="mt-6 text-text-secondary text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {t.about.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Introduction & Story ──────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-extrabold text-text-primary flex items-center gap-2">
              <span className="w-1.5 h-8 bg-primary rounded-full inline-block" />
              {t.about.intro.title}
            </h2>
            <p className="text-text-secondary leading-relaxed text-base md:text-lg">
              {t.about.intro.text1}
            </p>
            <p className="text-text-secondary leading-relaxed text-base">
              {t.about.intro.text2}
            </p>
          </div>
          <div className="lg:col-span-6 space-y-6 bg-surface-card p-8 rounded-3xl border border-border shadow-sm relative">
            <div className="absolute top-4 right-4 text-primary opacity-10">
              <FiCpu size={120} />
            </div>
            <h2 className="text-3xl font-extrabold text-text-primary flex items-center gap-2">
              <span className="w-1.5 h-8 bg-accent rounded-full inline-block" />
              {t.about.story.title}
            </h2>
            <p className="text-text-secondary leading-relaxed text-base md:text-lg relative z-10">
              {t.about.story.text1}
            </p>
            <p className="text-text-secondary leading-relaxed text-base relative z-10">
              {t.about.story.text2}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ──────────────────────────────── */}
      <section className="py-16 bg-surface-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Mission Card */}
            <div className="bg-white p-8 rounded-3xl border border-border flex flex-col md:flex-row gap-6 card-hover shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 self-start">
                <FiTarget size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-primary">{t.about.mission.title}</h3>
                <p className="mt-4 text-text-secondary leading-relaxed text-base">
                  {t.about.mission.text}
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 rounded-3xl border border-border flex flex-col md:flex-row gap-6 card-hover shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0 self-start">
                <FiEye size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-primary">{t.about.vision.title}</h3>
                <p className="mt-4 text-text-secondary leading-relaxed text-base">
                  {t.about.vision.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Specializations (What We Do) ─────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">
            {t.about.whatWeDo.title}
          </h2>
          <p className="mt-4 text-text-secondary text-base md:text-lg">
            {t.about.whatWeDo.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-surface-card p-8 rounded-3xl border border-border card-hover shadow-sm flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 shrink-0">
                <service.icon size={22} />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">{service.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed flex-grow">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Why Praxire ───────────────────────────────────── */}
      <section className="py-20 bg-surface-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">
              {t.about.whyUs.title}
            </h2>
            <p className="mt-4 text-text-secondary text-base md:text-lg">
              {t.about.whyUs.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUsItems.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-border card-hover shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 shrink-0">
                    <item.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-3">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─── Closing Section & CTA ─────────────────────────── */}
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
