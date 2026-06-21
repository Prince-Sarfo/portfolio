"use client";

import Image from "next/image";
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
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
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

const stats = [
  { value: "3+", label: "Years experience" },
  { value: "6+", label: "Projects shipped" },
  { value: "4", label: "Companies worked with" },
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
        className="max-w-4xl w-full"
      >
        {/* Top row: tagline + photo */}
        <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-10 mb-10">
          {/* Left: identity */}
          <div className="flex-1 text-left">
            <motion.p
              variants={item}
              className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-5"
            >
              Based in {siteConfig.location}
            </motion.p>

            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6"
            >
              Builder.
              <br />
              Engineer.
              <br />
              <span className="text-cyan-400">Creator.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed mb-8"
            >
              {siteConfig.tagline}
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-4 mb-8"
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
                download="Prince_Sarfo_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                )}
              >
                Download CV
              </a>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-5">
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
          </div>

          {/* Right: photo */}
          <motion.div variants={item} className="shrink-0">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
              <div className="absolute inset-0 rounded-2xl bg-cyan-500/10 border border-cyan-500/20" />
              <Image
                src="/profile.png"
                alt={siteConfig.name}
                fill
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          variants={item}
          className="grid grid-cols-3 gap-4 border-t border-border/60 pt-8"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="text-left">
              <p className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                {value}
              </p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
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
