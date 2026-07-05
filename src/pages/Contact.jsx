import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { supabase } from '../lib/supabaseClient';
import { useTranslation } from 'react-i18next';
import I18n from '../i18n';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    full_name: '',
    comment_text: ''
  });

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowAlert(false);

    try {
      const { error } = await supabase.from('comments').insert([
        {
          full_name: formData.full_name,
          comment_text: formData.comment_text
        }
      ]);
      if (error) throw error;
      setShowAlert(true);
      setFormData({ full_name: '', comment_text: '' });
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error) {
      console.error("Gagal mengirim data:", error);
      alert('Gagal menghubungi server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 500,
    })
  },[])

  return (
    <>
    <div className="flex flex-col justify-center min-h-screen items-center py-6 px-4 md:py-10 md:px-12 mt-9 text-center font-Poppins bg-white">
      <div className="w-full max-w-2xl mb-6">
        {showAlert && (
          <div role="alert" className="alert alert-success shadow-lg border-none animate-bounce flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current text-white" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-white ml-2">{t("message.title")}</span>
          </div>
        )}
      </div>

      <div className="mb-10">
        <h2 data-aos="fade-up" data-aos-delay="50" className="text-4xl font-bold text-gray-900 mb-2">{t("navbar.getInTouch")}</h2>
        <p data-aos="fade-up" data-aos-delay="100" className="text-gray-500 max-w-md mx-auto">
         {t("contact.title")}
        </p>
      </div>

      <div data-aos="fade-up" data-aos-delay="150" className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 text-center"
            value={formData.full_name}
            onChange={(e) => setFormData({...formData, full_name: e.target.value})}
            required
          />
          
          <textarea
            placeholder="Need something awesome? Let's make it happen!"
            rows="4"
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 text-center"
            value={formData.comment_text}
            onChange={(e) => setFormData({...formData, comment_text: e.target.value})}
            required
          ></textarea>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center bg-[#333333] text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? <span className="loading loading-spinner"></span> : 'Submit'}
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Contact;