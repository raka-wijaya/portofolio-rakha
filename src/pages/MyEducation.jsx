import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion } from "framer-motion";
import BorderGlow from "../components/BorderGlow/BorderGlow";

function MyEducation() {
  const [eduData, setEduData] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const { data, error } = await supabase
          .from("education")
          .select("*")
          .order("start_date", { ascending: false });

        if (error) throw error;

        setEduData(data || []);
      } catch (error) {
        console.error("Gagal ambil data:", error.message);
      }
    };

    fetchEducation();
  }, []);

  return (
    <div className="container mx-auto py-6 px-4 md:px-12 mt-5 font-sans">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="lg:w-1/3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
          >
            Education
          </motion.h2>
        </div>

        <div className="lg:w-2/3 flex flex-col gap-6">
          {eduData.length > 0 ? (
            eduData.map((edu) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                key={edu.id}
                className="w-full"
              >
                <BorderGlow className="p-6 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row gap-5 mb-4 items-center sm:items-start">
                    {edu.image && (
                      <img
                        src={edu.image}
                        alt={edu.school_name}
                        className="w-16 h-16 object-cover rounded-xl border border-[var(--border)] shrink-0"
                      />
                    )}

                    <div className="flex flex-col gap-3 text-center sm:text-left flex-1">
                      <div>
                        <h1 className="font-semibold text-lg text-[var(--foreground)]">
                          {edu.school_name_en || edu.school_name}
                        </h1>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          {edu.major}
                        </p>
                      </div>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {new Date(edu.start_date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        -{" "}
                        {!edu.end_date || edu.end_date === "0000-00-00"
                          ? "Now"
                          : new Date(edu.end_date).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                      </p>

                      <p className="text-sm text-[var(--foreground)]/80 whitespace-pre-line text-justify leading-relaxed">
                        {edu.description || edu.description_en}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {(edu.skills_learned_en || edu.skills_learned)
                      ?.split(",")
                      .map((skill, index) => (
                        <span
                          key={index}
                          className="border border-[var(--border)] bg-[var(--muted)] text-[var(--muted-foreground)] px-3 py-1 text-sm rounded-full transition-colors duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                  </div>
                </BorderGlow>
              </motion.div>
            ))
          ) : (
            <div className="text-[var(--muted-foreground)]">
              No educational history was found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyEducation;
