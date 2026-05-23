import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import invenFeatureImg from '../invenprod/invenfeature.png';
import invenLoginImg from '../invenprod/invenlogin.png';
import invenSignupImg from '../invenprod/invensignup.png';
import jetlougeImg from '../image/log1.png';
import jetlougeImg2 from '../image/log2.png';
import jetlougeImg3 from '../image/log3.png';

const ProjectCard = ({ title, description, tech, image, liveLink, githubLink }) => {
  const { t } = useTranslation();
  const images = Array.isArray(image) ? image : [image];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [siteIsDark, setSiteIsDark] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    if (typeof MutationObserver === 'undefined' || typeof document === 'undefined') return;
    const obs = new MutationObserver(() => {
      setSiteIsDark(document.documentElement.classList.contains('dark'));
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 transition-all group flex flex-col h-full shadow-sm hover:shadow-xl"
      >
        <div
          className="relative aspect-video overflow-hidden cursor-pointer"
          onClick={() => setModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setModalOpen(true)}
        >
          <img
            src={images[currentSlide]}
            alt={`${title} slide ${currentSlide + 1}`}
            className="w-full h-full object-cover transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60"></div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/60 text-white p-2 hover:bg-slate-900"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/60 text-white p-2 hover:bg-slate-900"
                aria-label="Next slide"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-2 w-2 rounded-full ${idx === currentSlide ? 'bg-cyan-500' : 'bg-white/60'}`}
                  />
                ))}
              </div>
            </>
          )}
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

    {modalOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-amber-100/95 p-4 dark:bg-slate-900/80"
        onClick={() => setModalOpen(false)}
      >
        <div
          className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-amber-50 shadow-2xl shadow-amber-200/50 dark:bg-slate-900 dark:shadow-black/50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`${siteIsDark ? 'bg-amber-100 border-amber-200 text-amber-900' : 'bg-slate-900 border-slate-800 text-white'} flex items-center justify-between px-6 py-4 border-b`}>
            <div>
              <p className={`${siteIsDark ? 'text-amber-600' : 'text-slate-400'} text-sm uppercase tracking-[0.2em]`}>Project preview</p>
              <h3 className={`${siteIsDark ? 'text-amber-900' : 'text-white'} text-lg font-semibold`}>{title}</h3>
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className={`${siteIsDark ? 'bg-amber-200 text-amber-900 hover:bg-amber-300' : 'bg-slate-800 text-white hover:bg-slate-700'} rounded-full p-3 transition`}
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className={`relative ${siteIsDark ? 'bg-white' : 'bg-amber-50'} dark:bg-slate-950`}>
            <img
              src={images[currentSlide]}
              alt={`${title} slide ${currentSlide + 1}`}
              className={`w-full h-[65vh] object-contain ${siteIsDark ? 'bg-white' : 'bg-amber-50'} dark:bg-slate-900`}
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-slate-900/80 p-3 text-white transition hover:bg-slate-800"
                  aria-label="Previous slide"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-slate-900/80 p-3 text-white transition hover:bg-slate-800"
                  aria-label="Next slide"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-3 w-3 rounded-full ${idx === currentSlide ? 'bg-cyan-500' : 'bg-white/60'}`}
                      aria-label={`Select slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )}
  </>
  );
};

const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: 'InvenProd',
      description: t('projects.items.invenprod.desc'),
      tech: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
      image: [invenLoginImg, invenFeatureImg, invenSignupImg],
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
      title: 'Jetlouge Travels Logistics System',
      description: t('projects.items.tnvs.desc'),
      tech: ['Laravel', 'MySQL', 'Google Maps API', 'React'],
      image: [jetlougeImg, jetlougeImg2, jetlougeImg3],
      liveLink: 'https://logistics1.jetlougetravels-ph.com/',
      githubLink: '#'
    }
  ];

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="py-24 bg-slate-50/50 dark:bg-transparent transition-colors"
    >
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
    </motion.section>
  );
};

export default Projects;
