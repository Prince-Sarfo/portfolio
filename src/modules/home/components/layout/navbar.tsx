"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useScrollDirection } from "@/modules/home/hooks/use-scroll-direction";
import { useActiveSection } from "@/modules/home/hooks/use-active-section";
import { siteConfig } from "@/modules/home/data";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = navLinks.map((l) => l.href.slice(1));

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrollDirection();
  const active = useActiveSection(sectionIds);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-mono text-sm font-semibold text-primary tracking-widest uppercase"
        >
          {siteConfig.name.split(" ")[0]}
          <span className="text-cyan-400">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm transition-colors duration-200 ${
                  active === link.href.slice(1)
                    ? "text-cyan-400"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/ai"
              className="text-xs font-bold text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 bg-cyan-950/20 hover:bg-cyan-500/10 px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              AI Twin
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/50"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm transition-colors ${
                      active === link.href.slice(1)
                        ? "text-cyan-400"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/ai"
                  onClick={() => setMobileOpen(false)}
                  className="text-xs font-bold text-cyan-400 border border-cyan-500/30 bg-cyan-950/20 px-3.5 py-2 rounded-full inline-flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  AI Twin
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
