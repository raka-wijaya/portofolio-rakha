import React, { useState, useEffect } from 'react';
import SpotlightCard from '../components/SpotLight/SpotlightCard';
import { Award, Code, Briefcase } from 'lucide-react';
import CountUp from '../components/CountUp/CountUp'
import { supabase } from "../lib/supabaseClient";
import { useTranslation } from 'react-i18next';

function MyJourney() {
  const { t } = useTranslation();
  const [certificates, setCertificates] = useState(0);
  const [projects, setProjects] = useState(0);
  const [experience, setExperience] = useState({years: 0, months: 0});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const { data: certData, error: certError } = await supabase
          .from('certificates')
          .select('*');

        if (certError) throw certError;

        const { data: projData, error: projError } = await supabase
          .from('projects')
          .select('*');

        if (projError) throw projError;

        const { data: expData, error: expError } = await supabase
          .from('work_experience')
          .select('*')
          .order('start_date', { ascending: false });

        if (expError) throw expError;


        setCertificates(certData?.length || 0);
        setProjects(projData?.length || 0);

        if (expData && expData.length > 0) {
          const start = new Date(expData[0].start_date);
          const now = new Date();
          const diffMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
          const years = Math.floor(diffMonths / 12);
          const months = diffMonths % 12;
          setExperience({ years, months });
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  return (
    <div className="container mx-auto py-6 px-4 md:py-6 md:px-12 mt-5 font-Poppins">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-20">
        <div className="lg:w-1/3 flex-shrink-0">
          <h2 data-aos="fade-up" data-aos-delay="50" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {t('about.title')}
          </h2>
        </div>
        <div className="lg:w-2/3 flex-grow space-y-6 text-base sm:text-lg text-gray-700">
          <p data-aos="fade-up" data-aos-delay="100" className="font-Poppins">
           {t('about.desc1')}
          </p>
          <p data-aos="fade-up" data-aos-delay="150" className="font-Poppins">
            {t('about.desc2')}
          </p>
          <p data-aos="fade-up" data-aos-delay="200" className="font-Poppins">
            {t('about.desc3')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">        
        <SpotlightCard className="bg-white p-6 rounded-2xl shadow-sm border-none" spotlightColor="rgba(0, 229, 255, 0.15)">
          <div className="relative flex flex-col gap-8 h-full justify-between">
            <div className="flex justify-between items-start w-full">
              <div className="p-3 bg-cyan-50 rounded-lg text-cyan-500">
                <Award size={23} />
              </div>
              <span className="text-2xl font-medium font-Poppins text-gray-900">
                {loading ? "..." : (
                  <CountUp
                  from={0}
                  to={certificates}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                  startCounting={false}
                  />
                )}
              </span>
            </div>
              <p className="text-gray-500 font-medium uppercase text-sm font-Poppins">{t('about.card1')}</p>
          </div>
        </SpotlightCard>
        <SpotlightCard className="bg-white p-6 rounded-2xl shadow-sm border-none" spotlightColor="rgba(0, 229, 255, 0.15)">
          <div className="relative flex flex-col gap-8 h-full justify-between">
            <div className="flex justify-between items-start w-full">
              <div className="p-3 bg-cyan-50 rounded-lg text-cyan-500">
                <Code size={23} />
              </div>
              <span className="text-2xl font-medium font-Poppins text-gray-900">
                {loading ? "..." : (
                  <CountUp
                  from={0}
                  to={projects}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                  startCounting={false}
                  />
                )}
              </span>
            </div>
              <p className="text-gray-500 font-medium uppercase font-Poppins text-sm">{t('about.card2')}</p>
          </div>
        </SpotlightCard>
        <SpotlightCard className="bg-white p-6 rounded-2xl shadow-sm border-none" spotlightColor="rgba(0, 229, 255, 0.15)">
          <div className="relative flex flex-col gap-8 h-full justify-between">
            <div className="flex justify-between items-start w-full">
              <div className="p-3 bg-cyan-50 rounded-lg text-cyan-500">
                <Briefcase size={23} />
              </div>
              <span className="text-2xl font-medium font-Poppins text-gray-900">
                {loading ? "..." : (
                  <>
                    <CountUp
                      from={0}
                      to={experience.years}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                      startCounting={false}
                    />
                    <span className="count-up-text"> {t('about.card5')} </span>
                    <CountUp
                      from={0}
                      to={experience.months}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                      startCounting={false}
                    />
                    <span className="count-up-text"> {t('about.card4')}</span>
                  </>
                )}
              </span>
            </div>
              <p className="text-gray-500 font-medium uppercase font-Poppins text-sm">{t('about.card3')}</p>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}

export default MyJourney;