import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { supabase } from '../lib/supabaseClient';
import { useTranslation } from 'react-i18next';
import I18n from '../i18n';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Sertifikat() {
  const { t } = useTranslation();
  const [sertifikatData, setSertifikatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('certificates').select('*');
        if (error) throw error;
        setSertifikatData(data);
      } catch (error) {
        console.error("Gagal mengambil data sertifikat:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleEnlarged = (imgSrc) => {
    setSelectedImage(imgSrc);
    setIsEnlarged(!isEnlarged); 
  };

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 500,
    })
  },[])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button className="btn btn-square">
          <span className="loading loading-spinner"></span>
        </button>
      </div>
    );
  }

  return (
    <>
    <div className="container mx-auto py-6 px-4 md:py-6 md:px-12 mt-20 font-Poppins">
      <div className="text-center mb-8 md:mb-16">
        <h1 data-aos="fade-up" data-aos-delay="50" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          {t("cert.title")}
        </h1>
        <p data-aos="fade-up" data-aos-delay="100" className="text-gray-500 mt-2">{t("cert.desc")}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8 md:mb-12">
        {sertifikatData.length > 0 ? (
          sertifikatData.map((item) => (
            <div data-aos="fade-up" data-aos-delay="150"
              key={item.id}
              className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(50%-1.5rem)] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden group">
                <img
                  src={item.image_url}
                  alt={`Sertifikat ${item.id}`}
                  className="w-full aspect-[4/3] object-cover rounded-t-2xl transition-all duration-300"
                />
                <div
                  onClick={() => toggleEnlarged(item.image_url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 italic">No certificate data.</div>
        )}
      </div>

      {isEnlarged && (
        <div
          onClick={() => toggleEnlarged('')} 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 cursor-zoom-out p-4"
        >
          <img
            src={selectedImage}
            alt="Sertifikat Diperbesar"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default Sertifikat;