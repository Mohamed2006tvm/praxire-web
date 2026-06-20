import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin, FiInstagram, FiYoutube } from 'react-icons/fi';
import { contactsAPI } from '@/lib/api';
import SEO from '../components/SEO';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await contactsAPI.submit(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', companyName: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <SEO 
        title="Contact Us | IT Solutions & Consulting"
        description="Get in touch with Praxire Technologies. Speak to our software architects and web developers in Tiruvannamalai for custom ERP, CRM, websites, and mobile app design."
        keywords="Contact Praxire, IT Company in Tiruvannamalai, Software Company in Tiruvannamalai, Website Designers in Tiruvannamalai, App Development Company in Tiruvannamalai, Startup Tech Agency in Tiruvannamalai"
      />
      {/* Hero Section */}
      <section className="bg-surface-card py-20 border-b border-border text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold text-sm tracking-wider uppercase">Contact Us</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mt-4">
              Let's Build Something Together
            </h1>
            <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
              Have a project in mind or want to audit your IT infrastructure? Reach out to our solutions team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Card (Left) */}
          <div className="lg:col-span-5 bg-surface-card p-8 lg:p-10 rounded-2xl border border-border flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-6">Contact Information</h2>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Connect with our technology consulting group. We typically respond within one business day with a detailed project proposal.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary text-sm">Email Us</h4>
                    <a href="mailto:info@praxire.com" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium mt-1 block">
                      info@praxire.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FiPhone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary text-sm">Call Us</h4>
                    <a href="tel:+918072810080" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium mt-1 block">
                      +91 80728 10080
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FiMapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary text-sm">Our Location</h4>
                    <p className="text-text-secondary text-sm font-medium mt-1">
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="font-bold text-text-primary text-sm mb-4">Follow Us</h4>
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.linkedin.com/in/praxire?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all shadow-sm"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={18} />
                </a>
                <a 
                  href="https://www.instagram.com/praxire_official/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all shadow-sm"
                  aria-label="Instagram"
                >
                  <FiInstagram size={18} />
                </a>
                <a 
                  href="https://www.youtube.com/@Praxire_Official" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all shadow-sm"
                  aria-label="YouTube"
                >
                  <FiYoutube size={18} />
                </a>
              </div>
            </div>

            <div className="mt-12 border-t border-border pt-8">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Praxire Consulting</span>
              <p className="text-xs text-text-secondary mt-1">Transforming ideas into robust enterprise applications.</p>
            </div>
          </div>

          {/* Form Card (Right) */}
          <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-2xl border border-border shadow-xl shadow-black/5">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Send Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:border-primary text-sm transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:border-primary text-sm transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:border-primary text-sm transition-colors"
                    placeholder="+91 80728 10080"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:border-primary text-sm transition-colors"
                    placeholder="Example Corp"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:border-primary text-sm transition-colors resize-none"
                  placeholder="Tell us about your project requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
                <FiSend size={16} />
              </button>

              {status === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold text-center animate-pulse">
                  ✓ Message sent successfully! Our team will contact you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold text-center">
                  ✗ Failed to send message. Please try again or email us directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
