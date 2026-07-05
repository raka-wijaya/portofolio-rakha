import React from 'react';
import Logos from "../components/LogoLoop/Logos";
import { useTranslation } from 'react-i18next';
import I18n from '../i18n';

function Tools() {
  const { t } = useTranslation();
  return (
    <>
    <section className='container mx-auto py-6 px-4 md:py-6 md:px-12 mt-5'>
      <div className='text-center gap-10'>
        <h2 data-aos="fade-up" data-aos-delay="50" className='text-3xl font-bold font-Poppins text-gray-900 mb-2'>{t("tools.title")} &amp; {t("tools.title_1")}</h2>
        <p data-aos="fade-up" data-aos-delay="100" className='text-gray-600 max-w-2xl mx-auto'>{t("tools.desc")}</p>
      </div>
      
      <div className='flex flex-wrap justify-center gap-5 mt-7'>
        <Logos />
      </div>
    </section>
</>
  );
}

export default Tools;