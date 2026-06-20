'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FiMonitor,
  FiShoppingCart,
  FiSmartphone,
  FiCode,
  FiCpu,
  FiLayout,
  FiSearch,
  FiTrendingUp,
  FiCloud,
  FiSettings,
  FiCheckCircle,
  FiArrowRight
} from 'react-icons/fi';

const services = [
  {
    id: 'website-development',
    icon: FiMonitor,
    title: 'Website Development',
    description: 'Custom, high-performance websites built with modern frameworks like Next.js and React.',
    features: ['Responsive Design', 'Fast Load Times', 'SEO Optimized', 'CMS Integration'],
    benefits: 'Establish a strong online presence with a website that converts visitors into customers.',
  },
  {
    id: 'ecommerce-development',
    icon: FiShoppingCart,
    title: 'E-Commerce Development',
    description: 'Scalable and secure online stores designed to maximize sales and provide seamless checkout experiences.',
    features: ['Payment Gateway Integration', 'Inventory Management', 'User-Friendly Cart', 'Mobile Commerce'],
    benefits: 'Boost your revenue with a 24/7 digital storefront tailored to your brand.',
  },
  {
    id: 'mobile-app-development',
    icon: FiSmartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android using React Native.',
    features: ['Intuitive UI/UX', 'Offline Capabilities', 'Push Notifications', 'API Integration'],
    benefits: 'Engage your customers directly on their smartphones with high-quality apps.',
  },
  {
    id: 'custom-software-development',
    icon: FiCode,
    title: 'Custom Software Development',
    description: 'Tailored software solutions designed to solve your specific business challenges and optimize workflows.',
    features: ['Enterprise Architecture', 'Scalable Backend', 'Data Security', 'Legacy System Migration'],
    benefits: 'Gain a competitive edge with software built precisely for your operational needs.',
  },
  {
    id: 'ai-machine-learning',
    icon: FiCpu,
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions including predictive analytics, natural language processing, and automation algorithms.',
    features: ['Data Analytics', 'Chatbots & NLP', 'Computer Vision', 'Recommendation Engines'],
    benefits: 'Unlock insights from your data and automate complex tasks to save time and resources.',
  },
  {
    id: 'ui-ux-design',
    icon: FiLayout,
    title: 'UI/UX Design',
    description: 'User-centric design services that ensure your digital products are beautiful, intuitive, and easy to use.',
    features: ['Wireframing & Prototyping', 'User Research', 'Design Systems', 'Usability Testing'],
    benefits: 'Increase user satisfaction and retention with thoughtfully designed interfaces.',
  },
  {
    id: 'seo-optimization',
    icon: FiSearch,
    title: 'SEO Optimization',
    description: 'Comprehensive search engine optimization strategies to improve your organic rankings and drive traffic.',
    features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Link Building'],
    benefits: 'Increase your visibility on Google and attract high-quality, targeted leads.',
  },
  {
    id: 'digital-marketing',
    icon: FiTrendingUp,
    title: 'Digital Marketing',
    description: 'Data-driven marketing campaigns across various channels to grow your brand and acquire customers.',
    features: ['Social Media Marketing', 'PPC Campaigns', 'Content Strategy', 'Email Marketing'],
    benefits: 'Maximize your ROI with targeted marketing strategies that reach the right audience.',
  },
  {
    id: 'cloud-services',
    icon: FiCloud,
    title: 'Cloud Services',
    description: 'Cloud architecture, migration, and management services on AWS, Azure, and Google Cloud.',
    features: ['Cloud Migration', 'Serverless Architecture', 'DevOps & CI/CD', 'Cloud Security'],
    benefits: 'Reduce IT costs and improve scalability and reliability with modern cloud infrastructure.',
  },
  {
    id: 'business-automation',
    icon: FiSettings,
    title: 'Business Automation',
    description: 'Streamline your operations by automating repetitive tasks and integrating your business software.',
    features: ['Workflow Automation', 'API Integrations', 'RPA', 'Custom Scripts'],
    benefits: 'Increase efficiency and allow your team to focus on high-value, strategic work.',
  },
];

export default function Services() {
  return (
    <div className="bg-white pb-24">
      {/* ─── Hero Section ───────────────────────────────────── */}
      <section className="bg-surface-card py-20 border-b border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold text-sm tracking-wider uppercase">Our Expertise</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary mt-4 leading-tight">
              Comprehensive <span className="text-gradient">IT Solutions</span>
            </h1>
            <p className="mt-6 text-text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
              We provide end-to-end technology services designed to modernize your operations, enhance customer experiences, and drive sustainable growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Services Grid ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-8 lg:p-10 border border-border shadow-xl shadow-black/5 flex flex-col card-hover"
            >
              <div className="flex items-center gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/30">
                  <service.icon size={28} />
                </div>
                <h2 className="text-2xl font-bold text-text-primary">{service.title}</h2>
              </div>
              
              <p className="text-text-secondary leading-relaxed mb-8">
                {service.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-8 flex-1">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <FiCheckCircle className="text-accent mt-1 shrink-0" />
                    <span className="text-sm font-medium text-text-primary">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-surface-card p-4 rounded-xl border border-border mb-8">
                <p className="text-sm italic text-text-secondary">
                  <span className="font-semibold text-primary not-italic mr-2">Benefit:</span>
                  {service.benefits}
                </p>
              </div>

              <Link
                href="/contact"
                className="mt-auto inline-flex items-center justify-center w-full py-3.5 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold transition-all duration-300 gap-2 group"
              >
                Discuss Your Project
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Bottom CTA ─────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
          Not sure which service you need?
        </h2>
        <p className="mt-4 text-text-secondary text-lg mb-8">
          Our solutions experts can audit your current infrastructure and recommend the best technical approach for your goals.
        </p>
        <Link
          href="/contact"
          className="inline-flex px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1"
        >
          Book a Free Consultation
        </Link>
      </section>
    </div>
  );
}
