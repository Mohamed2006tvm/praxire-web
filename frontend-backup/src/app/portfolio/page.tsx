'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsAPI } from '@/lib/api';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const categories = ['All', 'Websites', 'Mobile Apps', 'Software', 'AI Projects'];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await projectsAPI.getAll();
      setProjects(res.data.projects);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p: any) => p.category === activeCategory);

  return (
    <div className="bg-white min-h-screen pb-24">
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
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project: any) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
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
                      {project.technologies.map((tech: string) => (
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
            </AnimatePresence>
          </motion.div>
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
