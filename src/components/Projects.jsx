import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProjectCard = ({ title, description, tech, image, liveLink, githubLink }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 transition-all group flex flex-col h-full shadow-sm hover:shadow-xl"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60"></div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-500 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {tech.map((t, idx) => (
            <span key={idx} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-cyan-400/20">
              {t}
            </span>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-cyan-500/20"
          >
            <ExternalLink className="w-4 h-4" />
            {t('projects.live')}
          </a>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg text-sm font-semibold transition-colors border border-slate-200 dark:border-slate-600"
          >
            <Github className="w-4 h-4" />
            {t('projects.github')}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: 'InvenProd',
      description: t('projects.items.invenprod.desc'),
      tech: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
      image: 'https://placehold.co/600x400/0ea5e9/ffffff?text=InvenProd',
      liveLink: '#',
      githubLink: '#'
    },
    {
      title: 'Auto-checker',
      description: t('projects.items.autochecker.desc'),
      tech: ['React', 'Node.js', 'Python', 'Tailwind CSS'],
      image: 'https://placehold.co/600x400/0ea5e9/ffffff?text=Auto-checker',
      liveLink: '#',
      githubLink: '#'
    },
    {
      title: 'TNVS Logistics',
      description: t('projects.items.tnvs.desc'),
      tech: ['PHP', 'MySQL', 'Google Maps API', 'React'],
      image: 'https://placehold.co/600x400/0ea5e9/ffffff?text=TNVS+Logistics',
      liveLink: '#',
      githubLink: '#'
    }
  ];

  return (
    <section id="projects" className="py-24 bg-slate-50/50 dark:bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('projects.title')}</h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
