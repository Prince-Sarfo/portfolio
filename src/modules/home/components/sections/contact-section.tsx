"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { siteConfig } from "@/modules/home/data";
import {
  fadeUp,
  scaleIn,
  slideInLeft,
  staggerContainer,
  viewportOnce,
} from "@/modules/home/lib/animations";

const links = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: siteConfig.socials.github,
    handle: "@Prince-Sarfo",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: siteConfig.socials.linkedin,
    handle: "prince-sarfo",
  },
  {
    icon: MdEmail,
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    handle: siteConfig.email,
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-32 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.15)}
        >
          {/* Headline */}
          <motion.div variants={fadeUp} className="mb-16">
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-6">
              Get In Touch
            </p>
            <h2
              id="contact-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6"
            >
              Got an interesting
              <br />
              problem?{" "}
              <span className="text-cyan-400">Let&apos;s build it.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              I&apos;m open to freelance work, full-time roles, and interesting
              side projects. If you have something in mind, reach out.
            </p>
          </motion.div>

          {/* Primary CTA */}
          <motion.div variants={scaleIn} className="mb-16">
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex items-center gap-3 text-2xl sm:text-3xl font-semibold text-foreground hover:text-cyan-400 transition-colors duration-200"
            >
              {siteConfig.email}
              <ArrowUpRight
                size={28}
                className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200"
              />
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={staggerContainer(0.1)}
            className="flex flex-col sm:flex-row gap-6 border-t border-border/60 pt-10"
          >
            {links.map(({ icon: Icon, label, href, handle }) => (
              <motion.a
                key={label}
                variants={slideInLeft}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-lg border border-border/60 bg-card group-hover:border-cyan-500/30 flex items-center justify-center transition-colors duration-200">
                  <Icon size={17} />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
                    {label}
                  </p>
                  <p className="text-sm text-foreground">{handle}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
