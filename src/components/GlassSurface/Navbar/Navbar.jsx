import React, { useState, useCallback, useEffect } from 'react';
import GlassSurface from '../GlassSurface';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';


function Navbar() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('id') ? 'en' : 'id';
    i18n.changeLanguage(newLang);
  };

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`
        fixed top-0 left-0 right-0 w-full z-50
        transition-all duration-300
        ${scrolled
          ? "bg-white shadow-md py-10 md:py-14"
          : "bg-transparent py-6"}
      `}>
        <div className='container mx-auto fixed top-0 right-0 left-0 w-full z-50 py-6 px-4 md:py-6 md:px-12'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold font-Poppins text-gray-900'>
              Salendra <span className='text-gray-500'>Rakha</span>
            </h1>

            <div className='flex gap-2 items-center md:hidden'>
              <button onClick={toggleLanguage} className="p-2 text-gray-700" aria-label="Toggle language">
                <div className="flex items-center gap-1 font-semibold text-sm">
                  <Globe size={18} />
                  <span>{t('navbar.language')}</span>
                </div>
              </button>
              <button onClick={toggleMenu} className='p-2' aria-label="Toggle menu">
                <Menu size={24} className='text-black' />
              </button>
            </div>

            <GlassSurface
              className="hidden md:flex px-48 py-3 relative"
              displace={15}
              distortionScale={-150}
              redOffset={5}
              greenOffset={15}
              blueOffset={25}
              brightness={60}
              opacity={0.8}
              mixBlendMode="screen"
            >
              <nav className='flex gap-6 items-center'>
                <a href='/' className='font-Poppins text-[#475467] font-semibold hover:text-[#697387] transition-colors duration-200'>{t('navbar.home')}</a>
                <a href='/Portofolio' className='font-Poppins text-[#475467] font-semibold hover:text-[#697387] transition-colors duration-200'>{t('navbar.portfolio')}</a>
                <a href='/Certificate' className='font-Poppins text-[#475467] font-semibold hover:text-[#697387] transition-colors duration-200'>{t('navbar.certificate')}</a>
                <a href='/Contact' className='font-Poppins text-[#475467] font-semibold hover:text-[#697387] transition-colors duration-200'>{t('navbar.contact')}</a>
              </nav>
            </GlassSurface>

            <div className="hidden md:flex items-center gap-3">
              <button onClick={toggleLanguage} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center gap-1 transition-colors" aria-label="Toggle language">
                <Globe size={16} className="text-gray-800" />
                <span className="font-semibold text-sm text-gray-800">{t('navbar.language')}</span>
              </button>
              <button className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-full font-Poppins font-semibold hover:opacity-90 transition">
                <a
                  href="https://www.linkedin.com/in/salendrawijaya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='flex items-center gap-3'
                >
                  <span className="font-Poppins">{t('navbar.getInTouch')}</span>
                  <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full">
                    <ArrowUpRight className="text-black" size={18} />
                  </div>
                </a>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`
            fixed inset-0 z-[60] transform transition-transform duration-300
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            md:hidden
          `}
        >
          <div className='relative w-full h-full bg-white p-6 flex flex-col items-center justify-center'>
            <button onClick={closeMenu} className='absolute top-6 right-6 p-2' aria-label="Close menu">
              <X size={24} className='text-black' />
            </button>

            <div className='flex flex-col items-center gap-4 w-full max-w-xs'>
              {[
                { label: t('navbar.home'), href: '/' },
                { label: t('navbar.portfolio'), href: '/Portofolio' },
                { label: t('navbar.certificate'), href: '/Certificate' },
                { label: t('navbar.contact'), href: '/Contact' },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  onClick={closeMenu}
                  href={href}
                  className='w-full px-8 py-4 text-center border border-gray-300 rounded-full font-Poppins text-lg text-[#475467] font-semibold hover:bg-gray-50 transition-colors duration-200'
                >
                  {label}
                </a>
              ))}

              <button
                onClick={closeMenu}
                className='w-full px-8 py-4 mt-2 bg-black text-white rounded-full font-Poppins font-semibold hover:opacity-90 transition'
              >
                <a
                  href="https://www.linkedin.com/in/salendrawijaya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className='flex items-center justify-center gap-2'
                >
                  <span className="font-Poppins">{t('navbar.getInTouch')}</span>
                  <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full">
                    <ArrowUpRight className="text-black" size={18} />
                  </div>
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;