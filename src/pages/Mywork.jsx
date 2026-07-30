  import React, { useState, useEffect } from 'react';
  import { supabase } from '../lib/supabaseClient';
  import { useTranslation } from 'react-i18next';
  import i18n from '../i18n';
  import { motion } from 'framer-motion';

  function Mywork() {
    const [workData, setWorkData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
      const fetchWork = async () => {
        try {
          const { data, error } = await supabase
            .from('work_experience')
            .select('*')
            .order('start_date', { ascending: false });

          if (error) throw error;

          setWorkData(data || []);
        } catch (error) {
          console.error('Error fetch work:', error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchWork();
    }, []);

    if (loading) {
      return (
        <div className="container mx-auto py-6 px-4 md:px-12 mt-5">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

        {/* Skeleton Title */}
        <div className="lg:w-1/3">
          <div className="skeleton h-10 w-48"></div>
        </div>

        {/* Skeleton Cards */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          {[...Array(1)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex flex-col sm:flex-row gap-5">

                {/* Logo */}
                <div className="skeleton w-14 h-14 rounded-xl"></div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="skeleton h-6 w-52"></div>
                  <div className="skeleton h-4 w-40"></div>
                  <div className="skeleton h-4 w-36"></div>

                  <div className="space-y-2 mt-4">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-3/4"></div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-5">
                <div className="skeleton h-8 w-20 rounded-full"></div>
                <div className="skeleton h-8 w-24 rounded-full"></div>
                <div className="skeleton h-8 w-16 rounded-full"></div>
                <div className="skeleton h-8 w-28 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
      );
    }

    return (
      <div className="container mx-auto py-6 px-4 md:px-12 mt-5">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          <div className="lg:w-1/3">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-Poppins"
            >
              {t('work.title')}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:w-2/3 flex flex-col gap-6"
          > 
            {workData.length > 0 ? (
              workData.map((work) => (
                <div key={work.id} className="bg-white p-6 rounded-lg shadow-sm">

                  <div className="flex flex-col sm:flex-row gap-5 mb-4 text-center sm:text-left">

                    {work.image && (
                      <img 
                        src={work.image} 
                        alt={work.company_name} 
                        className="w-14 h-14 object-cover rounded-xl"
                      />
                    )}

                    <div className="flex flex-col gap-3">
                      <h1 className="font-semibold text-lg text-black">
                        {work.company_name}
                      </h1>

                      <p className="text-sm text-gray-500">
                        {work.position}
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(work.start_date).toLocaleDateString(i18n.language, { month: 'short', year: 'numeric' })} -{' '}
                        {(!work.end_date || work.end_date === '0000-00-00')
                          ? t("work.now")
                          : new Date(work.end_date).toLocaleDateString(i18n.language === "id" ? "id-ID" : "en-US", { month: "short", year: "numeric" })}
                      </p>

                      <p className="text-sm text-gray-600 whitespace-pre-line text-justify">
                        {i18n.language === "en" ? work.job_description : work.job_description_id}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {work.tools_used?.split(',').map((tech, index) => (
                      <span key={index} className="border px-3 py-1 text-xs rounded-full">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                </div>
              ))
            ) : (
              <p className="text-gray-400">No work experience found.</p>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  export default Mywork;
