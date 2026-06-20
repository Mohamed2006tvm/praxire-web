import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle, FiSearch, FiMessageSquare, FiX, FiSend, FiCheckCircle, FiLoader } from 'react-icons/fi';
import { useLanguage } from '../lib/LanguageContext';
import { contactsAPI } from '../lib/api';

export default function FAQ() {
  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, loading, success, error

  // Access the localized FAQ translations from home
  const faqData = t.home.faq;

  // Filter items based on search query
  const filteredItems = faqData.items.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    try {
      await contactsAPI.submit({ ...formData, type: 'faq' });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', companyName: '', message: '' });
    } catch (_err) {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Header */}
      <section className="bg-white py-16 border-b border-border text-center relative overflow-hidden">
        {/* Soft background accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-bold text-xs tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">
              {faqData.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-text-primary mt-4 tracking-tight">
              {faqData.title}
            </h1>
            <p className="mt-4 text-text-secondary text-base max-w-2xl mx-auto">
              {faqData.subtitle}
            </p>
          </motion.div>

          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-md mx-auto mt-8 relative"
          >
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 shadow-sm transition-all text-sm"
            />
          </motion.div>
        </div>
      </section>

      {/* Accordion Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {filteredItems.length > 0 ? (
          <div className="space-y-4">
            {filteredItems.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-6 font-bold text-base md:text-lg text-text-primary flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <FiHelpCircle className="text-primary shrink-0" size={20} />
                      <span>{item.q}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-slate-400 shrink-0"
                    >
                      <FiChevronDown size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="p-6 pt-0 text-text-secondary text-sm md:text-base leading-relaxed bg-slate-50/30 border-t border-slate-100">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/60 shadow-sm p-8">
            <p className="text-text-secondary font-medium text-base">
              No matching questions found for "{searchQuery}".
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Try using different terms or contact us directly.
            </p>
          </div>
        )}

        {/* Contact Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-blue-500/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_50%)]" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <FiMessageSquare size={22} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Still have questions?</h3>
              <p className="text-white/80 text-sm mt-0.5">We are here to help you turn your ideas into products.</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSubmitStatus('idle');
              setIsModalOpen(true);
            }}
            className="relative z-10 px-6 py-3 bg-white text-blue-700 hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] font-bold rounded-xl shadow-md transition-all text-sm uppercase tracking-wider whitespace-nowrap cursor-pointer"
          >
            Get In Touch
          </button>
        </div>
      </main>

      {/* Inquiry Form Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Modal Card Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative bg-white/95 backdrop-blur-xl w-full max-w-lg rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.12)] border border-slate-200/50 overflow-hidden z-10"
            >
              {/* Soft ambient background glows within the modal */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="p-8 relative z-10">
                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <FiX size={20} />
                </button>

                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
                      <FiCheckCircle size={36} className="stroke-[2.5]" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">Message Sent!</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you for reaching out. A solutions architect from our team will contact you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
                    >
                      Close Window
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-2xl font-black text-slate-900 pr-10">Get in Touch</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Ask your question, and we'll reply directly to your email inbox.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      {/* Name & Email in Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-slate-800 placeholder-slate-400/80"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-slate-800 placeholder-slate-400/80"
                          />
                        </div>
                      </div>

                      {/* Phone & Company */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-slate-800 placeholder-slate-400/80"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                            Company Name
                          </label>
                          <input
                            type="text"
                            placeholder="Acme Corp"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-slate-800 placeholder-slate-400/80"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          How can we help? *
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Please describe your question or inquiry in detail..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50/80 focus:bg-white text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-slate-800 placeholder-slate-400/80 resize-none"
                        />
                      </div>

                      {submitStatus === 'error' && (
                        <p className="text-red-500 text-xs font-medium text-center">
                          Failed to send inquiry. Please check your network or try again.
                        </p>
                      )}

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={submitStatus === 'loading'}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.01] active:scale-[0.99] disabled:bg-slate-300 disabled:scale-100 text-white font-bold rounded-2xl text-sm shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {submitStatus === 'loading' ? (
                          <>
                            <FiLoader className="animate-spin" size={16} />
                            Sending...
                          </>
                        ) : (
                          <>
                            <FiSend size={16} />
                            Submit Inquiry
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
