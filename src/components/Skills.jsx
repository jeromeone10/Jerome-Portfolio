import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Server, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Skills = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('skills.categories.frontend'),
      icon: <Monitor className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />,
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'Tailwind CSS']
    },
    {
      title: t('skills.categories.backend'),
      icon: <Server className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      skills: ['PHP', 'MySQL', 'Node.js (Learning)']
    },
    {
      title: t('skills.categories.tools'),
      icon: <Wrench className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
      skills: ['Git', 'VS Code', 'XAMPP', 'Postman', 'Vite']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('skills.title')}</h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 transition-all group shadow-sm hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 rounded-full bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-sm border border-slate-200 dark:border-slate-700 group-hover:border-cyan-500/30 transition-colors shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
