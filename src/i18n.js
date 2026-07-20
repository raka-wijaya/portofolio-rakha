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
      "about.desc1": "I am a Full Stack Web Developer and Informatics student at Muhammadiyah University of Sidoarjo with a strong passion for building modern, user-friendly, and scalable web applications. My journey into technology began with a curiosity about how websites work, which gradually grew into a commitment to learning software development.",
      "about.desc2": "I started by learning HTML and CSS independently through online resources before strengthening my fundamentals at Mars Coding, where I studied HTML, CSS, JavaScript, and modern front end development practices. This experience helped me develop a solid understanding of responsive web design and interactive user interfaces.",
      "about.desc3": "As I continued my studies at university, I expanded my knowledge into back end development, databases, and software engineering principles. I learned SQL, database design, RESTful APIs, and server side programming, allowing me to build complete full stack applications from concept to deployment.",
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
      "about.desc1": "Saya adalah seorang Pengembang Web Full Stack dan mahasiswa Informatika di Universitas Muhammadiyah Sidoarjo dengan minat yang kuat dalam membangun aplikasi web modern, ramah pengguna, dan skalabel. Perjalanan saya ke dunia teknologi dimulai dengan rasa ingin tahu tentang cara kerja situs web, yang secara bertahap berkembang menjadi komitmen untuk mempelajari pengembangan perangkat lunak.",
      "about.desc2": "Saya mulai dengan mempelajari HTML dan CSS secara mandiri melalui sumber daya online sebelum memperkuat dasar-dasar saya di Mars Coding, tempat saya mempelajari HTML, CSS, JavaScript, dan praktik pengembangan front end modern. Pengalaman ini membantu saya mengembangkan pemahaman yang solid tentang desain web responsif dan antarmuka pengguna interaktif.",
      "about.desc3": "Saat saya melanjutkan studi di universitas, saya memperluas pengetahuan saya ke pengembangan back end, basis data, dan prinsip-prinsip rekayasa perangkat lunak. Saya mempelajari SQL, desain basis data, API RESTful, dan pemrograman sisi server, yang memungkinkan saya untuk membangun aplikasi fullstack lengkap dari konsep hingga implementasi.",
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
