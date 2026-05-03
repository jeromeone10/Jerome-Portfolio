import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('about.title')}</h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
              {t('about.subtitle')}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              {t('about.desc1')}
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {t('about.desc2')}
            </p>

            <div className="space-y-4">
              {[
                { 
                  icon: <Briefcase className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />, 
                  title: 'InvenProd', 
                  desc: t('about.projects.invenprod')
                },
                { 
                  icon: <Code className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />, 
                  title: 'Auto-checker Web App', 
                  desc: t('about.projects.autochecker')
                },
                { 
                  icon: <GraduationCap className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />, 
                  title: 'TNVS Logistics System', 
                  desc: t('about.projects.tnvs')
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 transition-all shadow-sm hover:shadow-md">
                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-medium">{item.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
