import React, { useState, useEffect } from "react";
import SpotlightCard from "../components/SpotLight/SpotlightCard";
import { Award, Code, Briefcase, MapPin } from "lucide-react";
import CountUp from "../components/CountUp/CountUp";
import { supabase } from "../lib/supabaseClient";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

function MyJourney() {
  const [certificates, setCertificates] = useState(0);
  const [projects, setProjects] = useState(0);
  const [experience, setExperience] = useState({ years: 0, months: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const { data: certData, error: certError } = await supabase
          .from("certificates")
          .select("*");

        if (certError) throw certError;

        const { data: projData, error: projError } = await supabase
          .from("projects")
          .select("*");

        if (projError) throw projError;

        const { data: expData, error: expError } = await supabase
          .from("work_experience")
          .select("*")
          .order("start_date", { ascending: false });

        if (expError) throw expError;

        setCertificates(certData?.length || 0);
        setProjects(projData?.length || 0);

        if (expData && expData.length > 0) {
          let totalMonths = 0;
          expData.forEach((item) => {
            if (!item.start_date) return;
            const start = new Date(item.start_date);
            const end =
              !item.end_date || item.end_date === "0000-00-00"
                ? new Date()
                : new Date(item.end_date);

            // Hitung selisih bulan secara inklusif (hitung bulan awal s.d. bulan akhir)
            let diffMonths =
              (end.getFullYear() - start.getFullYear()) * 12 +
              (end.getMonth() - start.getMonth()) +
              1;
            if (diffMonths > 0) {
              totalMonths += diffMonths;
            }
          });

          const years = Math.floor(totalMonths / 12);
          const months = totalMonths % 12;
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
    <div className="container mx-auto py-6 px-4 md:py-6 md:px-12 mt-5">
     
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">
        <div className="lg:w-1/3 flex-shrink-0">
          <motion.h2
            {...fadeUp(0.05)}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            About Me
          </motion.h2>
        </div>
        <div
          className="lg:w-2/3 flex-grow space-y-4 text-base sm:text-lg"
          style={{ color: "var(--muted-foreground)" }}
        >
          <motion.p {...fadeUp(0.1)}>
            I'm a fullstack web developer focused on developing modern,
            responsive, and efficient websites.
          </motion.p>
          <motion.p {...fadeUp(0.15)}>
            I'm experienced in building applications from the frontend to the
            backend using technologies like React, PHP, and MySQL.
          </motion.p>
          <motion.p {...fadeUp(0.2)}>
            With an eye for detail and performance, I'm committed to creating
            digital solutions that are not only visually appealing but also
            optimal in terms of functionality and user experience.
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">

        <motion.div {...fadeUp(0.1)} className="col-span-2">
          <SpotlightCard
            className="h-full rounded-2xl p-6"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            spotlightColor="rgba(216, 121, 67, 0.12)"
          >
            <div className="flex flex-col gap-6 h-full justify-between">
              <div className="flex justify-between items-start w-full">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ background: "var(--muted)", color: "var(--primary)" }}
                >
                  <Award size={20} />
                </div>
                <span
                  className="text-3xl"
                  style={{ color: "var(--foreground)" }}
                >
                  {loading ? (
                    <span style={{ color: "var(--muted-foreground)" }}>…</span>
                  ) : (
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
              <p
                className="font-semibold uppercase text-xs tracking-widest"
                style={{ color: "var(--muted-foreground)" }}
              >
                Certificates
              </p>
            </div>
          </SpotlightCard>
        </motion.div>

        <motion.div {...fadeUp(0.15)} className="col-span-1">
          <SpotlightCard
            className="h-full rounded-2xl p-6"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            spotlightColor="rgba(95, 135, 135, 0.15)"
          >
            <div className="flex flex-col gap-6 h-full justify-between">
              <div className="flex justify-between items-start w-full">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ background: "var(--muted)", color: "var(--secondary)" }}
                >
                  <Code size={20} />
                </div>
                <span
                  className="text-3xl"
                  style={{ color: "var(--foreground)" }}
                >
                  {loading ? (
                    <span style={{ color: "var(--muted-foreground)" }}>…</span>
                  ) : (
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
              <p
                className="font-semibold uppercase text-xs tracking-widest"
                style={{ color: "var(--muted-foreground)" }}
              >
                Projects
              </p>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Location — 1 col */}
        <motion.div {...fadeUp(0.2)} className="col-span-1">
          <SpotlightCard
            className="h-full rounded-2xl p-6"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            spotlightColor="rgba(216, 121, 67, 0.1)"
          >
            <div className="flex flex-col gap-4 h-full justify-between">
              <div
                className="p-2.5 rounded-xl w-fit"
                style={{ background: "var(--muted)", color: "var(--primary)" }}
              >
                <MapPin size={20} />
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Location
                </p>
                <p
                  className="text-base leading-snug"
                  style={{ color: "var(--foreground)" }}
                >
                  Sidoarjo, Indonesia
                </p>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        <motion.div {...fadeUp(0.25)} className="col-span-2">
          <SpotlightCard
            className="h-full rounded-2xl p-6"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            spotlightColor="rgba(95, 135, 135, 0.12)"
          >
            <div className="flex flex-col gap-6 h-full justify-between">
              <div className="flex justify-between items-start w-full">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ background: "var(--muted)", color: "var(--secondary)" }}
                >
                  <Briefcase size={20} />
                </div>
                <span
                  className="text-2xl text-right"
                  style={{ color: "var(--foreground)" }}
                >
                  {loading ? (
                    <span style={{ color: "var(--muted-foreground)" }}>…</span>
                  ) : (
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
                      <span
                        className="count-up-text text-lg"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {" "}yr{" "}
                      </span>
                      <CountUp
                        from={0}
                        to={experience.months}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text"
                        startCounting={false}
                      />
                      <span
                        className="count-up-text text-lg"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {" "}mo
                      </span>
                    </>
                  )}
                </span>
              </div>
              <p
                className="font-semibold uppercase text-xs tracking-widest"
                style={{ color: "var(--muted-foreground)" }}
              >
                Experience
              </p>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Techstack — 2 cols */}
        <motion.div {...fadeUp(0.3)} className="col-span-2">
          <SpotlightCard
            className="h-full rounded-2xl p-6"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            spotlightColor="rgba(216, 121, 67, 0.08)"
          >
            <div className="flex flex-col gap-4 h-full">
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--muted-foreground)" }}
              >
                Techstack
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "React", color: "#61DAFB" },
{ label: "Next.js", color: "#000000" },
{ label: "PHP", color: "#777BB4" },
{ label: "MySQL", color: "#4479A1" },
{ label: "Laravel", color: "#FF2D20" },
{ label: "Tailwind", color: "#06B6D4" },
{ label: "Git", color: "#F05032" },
{ label: "Figma", color: "#F24E1E" },
{ label: "JavaScript", color: "#F7DF1E" },
{ label: "Python", color: "#3776AB" },
{ label: "Supabase", color: "#3ECF8E" },
{ label: "TypeScript", color: "#3178C6" },
{ label: "Laragon", color: "#1E88E5" },
{ label: "Postman", color: "#FF6C37" },
{ label: "HTML", color: "#E34F26" },
                ].map((tech) => (
                  <span
                    key={tech.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "var(--muted)",
                      color: "var(--foreground)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: tech.color }}
                    />
                    {tech.label}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

      </div>
    </div>
  );
}

export default MyJourney;
