import React, { useState, useEffect } from 'react';
import SpotlightCard from '../components/SpotLight/SpotlightCard';
import Footer from './Footer';
import { supabase } from '../lib/supabaseClient';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Portfolio = () => {
  const [portofolioData, setPortofolioData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error} = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

        if (error) throw error;
        setPortofolioData(data);
      } catch (error) {
        console.error('Gagal Mengambil Data Portofolio', error);
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
        <button className="btn btn-square bg-transparent border-none">
          <span className="loading loading-spinner loading-lg"></span>
        </button>
      </div>
    );
  }

  return (
    <>
    <div className="container mx-auto py-6 px-4 md:py-10 md:px-12 mt-20 font-Poppins">
      <div className="text-center mb-12">
        <h1 data-aos="fade-up" data-aos-delay="50" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          {t("portofolio.title")}
        </h1>
        <p data-aos="fade-up" data-aos-delay="100" className="text-gray-500 mt-2">{t("portofolio.desc")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {portofolioData.length > 0 ? (
          portofolioData.map((project) => (
            <div data-aos="fade-up" data-aos-delay="150"
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="relative overflow-hidden group">
                <img
                  src={project.image_url}
                  alt={project.project_title}
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  onClick={() => toggleEnlarged(project.image_url)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <span className="text-white font-medium font-Poppins border border-white px-4 py-2 rounded-full">View Image</span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-3">
                  <h3 className="text-xl font-bold font-Poppins text-gray-900 mb-1">
                    {project.project_title}
                  </h3>
                  <p className="text-sm font-medium font-Poppins text-blue-600">
                    {project.project_subtitle}
                  </p>
                </div>

                <p className="text-gray-600 text-sm font-Poppins leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {i18n.language === "en" ? project.project_description : project.project_description_id}
                </p>

                {project.project_link && (
                  <SpotlightCard 
                    className="bg-white rounded-xl border-none outline-none ring-0" 
                    spotlightColor="rgba(0, 229, 255, 0.2)"
                  >
                    <a
                      href={project.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full justify-center items-center text-center font-Poppins outline-none"
                    >
                      {t("portofolio.button")}
                    </a>
                  </SpotlightCard>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center font-Poppins text-gray-400 italic">
            Belum ada project yang ditampilkan.
          </div>
        )}
      </div>

      {/* Lightbox / Enlarged Image */}
      {isEnlarged && (
        <div
          onClick={() => toggleEnlarged('')}
          className="fixed inset-0 z-[99] flex items-center justify-center bg-black/90 cursor-zoom-out p-4"
        >
          <img
            src={selectedImage}
            alt="Project Preview"
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
          />
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Portfolio;
