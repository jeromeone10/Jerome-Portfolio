import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSelector = ({ isMobileMenu = false }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fil', name: 'Filipino', flag: '🇵🇭' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language.split('-')[0]) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isMobileMenu 
            ? 'w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/5 text-slate-300 hover:text-white transition-all border border-white/10 shadow-sm'
            : 'flex items-center gap-2 px-2.5 sm:px-3 py-2.5 sm:py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer'
        }`}
      >
        <Languages className="w-4 h-4 sm:w-4 sm:h-4 text-cyan-500" />
        <span className={`${isMobileMenu ? 'text-sm font-bold tracking-widest uppercase' : 'text-xs sm:text-sm font-bold uppercase'}`}>
          {isMobileMenu ? currentLanguage.name : currentLanguage.code}
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isMobileMenu ? -10 : 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isMobileMenu ? -10 : 10, scale: 0.95 }}
            className={`absolute right-0 ${isMobileMenu ? 'bottom-full mb-3 left-0' : 'mt-2'} w-full sm:w-32 glass-morphism rounded-xl shadow-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden z-[110]`}
          >
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => toggleLanguage(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 ${
                    currentLanguage.code === lang.code ? 'text-cyan-500 font-bold bg-slate-100 dark:bg-slate-800' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
