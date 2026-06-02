import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import lightLogo from '../logo/jerome logo.png';
import darkLogo from '../logo/Jerome Logo Design.png';

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
      <div className="w-full mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <a
              href={isDarkMode ? darkLogo : lightLogo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-slate-900 dark:bg-slate-100 flex items-center justify-center shadow-lg shadow-cyan-500/20 overflow-hidden transition-transform group-hover:scale-[1.05]"
              aria-label="Open logo in new tab"
              title="Open logo in new tab"
            >
              <img src={isDarkMode ? darkLogo : lightLogo} alt="Jerome logo" className="w-full h-full object-contain" />
            </a>
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
                  duration={0}
                  className="px-5 lg:px-7 py-2.5 rounded-full text-[14px] lg:text-[15px] font-bold transition-all cursor-pointer relative group text-slate-600 dark:text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-700 dark:hover:text-cyan-300"
                  activeClass="!bg-cyan-500 !text-white !shadow-lg !shadow-cyan-500/40 hover:!bg-cyan-600 hover:!shadow-xl"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Menu Button & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 relative z-[100]">
            <button
              onClick={() => toggleTheme()}
              className="p-2.5 sm:p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 sm:p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
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
            className="md:hidden mx-6 mt-4"
          >
            <div className="bg-white dark:bg-slate-900/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/10 relative overflow-hidden min-h-[320px] flex flex-col px-4 pt-6 pb-6">
              <div className="flex-grow space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={0}
                    onClick={() => setIsOpen(false)}
                    className="block px-6 py-4 rounded-2xl text-lg font-bold text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 bg-slate-100 dark:bg-white/5 hover:bg-cyan-500/20 dark:hover:bg-cyan-500/20 transition-all cursor-pointer text-center border border-slate-200 dark:border-white/5 shadow-sm"
                    activeClass="!bg-cyan-500 !text-white !shadow-lg !shadow-cyan-500/40 hover:!bg-cyan-600 hover:!shadow-xl"
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
