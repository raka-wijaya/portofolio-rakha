import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "navbar.home": "Home",
      "navbar.portfolio": "Portofolio",
      "navbar.certificate": "Certificate",
      "navbar.contact": "Contact",
      "navbar.getInTouch": "Get In Touch",
      "home.title": "I'm a fullstack web developer focused on developing modern, responsive, and efficient websites. I'm experienced in building applications from the frontend to the backend using technologies like React, PHP, and MySQL. With an eye for detail and performance, I'm committed to creating digital solutions that are not only visually appealing but also optimal in terms of functionality and user experience.",
      "about.title": "About Me",
      "about.desc1": "I graduated from Multimedia Vocational High School in 2024. Initially, my interest in the digital world was more focused on the creative side. However, after seeing my uncle work in IT, I was inspired to delve into coding. I began my self-taught journey by learning HTML and CSS through YouTube.",
      "about.desc2": "I realized that self study has its limitations, so I decided to take a course at Mars Coding. There, I gained a strong foundation in HTML, CSS, and JavaScript, paving the way for me to become a Front-End Web Developer.",
      "about.desc3": "After completing the course, I continued my studies at Muhammadiyah University of Sidoarjo, majoring in Informatics. During my studies, I deepened my understanding of SQL and databases. To complement my skills, I also took online courses to master back-end development. This combination enabled me to transform from a Front-End Web Developer to a competent FullStack Web Developer.",
      "about.card1": "Certificates",
      "about.card2": "Projects",
      "about.card3": "Experience",
      "about.card4": "Month",
      "about.card5": "Year",
      "work.title": "Work Experience",
      "work.now": "Now",
      "education.title": "Education",
      "tools.title": "Design",
      "tools.title_1": "Development Toolbox",
      "tools.desc": "A complete set of tools I use to design, develop, and transform ideas into reality through code.",
      "footer.title": "Let's Talk",
      "footer.desc": "Interested in discussing fullstack architecture, scaling web applications, or exploring innovations in modern development? Feel free to reach out let's build something impactful together.",
      "portofolio.title": "Project Showcase",
      "portofolio.desc": "Collection of my technical works and developments",
      "portofolio.button" : "visit project",
      "cert.title": "Certificate Courses",
      "cert.desc": "A collection of my professional certifications",
      "message.title": "Your message has been sent successfully!",
      "contact.title": "I would love to hear from you! Reach out with any questions or feedback",
      "github.title": "GitHub Contributions",
      "github.desc": "Track your contributions to open source projects",
      "navbar.language": "EN"
    }
  },
  id: {
    translation: {
      "navbar.home": "Beranda",
      "navbar.portfolio": "Portofolio",
      "navbar.certificate": "Sertifikat",
      "navbar.contact": "Kontak",
      "navbar.getInTouch": "Hubungi Saya",
      "home.title": "Saya seorang pengembang web fullstack yang fokus pada pengembangan situs web modern, responsif, dan efisien. Saya berpengalaman dalam membangun aplikasi dari frontend hingga backend menggunakan teknologi seperti React, PHP, dan MySQL. Dengan memperhatikan detail dan performa, saya berkomitmen untuk menciptakan solusi digital yang tidak hanya menarik secara visual tetapi juga optimal dalam hal fungsionalitas dan pengalaman pengguna.",
      "about.title": "Tentang Saya",
      "about.desc1": "Saya lulus dari Sekolah Menengah Kejuruan Multimedia pada tahun 2024. Awalnya, minat saya di dunia digital lebih terfokus pada sisi kreatif. Namun, setelah melihat paman saya bekerja di bidang IT, saya terinspirasi untuk mendalami pemrograman. Saya memulai perjalanan belajar otodidak dengan mempelajari HTML dan CSS melalui YouTube.",
      "about.desc2": "Saya menyadari bahwa belajar mandiri memiliki keterbatasan, jadi saya memutuskan untuk mengikuti kursus di Mars Coding. Di sana, saya memperoleh dasar yang kuat dalam HTML, CSS, dan JavaScript, yang membuka jalan bagi saya untuk menjadi seorang Pengembang Web Front-End.",
      "about.desc3": "Setelah menyelesaikan kursus tersebut, saya melanjutkan studi di Universitas Muhammadiyah Sidoarjo, mengambil jurusan Informatika. Selama studi, saya memperdalam pemahaman saya tentang SQL dan basis data. Untuk melengkapi keterampilan saya, saya juga mengambil kursus online untuk menguasai pengembangan back-end. Kombinasi ini memungkinkan saya untuk bertransformasi dari Pengembang Web Front-End menjadi Pengembang Web FullStack yang kompeten.",
      "about.card1": "Sertifikat",
      "about.card2": "Proyek",
      "about.card3": "Pengalaman",
      "about.card4": "Bulan",
      "about.card5": "Tahun",
      "work.title": "Pengalaman Kerja",
      "work.now": "Sekarang",
      "education.title": "Pendidikan",
      "tools.title": "Desain",
      "tools.title_1": "Kotak Peralatan Pengembangan",
      "tools.desc": "Seperangkat lengkap alat yang saya gunakan untuk mendesain, mengembangkan, dan mengubah ide menjadi kenyataan melalui kode.",
      "footer.title": "Mari Bicara",
      "footer.desc": "Tertarik untuk mendiskusikan arsitektur fullstack, penskalaan aplikasi web, atau mengeksplorasi inovasi dalam pengembangan modern? Jangan ragu untuk menghubungi kami, mari kita bangun sesuatu yang berdampak bersama.",
      "portofolio.title": "Pameran Proyek",
      "portofolio.desc": "Kumpulan karya dan pengembangan teknis saya",
      "portofolio.button" : "kunjungan proyek",
      "cert.title": "Sertifikat Kursus",
      "cert.desc": "Kumpulan sertifikat profesional saya",
      "message.title": "Pesan Anda telah berhasil terkirim!",
      "contact.title": "Saya sangat ingin mendengar kabar dari Anda! Silakan hubungi saya jika ada pertanyaan atau masukan.",
      "github.title": "Kontribusi GitHub",
      "github.desc": "Lacak kontribusi Anda ke proyek sumber terbuka",
      "navbar.language": "ID"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;
