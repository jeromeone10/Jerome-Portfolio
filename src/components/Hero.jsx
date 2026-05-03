import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const name = "Jerome M. Niñal";
  const nameChars = Array.from(name);

  const nameVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  const cursorVariants = {
    blinking: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 0,
        ease: "linear",
        times: [0, 0.5, 0.5, 1]
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-cyan-400/10 text-cyan-500 dark:text-cyan-400 text-sm font-medium mb-4 border border-cyan-400/20">
            {t('hero.badge')}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            {t('hero.greeting')}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 inline-block relative">
              {nameChars.map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={nameVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                variants={cursorVariants}
                animate="blinking"
                className="inline-block w-[3px] sm:w-[4px] h-[0.8em] bg-cyan-500 dark:bg-cyan-400 ml-1 align-middle"
              />
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl text-slate-600 dark:text-slate-400 mb-8 font-medium">
            {t('hero.title')}
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-base sm:text-lg mb-10 leading-relaxed px-4 sm:px-0">
            {t('hero.desc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="projects"
              smooth={true}
              duration={350}
              offset={-70}
              className="w-full sm:w-auto px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-cyan-500/25"
            >
              {t('hero.viewProjects')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="contact"
              smooth={true}
              duration={350}
              offset={-70}
              className="w-full sm:w-auto px-8 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              {t('hero.contactMe')}
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-500 dark:hover:text-white transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-500 dark:hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:jerome@example.com" className="text-slate-400 hover:text-cyan-500 dark:hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-700 rounded-full flex justify-center p-2">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 bg-cyan-500 dark:bg-cyan-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
