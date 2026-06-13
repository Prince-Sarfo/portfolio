"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Volume2,
  VolumeX,
  ChevronRight,
  Play,
  Square,
  MessageSquare,
} from "lucide-react";
import { useSpeech } from "@/hooks/use-speech";
import { siteConfig } from "@/modules/home/data";

interface TourStep {
  elementId: string | null; // null means top of page (hero)
  title: string;
  speechText: string;
  displayText: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    elementId: null,
    title: "Introduction",
    speechText: `Welcome! I'm Prince's AI Twin. Let me show you around his portfolio. He is a software engineer working on both web and mobile experiences.`,
    displayText:
      "Welcome! I'm Prince's AI Twin. Let me show you around his portfolio. He is a software engineer working on both web and mobile experiences.",
  },
  {
    elementId: "about",
    title: "About Prince",
    speechText:
      "Here is the About section. Prince is based in Ghana. He is passionate about crafting scalable web applications, clean code, and great user experiences.",
    displayText:
      "Here is the About section. Prince is based in Ghana. He is passionate about crafting scalable web applications, clean code, and great user experiences.",
  },
  {
    elementId: "skills",
    title: "Core Stack",
    speechText:
      "Here are Prince's technical skills. He specializes in React, Next.js, and TypeScript on the frontend, and Node.js with PostgreSQL on the backend.",
    displayText:
      "Here are Prince's technical skills. He specializes in React, Next.js, and TypeScript on the frontend, and Node.js with PostgreSQL on the backend.",
  },
  {
    elementId: "experience",
    title: "Professional Experience",
    speechText:
      "Prince has worked as a Senior Frontend Engineer at Stripe leading dashboard redesigns, and at Vercel contributing to the Next.js ecosystem.",
    displayText:
      "Prince has worked as a Senior Frontend Engineer at Stripe leading dashboard redesigns, and at Vercel contributing to the Next.js ecosystem.",
  },
  {
    elementId: "projects",
    title: "Featured Projects",
    speechText:
      "These are his featured projects, including Horizon Dashboard for real-time analytics, Craft CMS, and AI color generators.",
    displayText:
      "These are his featured projects, including Horizon Dashboard for real-time analytics, Craft CMS, and AI color generators.",
  },
  {
    elementId: "contact",
    title: "Get in Touch",
    speechText: `If you would like to work with Prince, you can email him at ${siteConfig.email} or use this contact form to send him a direct message.`,
    displayText: `If you would like to work with Prince, you can email him at ${siteConfig.email} or use this contact form to send him a direct message.`,
  },
];

export function AIGuideWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [mute, setMute] = useState(false);
  const [showWelcomeBadge, setShowWelcomeBadge] = useState(true);

  const { speak, stopSpeaking, isSpeaking, supported } = useSpeech();

  // Hide welcome badge after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeBadge(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Handle tour step activation
  const activateStep = (stepIndex: number) => {
    setTourStep(stepIndex);
    const step = TOUR_STEPS[stepIndex];

    // Scroll to element
    if (step.elementId === null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(step.elementId);
      if (el) {
        // Scroll slightly above the section header
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }

    // Speak text
    if (!mute && supported.speechSynthesis) {
      speak(step.speechText);
    }
  };

  const startTour = () => {
    setIsOpen(true);
    setShowWelcomeBadge(false);
    activateStep(0);
  };

  const stopTour = () => {
    stopSpeaking();
    setTourStep(null);
  };

  const nextStep = () => {
    if (tourStep !== null && tourStep < TOUR_STEPS.length - 1) {
      activateStep(tourStep + 1);
    } else {
      stopTour();
    }
  };

  const toggleMute = () => {
    if (!mute) {
      stopSpeaking();
    } else if (tourStep !== null) {
      speak(TOUR_STEPS[tourStep].speechText);
    }
    setMute(!mute);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 font-sans">
      {/* Floating Welcome Bubble Badge */}
      <AnimatePresence>
        {showWelcomeBadge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#121216]/95 border border-white/10 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl max-w-xs text-right mr-2 flex flex-col gap-1.5"
          >
            <p className="text-xs text-muted-foreground leading-relaxed">
              👋 Hi! I&apos;m Prince&apos;s AI Twin. Let me give you a quick
              voice tour of his work!
            </p>
            <button
              onClick={startTour}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 self-end flex items-center gap-1"
            >
              Start Tour <ChevronRight size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen ? (
          /* Expanded Card Overlay */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[340px] sm:w-[360px] bg-[#121216]/95 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-5 relative overflow-hidden"
          >
            {/* Top color bar */}
            <div className="absolute top-0 left-0 w-full h-px bg-cyan-500/60" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-cyan-400 animate-pulse" />
                <span className="text-sm font-bold bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  AI Portfolio Twin
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                  title={mute ? "Unmute Voice" : "Mute Voice"}
                >
                  {mute ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    stopTour();
                  }}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Tour Content */}
            {tourStep !== null ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-mono text-cyan-400/80 tracking-wider">
                    Tour Step {tourStep + 1} of {TOUR_STEPS.length}:{" "}
                    {TOUR_STEPS[tourStep].title}
                  </span>
                  <p className="text-sm text-foreground mt-1.5 leading-relaxed">
                    {TOUR_STEPS[tourStep].displayText}
                  </p>
                </div>

                {/* Speech Sound Wave Animation while speaking */}
                {isSpeaking && !mute && (
                  <div className="flex items-center gap-1 h-3 pt-1">
                    {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                      <motion.span
                        key={i}
                        animate={{ height: ["4px", `${h * 4}px`, "4px"] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          delay: i * 0.08,
                          ease: "easeInOut",
                        }}
                        className="w-1 bg-cyan-400 rounded-full"
                      />
                    ))}
                  </div>
                )}

                {/* Tour Navigation Controls */}
                <div className="flex items-center justify-between border-t border-white/5 pt-3.5">
                  <button
                    onClick={stopTour}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 font-medium"
                  >
                    <Square size={12} /> Stop Tour
                  </button>
                  <button
                    onClick={nextStep}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-lg shadow-cyan-500/10"
                  >
                    {tourStep === TOUR_STEPS.length - 1 ? "Finish" : "Next"}{" "}
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ) : (
              /* Intro Choice View */
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Would you like a quick voice-guided tour of Prince
                  Sarfo&apos;s achievements, or to talk to his AI twin in a
                  full-screen chat?
                </p>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={startTour}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10"
                  >
                    <Play size={14} fill="black" /> Start Guided Voice Tour
                  </button>
                  <Link
                    href="/ai"
                    onClick={() => {
                      setIsOpen(false);
                      stopTour();
                    }}
                    className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-foreground font-semibold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={14} /> Full Interactive AI Twin
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          /* Minimized Glowing Button Trigger */
          <motion.button
            layoutId="ai-widget-trigger"
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-[#0d0d18] hover:scale-105 rounded-full flex items-center justify-center shadow-2xl relative transition-transform duration-300 border border-cyan-500/40 shadow-cyan-500/20"
          >
            {/* Glowing ripple */}
            <span className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping -z-10 pointer-events-none" />
            <Sparkles size={22} className="text-cyan-400" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
