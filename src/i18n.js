import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact'
      },
      hero: {
        badge: 'Available for new opportunities',
        greeting: "Hi, I'm",
        title: 'BSIT Student | Web Developer',
        desc: "I'm a passionate full-stack web developer in training, focused on building clean, modern, and user-centric web applications with React and PHP.",
        viewProjects: 'View Projects',
        contactMe: 'Contact Me'
      },
      about: {
        title: 'About Me',
        subtitle: 'Aspiring Full-Stack Web Developer',
        desc1: 'I am a dedicated BSIT student with a strong passion for web development. My journey began with curiosity about how websites function, which quickly evolved into a commitment to mastering both frontend and backend technologies.',
        desc2: 'Currently, I am working on several key projects that showcase my ability to solve real-world problems through code:',
        projects: {
          invenprod: 'A robust Inventory Management System for tracking stock and sales.',
          autochecker: 'An automated test paper checking system for educational efficiency.',
          tnvs: 'A logistics and fleet management platform for transportation services.'
        }
      },
      skills: {
        title: 'Technical Skills',
        categories: {
          frontend: 'Frontend',
          backend: 'Backend',
          tools: 'Tools'
        }
      },
      projects: {
        title: 'Featured Projects',
        live: 'Live Demo',
        github: 'GitHub',
        items: {
          invenprod: {
            desc: 'A comprehensive Inventory Management System designed for small businesses to track products, manage stock levels, and generate sales reports in real-time.'
          },
          autochecker: {
            desc: 'An innovative web application that automates the process of checking test papers using image processing and predefined answer keys, significantly reducing manual work.'
          },
          tnvs: {
            desc: 'A logistics and fleet management system for TNVS operators to manage bookings, track vehicle maintenance, and monitor driver performance efficiently.'
          }
        }
      },
      contact: {
        title: 'Get In Touch',
        subtitle: 'Contact Information',
        desc: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions. Feel free to reach out through any of the following channels.",
        info: {
          email: 'Email Me',
          phone: 'Call Me',
          location: 'Location',
          manila: 'Manila, Philippines'
        },
        follow: 'Follow Me',
        form: {
          name: 'Name',
          email: 'Email',
          subject: 'Subject',
          message: 'Message',
          placeholder: {
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Project Inquiry',
            message: 'Your message here...'
          },
          send: 'Send Message'
        }
      },
      footer: {
        role: 'BSIT Student & Aspiring Full-Stack Developer',
        rights: 'All rights reserved.',
        madeWith: 'Made with'
      }
    }
  },
  fil: {
    translation: {
      nav: {
        home: 'Home',
        about: 'Tungkol',
        skills: 'Kasanayan',
        projects: 'Proyekto',
        contact: 'Kontak'
      },
      hero: {
        badge: 'Bukas para sa mga bagong oportunidad',
        greeting: "Kumusta, Ako si",
        title: 'BSIT Student | Web Developer',
        desc: "Ako ay isang masugid na full-stack web developer na nagsasanay, nakatuon sa paggawa ng malinis, moderno, at user-centric na mga web application gamit ang React at PHP.",
        viewProjects: 'Tingnan ang mga Proyekto',
        contactMe: 'Kontakin Ako'
      },
      about: {
        title: 'Tungkol sa Akin',
        subtitle: 'Naglalayong maging Full-Stack Web Developer',
        desc1: 'Ako ay isang dedikadong estudyante ng BSIT na may malakas na hilig sa pagbuo ng mga website. Nagsimula ang aking paglalakbay sa pag-usisa kung paano gumagana ang mga website, na mabilis na naging isang pangako sa pagpapakadalubhasa sa parehong frontend at backend na mga teknolohiya.',
        desc2: 'Sa kasalukuyan, nagtatrabaho ako sa ilang mahahalagang proyekto na nagpapakita ng aking kakayahang lutasin ang mga tunay na problema sa pamamagitan ng code:',
        projects: {
          invenprod: 'Isang matibay na Inventory Management System para sa pagsubaybay ng stock at benta.',
          autochecker: 'Isang automated na sistema ng pag-check ng test paper para sa kahusayan sa edukasyon.',
          tnvs: 'Isang platform para sa logistics at fleet management para sa mga serbisyo ng transportasyon.'
        }
      },
      skills: {
        title: 'Teknikal na Kasanayan',
        categories: {
          frontend: 'Frontend',
          backend: 'Backend',
          tools: 'Mga Kagamitan'
        }
      },
      projects: {
        title: 'Mga Tampok na Proyekto',
        live: 'Live Demo',
        github: 'GitHub',
        items: {
          invenprod: {
            desc: 'Isang komprehensibong Inventory Management System na idinisenyo para sa maliliit na negosyo upang masubaybayan ang mga produkto, mapamahalaan ang mga antas ng stock, at makabuo ng mga ulat sa benta sa real-time.'
          },
          autochecker: {
            desc: 'Isang makabagong web application na nag-o-automate ng proseso ng pag-check ng mga test paper gamit ang image processing at predefined na mga sagot, na makabuluhang nagpapababa ng manual na trabaho.'
          },
          tnvs: {
            desc: 'Isang sistema para sa logistics at fleet management para sa mga TNVS operator upang mapamahalaan ang mga booking, masubaybayan ang maintenance ng sasakyan, at masubaybayan ang performance ng driver nang mahusay.'
          }
        }
      },
      contact: {
        title: 'Makipag-ugnayan',
        subtitle: 'Impormasyon sa Pakikipag-ugnayan',
        desc: "Palagi akong bukas sa pagtalakay ng mga bagong proyekto, malikhaing ideya o pagkakataon na maging bahagi ng iyong mga pananaw. Huwag mag-atubiling makipag-ugnayan sa pamamagitan ng alinman sa mga sumusunod na channel.",
        info: {
          email: 'I-email Ako',
          phone: 'Tawagan Ako',
          location: 'Lokasyon',
          manila: 'Maynila, Pilipinas'
        },
        follow: 'I-follow Ako',
        form: {
          name: 'Pangalan',
          email: 'Email',
          subject: 'Paksa',
          message: 'Mensahe',
          placeholder: {
            name: 'Juan Dela Cruz',
            email: 'juan@example.com',
            subject: 'Inquiry sa Proyekto',
            message: 'Ang iyong mensahe dito...'
          },
          send: 'Ipadala ang Mensahe'
        }
      },
      footer: {
        role: 'BSIT Student & Aspiring Full-Stack Developer',
        rights: 'Lahat ng karapatan ay nakareserba.',
        madeWith: 'Gawa gamit ang'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
