<<<<<<< HEAD
import React from 'react';
import { FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';
import { ArrowRight } from "lucide-react";
import { useTranslation } from 'react-i18next';
import I18n from '../i18n';

function Footer() {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation();
  return (
    <footer className="w-full bg-white font-Poppins py-6 px-4 md:py-6 md:px-12 mt-5 border-t border-gray-100">
      <div className="flex flex-col justify-center items-center text-center">

        <h3 data-aos="fade-up" data-aos-delay="50" className="text-xl font-extrabold text-gray-900 mb-2">
          Salendra <span className="text-gray-500">Rakha</span>
        </h3>

        <h2 data-aos="fade-up" data-aos-delay="100" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t("footer.title")}</h2>

        <p data-aos="fade-up" data-aos-delay="150" className="text-gray-500 max-w-2xl mx-auto mb-8 text-justify">
          {t("footer.desc")}
        </p>

        <a 
          data-aos="fade-up" data-aos-delay="200"  href="https://www.linkedin.com/in/salendrawijaya/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center bg-black text-white px-8 py-3 rounded-full font-medium mb-16 hover:opacity-90 transition"
        >
          {t("footer.title")}
          <div className="ml-3 bg-white text-black rounded-full p-1">
            <ArrowRight className="text-black" size={18} />
          </div>
        </a>

        <div className="w-full pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-gray-400 text-sm order-2 md:order-1">
            © {currentYear} Salendra Rakha All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-gray-400 order-1 md:order-2">
            <a href="https://www.linkedin.com/in/salendrawijaya/" className="hover:text-black transition-colors"><FaLinkedinIn size={20} /></a>
            <a href="https://www.instagram.com/rakha_wijaya1/" className="hover:text-black transition-colors"><FaInstagram size={20} /></a>
            <a href="https://github.com/raka-wijaya" className="hover:text-black transition-colors"><FaGithub size={20} /></a>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
=======
import React from 'react';
import { FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';
import { ArrowRight } from "lucide-react";
import { useTranslation } from 'react-i18next';
import I18n from '../i18n';
import { motion } from 'framer-motion';

function Footer() {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation();
  return (
    <footer className="w-full bg-white font-Poppins py-6 px-4 md:py-6 md:px-12 mt-5 border-t border-gray-100">
      <div className="flex flex-col justify-center items-center text-center">

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-xl font-extrabold text-gray-900 mb-2"
        >
          Salendra <span className="text-gray-500">Rakha</span>
        </motion.h3>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          {t("footer.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-gray-500 max-w-2xl mx-auto mb-8 text-justify"
        >
          {t("footer.desc")}
        </motion.p>

        <motion.a 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          href="https://www.linkedin.com/in/salendrawijaya/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center bg-black text-white px-8 py-3 rounded-full font-medium mb-16 hover:opacity-90 transition"
        >
          {t("footer.title")}
          <div className="ml-3 bg-white text-black rounded-full p-1">
            <ArrowRight className="text-black" size={18} />
          </div>
        </motion.a>

        <div className="w-full pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-gray-400 text-sm order-2 md:order-1">
            © {currentYear} Salendra Rakha All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-gray-400 order-1 md:order-2">
            <a href="https://www.linkedin.com/in/salendrawijaya/" className="hover:text-black transition-colors"><FaLinkedinIn size={20} /></a>
            <a href="https://www.instagram.com/rakha_wijaya1/" className="hover:text-black transition-colors"><FaInstagram size={20} /></a>
            <a href="https://github.com/raka-wijaya" className="hover:text-black transition-colors"><FaGithub size={20} /></a>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
>>>>>>> master
