import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Facebook } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Using Web3Forms for production (Works on Vercel and all devices)
      // Get your Access Key from https://web3forms.com/
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Replace with your real key
          ...formData,
          subject: `New Portfolio Message: ${formData.subject}`
        })
      });

      const data = await response.json();

      if (data.success) {
        console.log('Form submitted successfully:', data);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        console.error('Submission failed:', data);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('contact.title')}</h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{t('contact.subtitle')}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {t('contact.desc')}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t('contact.info.email')}</p>
                  <p className="text-slate-900 dark:text-white font-medium">jerome.ninal@example.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t('contact.info.phone')}</p>
                  <p className="text-slate-900 dark:text-white font-medium">+63 912 345 6789</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{t('contact.info.location')}</p>
                  <p className="text-slate-900 dark:text-white font-medium">{t('contact.info.manila')}</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h4 className="text-slate-900 dark:text-white font-bold mb-4">{t('contact.follow')}</h4>
              <div className="flex gap-4">
                {[
                  { icon: <Github className="w-5 h-5" />, link: '#' },
                  { icon: <Linkedin className="w-5 h-5" />, link: '#' },
                  { icon: <Facebook className="w-5 h-5" />, link: '#' }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-cyan-500 hover:text-white transition-all shadow-sm"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{t('contact.form.name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors shadow-sm"
                    placeholder={t('contact.form.placeholder.name')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{t('contact.form.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors shadow-sm"
                    placeholder={t('contact.form.placeholder.email')}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{t('contact.form.subject')}</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors shadow-sm"
                  placeholder={t('contact.form.placeholder.subject')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{t('contact.form.message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none shadow-sm"
                  placeholder={t('contact.form.placeholder.message')}
                ></textarea>
              </div>
              
              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium"
                >
                  {t('contact.form.success')}
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium"
                >
                  {t('contact.form.error')}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-cyan-500/20"
              >
                {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'}`} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
