"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/modules/home/data";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function ContactSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire up your preferred email service here (Resend, Formspree, etc.)
    setSent(true);
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div variants={fadeUp}>
            <p className="font-mono text-sm text-cyan-400 tracking-widest uppercase mb-3">
              Get In Touch
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Let&apos;s Work Together
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-12">
              Have a project in mind or just want to say hello? My inbox is
              always open. I&apos;ll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="space-y-4 text-left"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm text-muted-foreground">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="bg-card border-border/60 focus:border-cyan-500/50"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm text-muted-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={siteConfig.email}
                  required
                  className="bg-card border-border/60 focus:border-cyan-500/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="subject"
                className="text-sm text-muted-foreground"
              >
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                placeholder="Project inquiry"
                required
                className="bg-card border-border/60 focus:border-cyan-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="text-sm text-muted-foreground"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                rows={5}
                required
                className="bg-card border-border/60 focus:border-cyan-500/50 resize-none"
              />
            </div>

            {sent ? (
              <p className="text-center text-sm text-cyan-400 py-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                Thanks! I&apos;ll get back to you soon.
              </p>
            ) : (
              <Button
                type="submit"
                size="lg"
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold gap-2"
              >
                <Send size={16} />
                Send Message
              </Button>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
