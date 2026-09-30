import React from "react";
import {
  Github,
  Instagram,
  Linkedin,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

import MyJourney from "./MyJourney";
import MyWork from "./Mywork";
import MyEducation from "./MyEducation";
import Tools from "../pages/Tools";
import Footer from "./Footer";
import GithubChart from "./Github";
import Lanyard from "../components/Lanyard/Lanyard";
import TextType from "../components/TextType/TextType";

function Home() {
  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-4">
        
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left z-10 order-2 lg:order-1"
          >
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.1rem] xl:text-4xl 2xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 max-w-3xl lg:whitespace-nowrap">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">
                Salendra Rakha Wijaya
              </span>
            </h1>

            <TextType
              as="p"
              className="text-base sm:text-xl font-semibold text-foreground mb-4 flex items-center justify-center lg:justify-start gap-2"
              text={[
                "Fullstack Web Developer & UI Enthusiast",
                "Happy coding!",
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor
              cursorCharacter="|"
              deletingSpeed={50}
              variableSpeedEnabled={false}
              variableSpeedMin={60}
              variableSpeedMax={120}
              cursorBlinkDuration={0.5}
            />

            <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed mb-7 sm:mb-8">
              Building scalable, responsive web applications with clean code,
              modern interfaces, and seamless user experiences.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-7 sm:mb-8">
              <a
                href="https://www.linkedin.com/in/salendrawijaya/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-primary text-primary-foreground px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-medium text-sm hover:brightness-110 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <span>Get In Touch</span>

                <div className="w-6 h-6 flex items-center justify-center bg-primary-foreground text-primary rounded-full group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight size={14} />
                </div>
              </a>

              <a
                href="/Portofolio"
                className="flex items-center gap-2 border border-border px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-medium text-sm text-foreground hover:bg-muted transition-all active:scale-95"
              >
                <Sparkles size={16} className="text-primary" />
                <span>View Projects</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
              <a
                href="https://github.com/raka-wijaya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/80 border border-border hover:border-primary/50 text-foreground hover:text-primary transition-all shadow-sm"
              >
                <Github size={17} />
                <span className="text-xs font-medium">raka-wijaya</span>
              </a>

              <a
                href="https://www.instagram.com/rakha_wijaya1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/80 border border-border hover:border-primary/50 text-foreground hover:text-primary transition-all shadow-sm"
              >
                <Instagram size={17} />
                <span className="text-xs font-medium">rakha_wijaya1</span>
              </a>

              <a
                href="https://www.linkedin.com/in/salendrawijaya/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/80 border border-border hover:border-primary/50 text-foreground hover:text-primary transition-all shadow-sm"
              >
                <Linkedin size={17} />
                <span className="text-xs font-medium">salendrawijaya</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2 w-full"
          >
           
            <div className="w-full h-[530px] sm:h-[530px] md:h-[550px] lg:h-[570px]">
              <Lanyard className="relative z-0 w-full h-full flex justify-center items-center" />
            </div>
          </motion.div>
        </div>
      </section>

      <MyJourney />
      <MyWork />
      <MyEducation />
      <Tools />
      <GithubChart />
      <Footer />
    </>
  );
}

export default Home;
