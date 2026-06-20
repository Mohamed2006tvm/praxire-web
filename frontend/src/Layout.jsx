import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { useLanguage } from './lib/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ChatWidget from './components/ChatWidget';

const backTooltip = {
  en: 'Go Back',
  ms: 'Kembali',
  sg: '返回',
  ta: 'பின்செல்',
};

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const showBackButton = pathname !== '/';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleBack = () => {
    // Safety check: if there is no browser history to go back to, navigate to home '/'
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col min-h-screen" lang={lang}>
      <Header />
      <main className={`flex-1 relative ${pathname === '/' ? 'pt-20 lg:pt-0' : 'pt-20'}`}>
        {/* Global Floating Back Button */}
        <AnimatePresence>
          {showBackButton && (
            <motion.button
              key="back-button"
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={handleBack}
              className="fixed left-4 md:left-8 top-24 z-40 flex items-center justify-center w-10 h-10 bg-white/95 backdrop-blur-sm border border-slate-200 shadow-md hover:shadow-lg rounded-full text-text-primary hover:text-primary transition-all group cursor-pointer"
              title={backTooltip[lang] || backTooltip.en}
              aria-label="Go Back"
            >
              <FiArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              
              {/* Dynamic Tooltip */}
              <span className="absolute left-12 scale-0 group-hover:scale-100 transition-all duration-150 origin-left bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-md whitespace-nowrap">
                {backTooltip[lang] || backTooltip.en}
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <ChatWidget />
    </div>
  );
}
