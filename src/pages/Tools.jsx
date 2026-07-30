import React from 'react';
import Logos from "../components/LogoLoop/Logos";
import { useTranslation } from 'react-i18next';
import I18n from '../i18n';
import { motion } from 'framer-motion';

function Tools() {
  const { t } = useTranslation();
  return (
    <>
    <section className='container mx-auto py-6 px-4 md:py-6 md:px-12 mt-5'>
      <div className='text-center gap-10'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className='text-3xl font-bold font-Poppins text-gray-900 mb-2'
        >
          {t("tools.title")} &amp; {t("tools.title_1")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='text-gray-600 max-w-2xl mx-auto'
        >
          {t("tools.desc")}
        </motion.p>
      </div>
      
      <div className='flex flex-wrap justify-center gap-5 mt-7'>
        <Logos />
      </div>
    </section>
</>
  );
}

export default Tools;