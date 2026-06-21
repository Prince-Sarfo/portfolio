"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub, FaGooglePlay, FaAppStore } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/modules/home/data";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-3">
              Things I&apos;ve Built
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Projects
            </h2>
          </motion.div>

          {/* Featured */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featured.map((project) => (
              <motion.article
                key={project.title}
                variants={fadeUp}
                className="group flex flex-col p-6 rounded-2xl border border-border/60 bg-card hover:border-cyan-500/30 hover:shadow-[0_0_40px_-12px] hover:shadow-cyan-500/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <span className="text-cyan-400 text-lg font-bold">
                      {project.title[0]}
                    </span>
                  </div>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <FaGithub size={17} />
                      </a>
                    )}
                    {"playStoreUrl" in project && project.playStoreUrl && (
                      <a
                        href={project.playStoreUrl as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Google Play"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <FaGooglePlay size={15} />
                      </a>
                    )}
                    {"appStoreUrl" in project && project.appStoreUrl && (
                      <a
                        href={project.appStoreUrl as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="App Store"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <FaAppStore size={17} />
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live site"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink size={17} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-semibold text-foreground mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          {/* Other projects */}
          {others.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-4">
              {others.map((project) => (
                <motion.article
                  key={project.title}
                  variants={fadeUp}
                  className="group flex items-start gap-4 p-5 rounded-xl border border-border/60 bg-card hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-foreground group-hover:text-cyan-400 transition-colors text-sm">
                        {project.title}
                      </h3>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <FaGithub size={15} />
                          </a>
                        )}
                        {"playStoreUrl" in project && project.playStoreUrl && (
                          <a
                            href={project.playStoreUrl as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Google Play"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <FaGooglePlay size={13} />
                          </a>
                        )}
                        {"appStoreUrl" in project && project.appStoreUrl && (
                          <a
                            href={project.appStoreUrl as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="App Store"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <FaAppStore size={15} />
                          </a>
                        )}
                        {project.liveUrl && project.liveUrl !== "#" && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Live"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="text-xs px-2 py-0"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
