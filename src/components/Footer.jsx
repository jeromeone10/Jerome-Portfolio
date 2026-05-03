import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
              Jerome<span className="text-cyan-500">.</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {t('footer.role')}
            </p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-cyan-500 dark:hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-cyan-500 dark:hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-cyan-500 dark:hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            © {currentYear} Jerome M. Niñal. {t('footer.rights')}
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm flex items-center gap-1">
            {t('footer.madeWith')} <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
