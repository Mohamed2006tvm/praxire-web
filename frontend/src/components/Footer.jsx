import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useLanguage } from '../lib/LanguageContext';

const footerLinks = {
  services: [
    { label: 'Custom Software', href: '/services' },
    { label: 'Mobile App Development', href: '/services' },
    { label: 'SaaS Development', href: '/services' },
    { label: 'UX/UI Design', href: '/services' },
    { label: 'QA & Testing', href: '/services' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Internships', href: '/internships' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'What We Think', href: '/what-we-think' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'FAQ', href: '/faq' },
  ],
};

const socialLinks = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/praxire?utm_source=share_via&utm_content=profile&utm_medium=member_android', label: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://www.instagram.com/praxire_official/', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://www.youtube.com/@Praxire_Official', label: 'YouTube' },
];

export default function Footer() {
  const { t } = useLanguage();

  const translatedFooterLinks = {
    services: footerLinks.services.map((link, idx) => ({
      ...link,
      label: t.footer.links.services[idx] || link.label,
    })),
    company: footerLinks.company.map((link, idx) => ({
      ...link,
      label: t.footer.links.company[idx] || link.label,
    })),
    support: footerLinks.support.map((link, idx) => ({
      ...link,
      label: t.footer.links.support[idx] || link.label,
    })),
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-800">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="h-8 w-8 overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src="/logo-symbol.png"
                  alt="Praxire Logo Symbol"
                  className="h-14 w-14 max-w-none object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <span
                className="text-2xl font-extrabold italic tracking-tight text-slate-900 group-hover:text-primary transition-colors duration-300"
                style={{ fontFamily: 'var(--font-logo), sans-serif' }}
              >
                Praxire
              </span>
            </Link>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-sm">
              {t.footer.brand}
            </p>
            <div className="space-y-3">
              <a href="mailto:info@praxire.com" className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors">
                <FiMail className="w-4 h-4" />
                <span className="text-sm font-medium">info@praxire.com</span>
              </a>
              <a href="tel:+918072810080" className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors">
                <FiPhone className="w-4 h-4" />
                <span className="text-sm font-medium">+91 80728 10080</span>
              </a>
              <div className="flex items-center gap-3 text-gray-600">
                <FiMapPin className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">India</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-900">{t.footer.services}</h4>
            <ul className="space-y-3">
              {translatedFooterLinks.services.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-600 hover:text-primary text-sm font-medium transition-colors flex items-center gap-1 group">
                    <FiArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-900">{t.footer.company}</h4>
            <ul className="space-y-3">
              {translatedFooterLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-600 hover:text-primary text-sm font-medium transition-colors flex items-center gap-1 group">
                    <FiArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-900">{t.footer.support}</h4>
            <ul className="space-y-3">
              {translatedFooterLinks.support.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-gray-600 hover:text-primary text-sm font-medium transition-colors flex items-center gap-1 group">
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
            © {new Date().getFullYear()} Praxire. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
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
