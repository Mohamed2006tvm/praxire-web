'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';

const navLinks = [
  { href: '/services', label: 'What We Do', hasDropdown: true },
  { href: '/blog', label: 'What We Think', hasDropdown: false },
  { href: '/about', label: 'About Praxire', hasDropdown: true },
  { href: '/careers', label: 'Careers', hasDropdown: false },
  { href: '/contact', label: 'Contact Us', hasDropdown: false },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-md shadow-black/5' : 'border-b border-gray-100'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img 
              src="/logo.png" 
              alt="Praxire Logo" 
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 ml-10 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1 py-2 text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-gray-800 hover:text-primary'
                }`}
              >
                {link.label}
                {link.hasDropdown && <FiChevronDown className="mt-0.5" size={16} />}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <button
              className="hidden lg:flex items-center gap-1.5 text-gray-800 hover:text-primary text-sm font-medium transition-colors"
              aria-label="Select Language"
            >
              <FiGlobe size={18} />
              <span>EN</span>
              <FiChevronDown size={16} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg shadow-black/5"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-800 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                  {link.hasDropdown && <FiChevronDown size={16} />}
                </Link>
              ))}
              
              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-800 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FiGlobe size={18} />
                    <span>Language (EN)</span>
                  </div>
                  <FiChevronDown size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
