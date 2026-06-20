import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGlobe, FiChevronDown, FiArrowRight, FiPhone } from 'react-icons/fi';
import { useLanguage } from '../lib/LanguageContext';

// Import original data
import { serviceCategories as originalCategories, allServices as originalServices } from '../data/servicesData';
// Import translations
import { serviceCategories as msCategories, allServices as msServices } from '../data/servicesData_ms';
import { serviceCategories as sgCategories, allServices as sgServices } from '../data/servicesData_sg';
import { serviceCategories as taCategories, allServices as taServices } from '../data/servicesData_ta';

export default function Header() {
  const { lang, setLang, t, languages } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isMobileCareersOpen, setIsMobileCareersOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const [hoveredServiceId, setHoveredServiceId] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const { pathname } = useLocation();
  const dropdownRef = useRef(null);

  // Select localized services data based on language state
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

  // Translate main navigation links
  const translatedNavLinks = [
    { href: '/services', label: t.nav.whatWeDo, hasDropdown: true, dropdownType: 'services' },
    { href: '/what-we-think', label: t.nav.whatWeThink, hasDropdown: false },
    { href: '/about', label: t.nav.aboutPraxire, hasDropdown: true, dropdownType: 'about' },
    { href: '/careers', label: t.nav.careers, hasDropdown: true, dropdownType: 'careers' },
    { href: '/contact', label: t.nav.contactUs, hasDropdown: false },
  ];

  // Translate about menu list items
  const translatedAboutItems = [
    { label: t.nav.aboutPraxireItem, desc: t.nav.aboutPraxireItemDesc, to: '/about' },
    { label: t.nav.aboutFounders, desc: t.nav.aboutFoundersDesc, to: '/about-founders' },
    { label: t.nav.portfolio, desc: t.nav.portfolioDesc, to: '/portfolio' },
  ];

  // Translate careers menu list items
  const translatedCareersItems = [
    { label: t.nav.currentOpenings, desc: t.nav.currentOpeningsDesc, to: '/careers' },
    { label: t.nav.internships, desc: t.nav.internshipsDesc, to: '/internships' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setIsMobileServicesOpen(false);
    setIsMobileAboutOpen(false);
    setIsMobileCareersOpen(false);
    setIsMobileLangOpen(false);
    setHoveredServiceId(null);
    setHoveredService(null);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter services by category for mega menu using current language data
  const getCategoryServices = (catId) => {
    return servicesData.filter((s) => s.category === catId).slice(0, 4);
  };

  const currentLangName = languages.find((l) => l.code === lang)?.label || 'EN';

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isTransparent = pathname === '/' && !isScrolled && activeDropdown === null && !isMobileMenuOpen && !isMobile;

  return (
    <header
      ref={dropdownRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent
          ? 'bg-gradient-to-b from-black/60 via-black/20 to-transparent border-transparent shadow-none'
          : 'bg-white/95 backdrop-blur-md ' + (isScrolled ? 'shadow-md shadow-black/5' : 'border-b border-gray-100')
        }`}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="h-8 w-8 overflow-hidden flex items-center justify-center shrink-0">
              <img
                src="/logo-symbol.png"
                alt="Praxire Logo Symbol"
                className="h-14 w-14 max-w-none object-contain transition-transform group-hover:scale-110"
              />
            </div>
            <span
              className={`text-2xl font-extrabold italic tracking-tight transition-colors duration-300 ${isTransparent
                  ? 'text-white group-hover:text-white/80'
                  : 'text-slate-900 group-hover:text-primary'
                }`}
              style={{ fontFamily: 'var(--font-logo), sans-serif' }}
            >
              Praxire
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 ml-10 gap-8">
            {translatedNavLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => {
                  if (link.hasDropdown) {
                    setActiveDropdown(link.dropdownType || null);
                  } else {
                    setActiveDropdown(null);
                  }
                }}
              >
                {link.hasDropdown ? (
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === link.dropdownType ? null : link.dropdownType || null)
                    }
                    className={`flex items-center gap-1 py-3 text-sm font-semibold transition-colors duration-200 ${activeDropdown === link.dropdownType || pathname.startsWith(link.href)
                        ? 'text-primary'
                        : isTransparent
                          ? 'text-white hover:text-white/80'
                          : 'text-gray-800 hover:text-primary'
                      }`}
                  >
                    {link.label}
                    <FiChevronDown
                      className={`mt-0.5 transition-transform duration-200 ${activeDropdown === link.dropdownType ? 'rotate-180' : ''
                        }`}
                      size={16}
                    />
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className={`flex items-center gap-1 py-3 text-sm font-semibold transition-colors duration-200 ${pathname === link.href
                        ? 'text-primary'
                        : isTransparent
                          ? 'text-white hover:text-white/80'
                          : 'text-gray-800 hover:text-primary'
                      }`}
                  >
                    {link.label}
                  </Link>
                )}

                {link.dropdownType === 'about' && (
                  <AnimatePresence>
                    {activeDropdown === 'about' && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-1 w-[680px] bg-white border border-border shadow-2xl rounded-2xl p-4 hidden lg:block z-40"
                        onMouseEnter={() => setActiveDropdown('about')}
                      >
                        <div className="grid grid-cols-3 gap-4">
                          {translatedAboutItems.map((item) => (
                            <Link
                              key={item.label}
                              to={item.to}
                              className="p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-border transition-all group text-left"
                            >
                              <h4 className="font-bold text-text-primary group-hover:text-primary transition-colors text-sm">
                                {item.label}
                              </h4>
                              <p className="text-xs text-text-secondary mt-1.5 leading-relaxed font-normal">
                                {item.desc}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {link.dropdownType === 'careers' && (
                  <AnimatePresence>
                    {activeDropdown === 'careers' && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-1 w-[460px] bg-white border border-border shadow-2xl rounded-2xl p-4 hidden lg:block z-40"
                        onMouseEnter={() => setActiveDropdown('careers')}
                      >
                        <div className="grid grid-cols-2 gap-4">
                          {translatedCareersItems.map((item) => (
                            <Link
                              key={item.label}
                              to={item.to}
                              className="p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-border transition-all group text-left"
                            >
                              <h4 className="font-bold text-text-primary group-hover:text-primary transition-colors text-sm">
                                {item.label}
                              </h4>
                              <p className="text-xs text-text-secondary mt-1.5 leading-relaxed font-normal">
                                {item.desc}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Desktop Language Selector Dropdown */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'language' ? null : 'language')}
                onMouseEnter={() => setActiveDropdown('language')}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors py-3 ${isTransparent ? 'text-white hover:text-white/80' : 'text-gray-800 hover:text-primary'
                  }`}
                aria-label="Select Language"
              >
                <FiGlobe size={18} />
                <span>{currentLangName}</span>
                <FiChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${activeDropdown === 'language' ? 'rotate-180' : ''
                    }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'language' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-1.5 z-50 overflow-hidden"
                    onMouseEnter={() => setActiveDropdown('language')}
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setActiveDropdown(null);
                        }}
                        className={`flex items-center justify-between w-full px-4 py-2.5 text-xs text-left transition-colors ${lang === l.code
                            ? 'text-primary bg-primary/5 font-bold'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                          }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm">{l.flag}</span>
                          <span>{l.name}</span>
                        </span>
                        {lang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold shadow-md shadow-primary/10 transition-all hover:-translate-y-0.5"
            >
              {t.nav.getProposal}
            </Link>

            {/* Mobile Call Button */}
            <a
              href="tel:+918072810080"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white shadow-md shadow-yellow-500/20 transition-all hover:scale-105 shrink-0"
              aria-label="Call Us"
            >
              <FiPhone size={16} className="fill-current" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-gray-100'
                }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mega Menus Dropdown Container */}
      <AnimatePresence>
        {activeDropdown === 'services' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 bg-white border-b border-border shadow-2xl overflow-hidden hidden lg:block z-40"
            onMouseEnter={() => setActiveDropdown('services')}
          >
            <div
              className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-12 gap-8"
              onMouseLeave={() => {
                setHoveredServiceId(null);
                setHoveredService(null);
              }}
            >
              {/* Left Side: Services lists grouped by category */}
              <div
                className="col-span-8 grid grid-cols-4 gap-6"
                onMouseLeave={() => {
                  setHoveredServiceId(null);
                  setHoveredService(null);
                }}
              >
                {categoriesData
                  .filter((cat) => cat.id !== 'all')
                  .map((category) => (
                    <div key={category.id} className="space-y-4">
                      <h4 className={`text-[10px] font-extrabold uppercase tracking-widest border-b pb-2 transition-colors duration-300 ${category.id === 'software-development' ? 'text-blue-500 border-blue-100' :
                          category.id === 'application-development' ? 'text-indigo-500 border-indigo-100' :
                            category.id === 'technology-services' ? 'text-purple-500 border-purple-100' :
                              'text-emerald-500 border-emerald-100'
                        }`}>
                        {category.label}
                      </h4>
                      <ul className="space-y-2">
                        {getCategoryServices(category.id).map((s) => (
                          <li key={s.id}>
                            <Link
                              to={`/services/${s.id}`}
                              onMouseEnter={() => {
                                setHoveredServiceId(s.id);
                                setHoveredService(s);
                              }}
                              className="relative block p-2.5 -ml-2 rounded-xl transition-all group"
                            >
                              {/* Hover background slide */}
                              {hoveredServiceId === s.id && (
                                <motion.div
                                  layoutId="megaMenuHoverBg"
                                  className="absolute inset-0 bg-slate-50/80 border border-slate-100/30 rounded-xl z-0"
                                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                              )}

                              <div className="relative z-10 flex items-start gap-2.5">
                                <div className={`mt-0.5 shrink-0 transition-all group-hover:scale-110 group-hover:rotate-3 duration-200 ${hoveredServiceId === s.id
                                    ? (s.category === 'software-development' ? 'text-blue-500' :
                                      s.category === 'application-development' ? 'text-indigo-500' :
                                        s.category === 'technology-services' ? 'text-purple-500' :
                                          'text-emerald-500')
                                    : 'text-gray-400 group-hover:text-primary'
                                  }`}>
                                  <s.icon size={15} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="text-xs font-extrabold text-text-primary group-hover:text-primary transition-colors duration-200 truncate">
                                    {s.title}
                                  </span>
                                  <p className="text-[10px] text-text-secondary line-clamp-1 mt-0.5">
                                    {s.description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>

              {/* Right Side: Interactive Preview or Featured Highlight */}
              <div className="col-span-4 h-[340px]">
                <AnimatePresence mode="wait">
                  {hoveredService ? (
                    <motion.div
                      key={hoveredService.id}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.15 }}
                      className="bg-slate-50/70 border border-slate-100 rounded-2xl p-6 h-full flex flex-col justify-between shadow-inner relative overflow-hidden group"
                    >
                      {/* Decorative colored glow background based on category */}
                      <div className={`absolute -right-20 -top-20 w-40 h-40 rounded-full blur-3xl opacity-25 transition-colors duration-300 ${hoveredService.category === 'software-development' ? 'bg-blue-400' :
                          hoveredService.category === 'application-development' ? 'bg-indigo-400' :
                            hoveredService.category === 'technology-services' ? 'bg-purple-400' :
                              'bg-emerald-400'
                        }`} />

                      <div className="relative z-10 space-y-4">
                        {/* Category and Icon */}
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${hoveredService.category === 'software-development' ? 'text-blue-600 bg-blue-50/80 border-blue-100' :
                              hoveredService.category === 'application-development' ? 'text-indigo-600 bg-indigo-50/80 border-indigo-100' :
                                hoveredService.category === 'technology-services' ? 'text-purple-600 bg-purple-50/80 border-purple-100' :
                                  'text-emerald-600 bg-emerald-50/80 border-emerald-100'
                            }`}>
                            {
                              categoriesData.find(cat => cat.id === hoveredService.category)?.label || hoveredService.category
                            }
                          </span>

                          <div className={`p-2 rounded-xl text-white shadow-md ${hoveredService.category === 'software-development' ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/10' :
                              hoveredService.category === 'application-development' ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-indigo-500/10' :
                                hoveredService.category === 'technology-services' ? 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-purple-500/10' :
                                  'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/10'
                            }`}>
                            <hoveredService.icon size={18} />
                          </div>
                        </div>

                        {/* Title and description */}
                        <div>
                          <h4 className="font-extrabold text-text-primary text-base leading-snug">
                            {hoveredService.title}
                          </h4>
                          <p className="text-xs text-text-secondary mt-2 leading-relaxed line-clamp-3">
                            {hoveredService.description}
                          </p>
                        </div>

                        {/* Capabilities / Features */}
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block">
                            {
                              lang === 'en' ? 'Key Capabilities' :
                                lang === 'ms' ? 'Keupayaan Utama' :
                                  lang === 'sg' ? '核心能力' :
                                    'முக்கிய திறன்கள்'
                            }
                          </span>
                          <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                            {hoveredService.features.map((feature, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                className="flex items-center gap-1.5 text-xs text-text-secondary font-medium"
                              >
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${hoveredService.category === 'software-development' ? 'bg-blue-500' :
                                    hoveredService.category === 'application-development' ? 'bg-indigo-500' :
                                      hoveredService.category === 'technology-services' ? 'bg-purple-500' :
                                        'bg-emerald-500'
                                  }`} />
                                <span className="truncate">{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Call to Action */}
                      <div className="relative z-10 pt-4 border-t border-slate-100 mt-2">
                        <Link
                          to={`/services/${hoveredService.id}`}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 duration-200 ${hoveredService.category === 'software-development' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/10' :
                              hoveredService.category === 'application-development' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/10' :
                                hoveredService.category === 'technology-services' ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/10' :
                                  'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/10'
                            }`}
                        >
                          <span>
                            {
                              lang === 'en' ? 'Explore Service Details' :
                                lang === 'ms' ? 'Terokai Butiran Perkhidmatan' :
                                  lang === 'sg' ? '探索服务详情' :
                                    'சேவை விவரங்களை ஆராயுங்கள்'
                            }
                          </span>
                          <FiArrowRight />
                        </Link>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default-highlight"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                      className="bg-gradient-to-br from-slate-50 to-blue-50/20 rounded-2xl p-6 border border-border/80 h-full flex flex-col justify-between relative overflow-hidden"
                    >
                      {/* Grid background pattern */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:14px_24px]" />

                      <div className="relative z-10">
                        <span className="text-primary text-[10px] font-extrabold uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-full">
                          {t.nav.featureHighlight}
                        </span>
                        <h4 className="font-bold text-text-primary text-base mt-4 flex items-center gap-2">
                          <span className="text-lg">🇲🇾</span> {t.nav.malaysianPartnerships}
                        </h4>
                        <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                          {t.nav.malaysianPartnershipsDesc}
                        </p>

                        {/* Active indicator */}
                        <div className="mt-4 p-3 bg-white/70 backdrop-blur-sm border border-slate-100/60 rounded-xl space-y-1.5 shadow-sm">
                          <div className="flex items-center gap-2 text-xs text-text-primary font-bold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Active Cross-Border Delivery</span>
                          </div>
                          <p className="text-[10px] text-text-secondary leading-relaxed">
                            Serving regional leaders with unified developer squads based in Malaysia & India.
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 pt-4 mt-2">
                        <Link
                          to="/services"
                          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-primary border border-primary/20 hover:border-primary/40 flex items-center justify-center gap-2 shadow-sm transition-all hover:-translate-y-0.5 duration-200"
                        >
                          <span>{t.nav.viewAllServices}</span>
                          <FiArrowRight />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-y-auto max-h-[85vh] shadow-lg shadow-black/5"
          >
            <div className="px-4 py-4 space-y-2">
              {translatedNavLinks.map((link) => (
                <div key={link.href} className="space-y-1">
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => {
                          if (link.dropdownType === 'services') {
                            setIsMobileServicesOpen(!isMobileServicesOpen);
                          } else if (link.dropdownType === 'about') {
                            setIsMobileAboutOpen(!isMobileAboutOpen);
                          } else {
                            setIsMobileCareersOpen(!isMobileCareersOpen);
                          }
                        }}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-bold text-gray-800 hover:text-primary hover:bg-gray-50 transition-colors"
                      >
                        <span>{link.label}</span>
                        <FiChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${(link.dropdownType === 'services' && isMobileServicesOpen) ||
                              (link.dropdownType === 'about' && isMobileAboutOpen) ||
                              (link.dropdownType === 'careers' && isMobileCareersOpen)
                              ? 'rotate-180'
                              : ''
                            }`}
                        />
                      </button>

                      {/* Dropdown Content */}
                      <AnimatePresence>
                        {link.dropdownType === 'services' && isMobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-6 pr-2 space-y-1 overflow-hidden"
                          >
                            {categoriesData
                              .filter((c) => c.id !== 'all')
                              .map((cat) => (
                                <div key={cat.id} className="pt-2 pb-1">
                                  <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">
                                    {cat.label}
                                  </div>
                                  <div className="space-y-1">
                                    {getCategoryServices(cat.id).map((s) => (
                                      <Link
                                        key={s.id}
                                        to={`/services/${s.id}`}
                                        className="block px-3 py-2 rounded-lg text-xs font-semibold text-text-primary hover:text-primary hover:bg-gray-50"
                                      >
                                        {s.title}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            <Link
                              to="/services"
                              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-primary hover:text-primary-dark mt-2"
                            >
                              {t.nav.viewAllServicesLink} <FiArrowRight />
                            </Link>
                          </motion.div>
                        )}

                        {link.dropdownType === 'about' && isMobileAboutOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-6 pr-2 space-y-1 overflow-hidden"
                          >
                            <Link
                              to="/about"
                              className="block px-3 py-2.5 rounded-lg text-xs font-semibold text-text-primary hover:text-primary hover:bg-gray-50"
                            >
                              {t.nav.aboutPraxireItem}
                            </Link>
                            <Link
                              to="/about-founders"
                              className="block px-3 py-2.5 rounded-lg text-xs font-semibold text-text-primary hover:text-primary hover:bg-gray-50"
                            >
                              {t.nav.aboutFounders}
                            </Link>
                            <Link
                              to="/portfolio"
                              className="block px-3 py-2.5 rounded-lg text-xs font-semibold text-text-primary hover:text-primary hover:bg-gray-50"
                            >
                              {t.nav.portfolio}
                            </Link>
                          </motion.div>
                        )}

                        {link.dropdownType === 'careers' && isMobileCareersOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-6 pr-2 space-y-1 overflow-hidden"
                          >
                            <Link
                              to="/careers"
                              className="block px-3 py-2.5 rounded-lg text-xs font-semibold text-text-primary hover:text-primary hover:bg-gray-50"
                            >
                              {t.nav.currentOpenings}
                            </Link>
                            <Link
                              to="/internships"
                              className="block px-3 py-2.5 rounded-lg text-xs font-semibold text-text-primary hover:text-primary hover:bg-gray-50"
                            >
                              {t.nav.internships}
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      className={`block px-4 py-3 rounded-lg text-sm font-bold transition-colors ${pathname === link.href
                          ? 'text-primary bg-primary/5'
                          : 'text-gray-800 hover:text-primary hover:bg-gray-50'
                        }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Language Selector Toggle */}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-bold text-gray-800 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FiGlobe size={18} />
                    <span>
                      {t.nav.language} ({languages.find((l) => l.code === lang)?.label})
                    </span>
                  </div>
                  <FiChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isMobileLangOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {isMobileLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-6 pr-2 space-y-1 overflow-hidden"
                    >
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => {
                            setLang(l.code);
                            setIsMobileLangOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-xs font-semibold ${lang === l.code
                              ? 'text-primary bg-primary/5'
                              : 'text-text-primary hover:text-primary hover:bg-gray-50'
                            }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-sm">{l.flag}</span>
                            <span>{l.name}</span>
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
