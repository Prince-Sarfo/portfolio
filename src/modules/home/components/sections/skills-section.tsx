"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { skills } from "@/modules/home/data";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from "@/modules/home/lib/animations";

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-3">
              What I Work With
            </p>
            <h2
              id="skills-heading"
              className="text-3xl sm:text-4xl font-bold text-foreground"
            >
              Skills & Tools
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8">
            {skills.map((group) => (
              <motion.div
                key={group.category}
                variants={scaleIn}
                className="p-6 rounded-2xl border border-border/60 bg-card hover:border-cyan-500/30 transition-colors duration-300"
              >
                <h3 className="font-mono text-xs text-cyan-400 tracking-widest uppercase mb-5">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs font-medium bg-secondary/60 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
