"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { experiences, education } from "@/modules/home/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.div variants={fadeUp} className="mb-16">
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-3">
              Where I&apos;ve Worked
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Experience
            </h2>
          </motion.div>

          {/* Work experience */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border/60" />

            <div className="space-y-10">
              {experiences.map((exp) => (
                <motion.div
                  key={`${exp.company}-${exp.period}`}
                  variants={fadeUp}
                  className="relative pl-8"
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-[6px] w-[15px] h-[15px] rounded-full border-2 border-cyan-400 bg-background" />

                  <div className="p-5 rounded-xl border border-border/60 bg-card hover:border-cyan-500/30 transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {exp.role}
                        </h3>
                        <p className="text-cyan-400 text-sm font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground whitespace-nowrap shrink-0 mt-0.5">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <motion.div variants={fadeUp} className="mt-20">
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-3">
              Education
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10">
              Academic Background
            </h2>

            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border/60" />
              <div className="space-y-6">
                {education.map((edu) => (
                  <motion.div
                    key={edu.institution}
                    variants={fadeUp}
                    className="relative pl-8"
                  >
                    <div className="absolute left-0 top-[6px] w-[15px] h-[15px] rounded-full border-2 border-cyan-400 bg-background" />
                    <div className="p-5 rounded-xl border border-border/60 bg-card hover:border-cyan-500/30 transition-colors duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {edu.degree}
                          </h3>
                          <p className="text-cyan-400 text-sm font-medium">
                            {edu.institution}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {edu.location}
                          </p>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground whitespace-nowrap shrink-0 mt-0.5">
                          {edu.period}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
