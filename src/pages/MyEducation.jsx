import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion } from "framer-motion";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

function MyEducation() {
  const [eduData, setEduData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error("Error fetch education:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  if (loading) {
    return (
      <section className="w-full px-4 sm:px-6 lg:px-10 py-10 font-sans">
        <div className="text-center mb-10">
          <div className="skeleton h-12 w-64 mx-auto"></div>
        </div>

        <div className="w-full flex flex-col gap-6">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="skeleton w-3.5 h-3.5 rounded-full"></div>

                {index === 0 && (
                  <div className="skeleton w-0.5 h-40 mt-2"></div>
                )}
              </div>

              <div className="flex-1 skeleton h-48 rounded-2xl"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-10 font-sans">
      {/* TITLE */}
      <div className="text-center mb-10 sm:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="
            text-3xl
            sm:text-4xl
            lg:text-5xl
            font-bold
            text-[var(--foreground)]
            font-Poppins
          "
        >
          Education
        </motion.h2>
      </div>

      {/* TIMELINE */}
      <div className="w-full">
        <Timeline
          sx={{
            p: 0,
            m: 0,
            width: "100%",

            "& .MuiTimelineItem-root": {
              width: "100%",
              minHeight: 0,
            },

            "& .MuiTimelineItem-root::before": {
              display: "none",
            },

            "& .MuiTimelineSeparator-root": {
              flex: "0 0 24px",
            },

            "& .MuiTimelineContent-root": {
              flex: 1,
              minWidth: 0,
            },
          }}
        >
          {eduData.map((edu, index) => (
            <TimelineItem key={edu.id}>
              {/* TIMELINE DOT */}
              <TimelineSeparator>
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                >
                  <TimelineDot
                    sx={{
                      bgcolor: "var(--primary)",
                      width: 12,
                      height: 12,
                      margin: 0,
                      border: "none",
                      boxShadow:
                        "0 0 10px color-mix(in srgb, var(--primary) 55%, transparent)",
                    }}
                  />
                </motion.div>

                {index < eduData.length - 1 && (
                  <TimelineConnector
                    sx={{
                      width: "2px",
                      bgcolor: "var(--border)",
                    }}
                  />
                )}
              </TimelineSeparator>

              {/* CONTENT */}
              <TimelineContent
                sx={{
                  paddingTop: 0,
                  paddingBottom: "32px",
                  paddingLeft: {
                    xs: "12px",
                    sm: "20px",
                    md: "24px",
                  },
                  paddingRight: 0,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  className="w-full"
                >
                  {/* CARD */}
                  <div
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-[var(--border)]
                      bg-[var(--card)]
                      p-5
                      sm:p-6
                      md:p-7
                      text-left
                    "
                  >
                    {/* DATE */}
                    <p
                      className="
                        text-xs
                        sm:text-sm
                        font-semibold
                        tracking-wide
                        text-[var(--muted-foreground)]
                        mb-3
                      "
                    >
                      {new Date(edu.start_date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      )}{" "}
                      -{" "}
                      {!edu.end_date ||
                      edu.end_date === "0000-00-00"
                        ? "Current"
                        : new Date(edu.end_date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              year: "numeric",
                            }
                          )}
                    </p>

                    {/* MAIN CONTENT */}
                    <div
                      className="
                        flex
                        flex-col
                        sm:flex-row
                        items-start
                        gap-4
                        sm:gap-5
                      "
                    >
                      {/* SCHOOL LOGO */}
                      {edu.image && (
                        <img
                          src={edu.image}
                          alt={edu.school_name}
                          className="
                            w-14
                            h-14
                            sm:w-16
                            sm:h-16
                            object-cover
                            rounded-xl
                            border
                            border-[var(--border)]
                            shrink-0
                            mx-auto
                            sm:mx-0
                          "
                        />
                      )}

                      {/* INFORMATION */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="
                            text-lg
                            sm:text-xl
                            font-bold
                            text-[var(--foreground)]
                            leading-snug
                            text-center
                            sm:text-left
                          "
                        >
                          {edu.school_name_en || edu.school_name}
                        </h3>

                        {edu.major && (
                          <p
                            className="
                              mt-1
                              text-sm
                              sm:text-base
                              text-[var(--primary)]
                              font-semibold
                              text-center
                              sm:text-left
                            "
                          >
                            {edu.major}
                          </p>
                        )}

                        {(edu.description_en || edu.description) && (
                          <p
                            className="
                              mt-2
                              text-sm
                              sm:text-base
                              text-[var(--foreground)]/80
                              leading-relaxed
                              text-justify
                            "
                          >
                            {edu.description_en || edu.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* BOTTOM */}
                    {(edu.skills_learned_en || edu.skills_learned) && (
                      <div
                        className="
                          flex
                          flex-wrap
                          gap-2
                          pt-4
                          mt-5
                          border-t
                          border-[var(--border)]/50
                        "
                      >
                        {(edu.skills_learned_en || edu.skills_learned)
                          .split(",")
                          .map((skill, index) => (
                            <span
                              key={index}
                              className="
                                border
                                border-[var(--border)]
                                bg-[var(--muted)]
                                text-[var(--muted-foreground)]
                                px-3
                                py-1
                                text-xs
                                sm:text-sm
                                rounded-full
                              "
                            >
                              {skill.trim()}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}

export default MyEducation;