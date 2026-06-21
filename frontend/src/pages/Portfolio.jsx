import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projectsAPI } from '@/lib/api';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import SEO from '../components/SEO';

const categories = ['All', 'Websites', 'Mobile Apps', 'Software', 'AI Projects'];

const fallbackProjects = [
  {
    id: 'my-dream-surprise',
    title: 'My Dream Surprise',
    description: 'A premium surprise event planning platform and hall booking system for birthday parties and special events, featuring custom themes, packages, and reservation management.',
    category: 'Websites',
    image: '/images/portfolio/my-dream-surprise.png',
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'PostgreSQL'],
    isFeatured: true,
  },
  {
    id: 'dropzii',
    title: 'Dropzii',
    description: 'A taxi business booking and fleet management ecosystem with a high-fidelity interactive user interface, ride tracking, and integrated operational datasheets.',
    category: 'Websites',
    image: '/images/portfolio/dropzii.png',
    technologies: ['React', 'Tailwind CSS', 'Google Sheets API', 'Frontend'],
    isFeatured: true,
  },
  {
    id: 'techspark-academy',
    title: 'Techspark Academy',
    description: 'An AI and technology education institute offering hands-on training courses with structured student progress trackers and syllabus integration.',
    category: 'Websites',
    image: '/images/portfolio/techspark-academy.png',
    technologies: ['React', 'Tailwind CSS', 'Google Sheets API', 'Frontend'],
    isFeatured: true,
  },
  {
    id: 'praxire-erp',
    title: 'Praxire ERP',
    description: 'A comprehensive enterprise resource planning solution featuring real-time inventory management, automated invoicing, customer relationship management (CRM), and interactive analytics dashboards.',
    category: 'Software',
    image: '/images/portfolio/praxire-erp.png',
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'PostgreSQL'],
    isFeatured: true,
  },
];

export default function Portfolio() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await projectsAPI.getAll();
      if (res.data && res.data.projects) {
        setProjects(res.data.projects.length > 0 ? res.data.projects : fallbackProjects);
      }
    } catch (_err) {
      // Keep fallbacks on API fail
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-white min-h-screen pb-24">
      <SEO 
        title="Our Portfolio | Web & Mobile App Projects"
        description="Browse the Praxire portfolio featuring our custom software development, mobile app development, CRM, ERP, and professional website design projects."
        keywords="Praxire Portfolio, Custom ERP Solutions, E-commerce Website Development, Website Designers in Tiruvannamalai, Web Development Company in Tiruvannamalai, Mobile App Developers in Tamil Nadu"
        robots="noimageindex"
      />
      {/* ─── Hero Section ───────────────────────────────────── */}
      <section className="bg-surface-card py-20 border-b border-border text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold text-sm tracking-wider uppercase">Our Work</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mt-4">
              Featured Portfolio
            </h1>
            <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
              Explore our recent projects, including the TechSpark Academy showcase and enterprise AI applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Filter & Grid ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-surface-card text-text-secondary hover:text-primary hover:bg-primary/10 border border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="spinner"></div>
          </div>
        )}

        {/* Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                key={`${activeCategory}-${project.id}`}
                className="bg-white rounded-2xl border border-border overflow-hidden flex flex-col group card-hover"
              >
                {/* Image Placeholder / Banner */}
                <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden flex items-center justify-center">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="text-4xl opacity-25 font-bold text-gray-400">
                      {project.title.substring(0, 2).toUpperCase()}
                    </span>
                  )}
                  {/* Hover Overlay Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary-light transition-colors shadow-lg">
                        <FiExternalLink size={20} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors shadow-lg">
                        <FiGithub size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-2 py-1 rounded-md">
                      {project.category}
                    </span>
                    {project.isFeatured && (
                      <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mt-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary text-sm mt-3 leading-relaxed flex-1">
                    {project.description}
                  </p>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium rounded-md bg-surface-card border border-border text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-20 text-text-secondary">
            No projects found in this category.
          </div>
        )}
      </section>
    </div>
  );
}
