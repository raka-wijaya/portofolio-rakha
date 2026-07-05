import React, { useEffect } from 'react'
import Squares from '../components/Squares/Squares'
import { Github, Instagram } from 'lucide-react';
import { ArrowRight } from "lucide-react";
import MyJourney from './MyJourney';
import MyWork from './Mywork'
import MyEducation from './MyEducation';
import image from "../assets/image/Screenshot 2025-05-25 080528.png"
import Tools from '../pages/Tools'
import ShinyText from '../components/ShinyText/ShinyText';
import Footer from './Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';
import GithubChart from './Github';

function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 500,
    })
  },[])

  return (
    <>
    <div className='relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center'>
      <div className='absolute inset-0 -z-10'>
      <Squares 
        speed={0.5} 
        squareSize={50}
        direction='diagonal'
        borderColor='#F0F0F0'
        hoverFillColor='#F8F8F9'
      />
      </div>
      <div className='mt-16 flex flex-col justify-center items-center p-4 text-center'>
        <div className='relative flex flex-col md:flex-row justify-center items-center w-full max-w-2xl mb-7 md:mb-10'>
          <img 
            src={image}
            alt="Profile"
            data-aos="fade-up"
            data-aos-delay="50"
            className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover border-4 border-white shadow-lg mb-4 md:mb-0"
          />
          <div data-aos="fade-up" data-aos-delay="100" className='absolute top-1/4 -left-16 hidden md:flex items-center p-2 bg-white rounded-lg shadow-lg'>
            <Github className='text-xl text-pink-500 mr-2'/>
            <span className='text-sm font-medium font-Poppins'>
              <ShinyText
              text="raka-wijaya"
              speed={2}
              delay={0}
              color="#000000"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
              />
            </span>
          </div>

          <div data-aos="fade-up" data-aos-delay="150" className='absolute top-1/4 -right-16 hidden md:flex items-center p-2 bg-white rounded-lg shadow-lg'>
            <Instagram className='text-xl text-purple-600 mr-2'/>
            <span className='text-sm font-medium font-Poppins'>
              <ShinyText
              text="rakha_wijaya1"
              speed={2}
              delay={0}
              color="#000000"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
              />
            </span>
          </div>

          <div className='flex gap-4 md:hidden mt-4'>
            <a data-aos="fade-right" data-aos-delay="100" href="https://github.com/raka-wijaya" target="_blank" rel="noopener noreferrer" className="flex items-center p-2 bg-white rounded-lg shadow-lg">
              <Github className='text-xl text-pink-500'/>
            </a>
            <a data-aos="fade-left" data-aos-delay="150" href="https://www.instagram.com/rakha_wijaya1/" target="_blank" rel="noopener noreferrer" className="flex items-center p-2 bg-white rounded-lg shadow-lg">
              <Instagram className='text-xl text-purple-600'/>
            </a>
          </div>
        </div>

        <div className='flex gap-2 sm:gap-4 mb-4 justify-center'>
          <div data-aos="fade-up" data-aos-delay="200" className='bg-white rounded-full shadow-lg px-3 py-1 font-Poppins w-fit'>
          <ShinyText
          text="Fullstack Web Developer"
          speed={2}
          delay={0}
          color="#000000"
          shineColor="#ffffff"
          spread={120}
          direction="left"
          yoyo={false}
          pauseOnHover={false}
          disabled={false}
          /> 
          </div>
        </div>

        <h1 data-aos="fade-up" data-aos-delay="250" className='mb-2 font-Poppins text-2xl md:text-5xl text-center'>
          Salendra Rakha Wijaya
        </h1>
        
        <p data-aos="fade-up" data-aos-delay="300" className='text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mb-5 sm:mb-7 mx-auto px-4 font-Poppins'>
          {t('home.title')}
        </p>

        <button data-aos="fade-up" data-aos-delay="350" className="flex items-center gap-4 bg-black text-white px-5 py-3 rounded-full font-Poppins font-semibold hover:opacity-90 transition">
            <a 
              href="https://www.linkedin.com/in/salendrawijaya/"
              target="_blank"
              rel="noopener noreferrer"
              className='flex items-center gap-4'
            >
              <span className='text-base font-Poppins font-medium'>{t('navbar.getInTouch')}</span>
              <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full">
                <ArrowRight className="text-black" size={18} />
              </div>
            </a>
        </button>
      </div>
    </div>
    <MyJourney />
    <MyWork/>
    <MyEducation/>
    <Tools/>
    <GithubChart/>
    <Footer/>
    </>
  )
}

export default Home