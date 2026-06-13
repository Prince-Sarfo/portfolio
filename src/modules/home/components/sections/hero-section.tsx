"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/modules/home/data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const socials = [
  { icon: FaGithub, href: siteConfig.socials.github, label: "GitHub" },
  { icon: FaLinkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { icon: MdEmail, href: `mailto:${siteConfig.email}`, label: "Email" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] -z-10" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl w-full text-center"
      >
        <motion.p
          variants={item}
          className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-4"
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          variants={item}
          className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground mb-4"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.h2
          variants={item}
          className="text-xl sm:text-2xl font-medium text-muted-foreground mb-6"
        >
          {siteConfig.role}
        </motion.h2>

        <motion.p
          variants={item}
          className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a
            href="#projects"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-cyan-500 hover:bg-cyan-400 text-black font-semibold border-transparent",
            )}
          >
            View My Work
          </a>
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Download CV
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="flex items-center justify-center gap-5"
        >
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground hover:text-cyan-400 transition-colors duration-200"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-cyan-400 transition-colors"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}
