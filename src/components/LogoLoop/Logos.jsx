import LogoLoop from './LogoLoop';
import { FaReact, FaHtml5, FaCss3, FaFigma, FaLaravel, FaPhp, FaGithub, FaGitAlt, FaNpm } from "react-icons/fa";
import { RiTailwindCssFill, RiJavascriptFill } from "react-icons/ri";
import { SiPostman, SiMysql } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";

const techLogos = [
  { node: <FaReact />, title: "React" },
  { node: <RiTailwindCssFill />, title: "Tailwind CSS" },
  { node: <RiJavascriptFill />, title: "JavaScript" },
  { node: <FaHtml5 />, title: "Tailwind CSS" },
  { node: <FaCss3 />, title: "CSS" },
  { node: <FaFigma />, title: "Figma" },
  { node: <BiLogoTypescript />, title: "TypeScript" },
  { node: <FaLaravel />, title: "Laravel" },
  { node: <FaPhp />, title: "PHP" },
  { node: <FaGithub />, title: "GitHub" },
  { node: <FaGitAlt />, title: "Git" },
  { node: <FaNpm />, title: "npm" },
  { node: <SiPostman />, title: "Postman" },
  { node: <SiMysql />, title: "MySQL" },
];


function Logos() {
  return (
    <div style={{ height: '100px', position: 'relative', overflow: 'hidden'}}>  
      {/* Vertical loop with deceleration on hover */}
      <LogoLoop
        logos={techLogos}
        speed={100}
        direction="left"
        logoHeight={60}
        gap={60}
        hoverSpeed={0}
        fadeOut
  useCustomRender={false}
/>
    </div>
  );
}

export default Logos;