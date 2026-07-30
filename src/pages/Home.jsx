import React from 'react'
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
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GithubChart from './Github';

function Home() {
  const { t } = useTranslation();

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
          <motion.img 
            src={image}
            alt="Profile"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover border-4 border-white shadow-lg mb-4 md:mb-0"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='absolute top-1/4 -left-16 hidden md:flex items-center p-2 bg-white rounded-lg shadow-lg'
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className='absolute top-1/4 -right-16 hidden md:flex items-center p-2 bg-white rounded-lg shadow-lg'
          >
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
          </motion.div>

          <div className='flex gap-4 md:hidden mt-4'>
            <motion.a
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              href="https://github.com/raka-wijaya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-2 bg-white rounded-lg shadow-lg"
            >
              <Github className='text-xl text-pink-500'/>
            </motion.a>
            <motion.a
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              href="https://www.instagram.com/rakha_wijaya1/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-2 bg-white rounded-lg shadow-lg"
            >
              <Instagram className='text-xl text-purple-600'/>
            </motion.a>
          </div>
        </div>

        <div className='flex gap-2 sm:gap-4 mb-4 justify-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='bg-white rounded-full shadow-lg px-3 py-1 font-Poppins w-fit'
          >
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
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className='mb-2 font-Poppins text-2xl md:text-5xl text-center'
        >
          Salendra Rakha Wijaya
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mb-5 sm:mb-7 mx-auto px-4 font-Poppins'
        >
          {t('home.title')}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center gap-4 bg-black text-white px-5 py-3 rounded-full font-Poppins font-semibold hover:opacity-90 transition"
        >
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
        </motion.button>
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