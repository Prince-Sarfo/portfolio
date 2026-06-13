"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/modules/home/data";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-3">
              Where I&apos;ve Worked
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Experience
            </h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border/60 -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  variants={fadeUp}
                  className={`relative flex flex-col md:flex-row gap-6 ${
                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 border-2 border-background top-2 z-10" />

                  {/* Card */}
                  <div
                    className={`md:w-[calc(50%-2rem)] p-6 rounded-2xl border border-border/60 bg-card hover:border-cyan-500/30 transition-colors duration-300 ${
                      i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {exp.role}
                        </h3>
                        <p className="text-cyan-400 text-sm font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground whitespace-nowrap shrink-0">
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
        </motion.div>
      </div>
    </section>
  );
}
