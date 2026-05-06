import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Code2, Sun, Moon, Settings, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Reset settings view when closing the whole menu
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setShowSettings(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 sm:p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="hidden md:flex items-center gap-2 sm:gap-3">
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
            <div className="bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/10 relative overflow-hidden min-h-[400px] flex flex-col">
              <AnimatePresence mode="wait">
                {!showSettings ? (
                  <motion.div
                    key="main-menu"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-grow flex flex-col px-4 pt-6 pb-6"
                  >
                    <div className="flex-grow space-y-3">
                      {navLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration={350}
                          onClick={() => setIsOpen(false)}
                          className="block px-6 py-4 rounded-2xl text-lg font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer text-center border border-white/5 shadow-sm"
                          activeClass="!bg-white/10 !text-cyan-400 !border-white/10 shadow-md"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>

                    {/* Settings Entry Button */}
                    <button
                      onClick={() => setShowSettings(true)}
                      className="w-full mt-4 flex items-center justify-between px-8 py-5 rounded-2xl bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-all font-bold border border-white/5 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <Settings className="w-5 h-5 text-cyan-500" />
                        <span className="text-lg uppercase tracking-wider">Settings</span>
                      </div>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="settings-menu"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-grow flex flex-col"
                  >
                    {/* Settings Header with Back Button */}
                    <div className="px-8 pt-8 pb-4 flex items-center gap-4">
                      <button 
                        onClick={() => setShowSettings(false)}
                        className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white transition-all"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <h3 className="text-xl font-bold text-white uppercase tracking-widest">Settings</h3>
                    </div>

                    <div className="flex-grow flex flex-col items-center justify-center px-8 py-8 gap-6">
                      <button
                        onClick={() => toggleTheme()}
                        className="w-full flex items-center justify-center gap-4 px-6 py-5 rounded-2xl bg-white/5 text-slate-300 hover:text-white transition-all border border-white/10 shadow-sm"
                      >
                        {isDarkMode ? (
                          <><Sun className="w-6 h-6 text-yellow-400" /> <span className="text-base font-bold tracking-widest uppercase">Light Mode</span></>
                        ) : (
                          <><Moon className="w-6 h-6 text-cyan-400" /> <span className="text-base font-bold tracking-widest uppercase">Dark Mode</span></>
                        )}
                      </button>
                      <div className="w-full flex justify-center relative">
                        <LanguageSelector isMobileMenu={true} />
                      </div>
                    </div>

                    <div className="p-8 border-t border-white/10 bg-slate-800/50">
                      <button
                        onClick={() => setShowSettings(false)}
                        className="w-full py-4 rounded-2xl bg-cyan-500 text-white font-bold text-center shadow-lg shadow-cyan-500/20"
                      >
                        BACK TO MENU
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
