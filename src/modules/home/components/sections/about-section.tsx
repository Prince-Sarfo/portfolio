"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
import { siteConfig } from "@/modules/home/data";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Profile photo */}
          <motion.div
            variants={fadeUp}
            className="flex justify-center md:justify-start"
          >
            <div className="relative">
              <div className="w-64 h-56 sm:w-80 sm:h-72 rounded-2xl overflow-hidden border border-cyan-500/20">
                <Image
                  src="/profile.png"
                  alt={siteConfig.name}
                  width={320}
                  height={288}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
              {/* Decorative border */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-cyan-500/20 -z-10" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={fadeUp} className="space-y-6">
            <div>
              <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-3">
                About Me
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Crafting digital experiences that matter
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {siteConfig.bio}
            </p>

            <p className="text-muted-foreground leading-relaxed">
              When I&apos;m not pushing pixels or wiring up APIs, I write about
              web development, contribute to open source, and explore the
              intersection of design and engineering.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={15} className="text-cyan-400 shrink-0" />
                {siteConfig.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={15} className="text-cyan-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
