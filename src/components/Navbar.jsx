import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Code2, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), to: 'home' },
    { name: t('nav.about'), to: 'about' },
    { name: t('nav.skills'), to: 'skills' },
    { name: t('nav.projects'), to: 'projects' },
    { name: t('nav.contact'), to: 'contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-morphism py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:rotate-6 transition-transform">
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Jerome<span className="text-cyan-500">.</span>
            </span>
          </div>

          {/* Middle: Desktop Menu */}
          <div className="hidden md:flex items-center justify-center flex-grow px-4">
            <div className="flex items-center space-x-1 bg-slate-900/5 dark:bg-white/5 p-1.5 rounded-full border border-slate-900/5 dark:border-white/5 backdrop-blur-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={350}
                  className="px-5 lg:px-7 py-2.5 rounded-full text-[14px] lg:text-[15px] font-bold transition-all cursor-pointer relative group text-slate-600 dark:text-slate-400"
                  activeClass="!bg-white dark:!bg-slate-800 !text-cyan-600 dark:!text-cyan-400 shadow-sm"
                >
                  <span className="relative z-10 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Mobile Menu Button, Theme Toggle, & Language Selection */}
          <div className="flex items-center gap-2 sm:gap-3 relative z-[100]">
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 sm:p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            <button
              onClick={() => {
                console.log('Theme toggle clicked, isDarkMode:', isDarkMode);
                toggleTheme();
              }}
              className="p-2.5 sm:p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer relative z-[100]"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden mx-4 mt-4"
          >
            <div className="bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 dark:border-white/10">
              <div className="px-3 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={350}
                    onClick={() => setIsOpen(false)}
                    className="block px-6 py-4 rounded-2xl text-lg font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                    activeClass="bg-white/10 text-cyan-400"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
