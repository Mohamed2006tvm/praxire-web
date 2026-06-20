'use client';

import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa';
import { newsletterAPI } from '@/lib/api';
import { useState } from 'react';

const footerLinks = {
  services: [
    { label: 'Website Development', href: '/services' },
    { label: 'Mobile App Development', href: '/services' },
    { label: 'AI Solutions', href: '/services' },
    { label: 'Cloud Services', href: '/services' },
    { label: 'Digital Marketing', href: '/services' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Internships', href: '/internships' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
};

const socialLinks = [
  { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaGithub, href: '#', label: 'GitHub' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribeStatus('loading');
    try {
      await newsletterAPI.subscribe(email);
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    } catch {
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-800">
      {/* Newsletter Section */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Stay Updated</h3>
              <p className="text-gray-600 mt-2">Get the latest tech insights and company updates delivered to your inbox.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 lg:w-80 px-5 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors shadow-sm"
                required
              />
              <button
                type="submit"
                disabled={subscribeStatus === 'loading'}
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold transition-all shadow-md shadow-primary/20 hover:shadow-primary/30 whitespace-nowrap disabled:opacity-50"
              >
                {subscribeStatus === 'loading' ? 'Subscribing...' : subscribeStatus === 'success' ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <img 
                src="/logo.png" 
                alt="Praxire Logo" 
                className="h-10 w-auto object-contain transition-transform hover:scale-105"
              />
            </Link>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-sm">
              Transforming businesses through innovative technology solutions. We deliver software, web, mobile, AI, and digital transformation services.
            </p>
            <div className="space-y-3">
              <a href="mailto:contact@praxire.com" className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors">
                <FiMail className="w-4 h-4" />
                <span className="text-sm font-medium">contact@praxire.com</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors">
                <FiPhone className="w-4 h-4" />
                <span className="text-sm font-medium">+91 98765 43210</span>
              </a>
              <div className="flex items-center gap-3 text-gray-600">
                <FiMapPin className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">India</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-900">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-600 hover:text-primary text-sm font-medium transition-colors flex items-center gap-1 group">
                    <FiArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-900">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-600 hover:text-primary text-sm font-medium transition-colors flex items-center gap-1 group">
                    <FiArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-900">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-600 hover:text-primary text-sm font-medium transition-colors flex items-center gap-1 group">
                    <FiArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-medium">
            © {new Date().getFullYear()} Praxire. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all shadow-sm"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
