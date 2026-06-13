"use client";

import { motion } from "framer-motion";
import { Mic, Sparkles, Volume2 } from "lucide-react";

type OrbState = "idle" | "listening" | "thinking" | "speaking";

interface AIOrbProps {
  state: OrbState;
  onClick?: () => void;
}

export function AIOrb({ state, onClick }: AIOrbProps) {
  // Define animation configurations based on state
  const getOrbAnimations = () => {
    switch (state) {
      case "listening":
        return {
          scale: [1, 1.15, 1],
          borderColor: [
            "rgba(34, 211, 238, 0.4)",
            "rgba(34, 211, 238, 0.8)",
            "rgba(34, 211, 238, 0.4)",
          ],
          boxShadow: [
            "0 0 30px 10px rgba(34, 211, 238, 0.2)",
            "0 0 50px 25px rgba(34, 211, 238, 0.5)",
            "0 0 30px 10px rgba(34, 211, 238, 0.2)",
          ],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };
      case "thinking":
        return {
          rotate: 360,
          scale: [1, 1.05, 1],
          borderColor: [
            "rgba(168, 85, 247, 0.4)",
            "rgba(34, 211, 238, 0.4)",
            "rgba(168, 85, 247, 0.4)",
          ],
          boxShadow: [
            "0 0 30px 10px rgba(168, 85, 247, 0.2)",
            "0 0 40px 15px rgba(34, 211, 238, 0.3)",
            "0 0 30px 10px rgba(168, 85, 247, 0.2)",
          ],
          transition: {
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "linear" as const,
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" as const,
            },
            borderColor: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" as const,
            },
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" as const,
            },
          },
        };
      case "speaking":
        return {
          scale: [1, 1.1, 0.95, 1.15, 1],
          borderColor: [
            "rgba(34, 211, 238, 0.5)",
            "rgba(168, 85, 247, 0.5)",
            "rgba(34, 211, 238, 0.5)",
          ],
          boxShadow: [
            "0 0 40px 15px rgba(34, 211, 238, 0.3)",
            "0 0 60px 30px rgba(168, 85, 247, 0.4)",
            "0 0 40px 15px rgba(34, 211, 238, 0.3)",
          ],
          transition: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };
      case "idle":
      default:
        return {
          scale: [1, 1.03, 1],
          borderColor: [
            "rgba(34, 211, 238, 0.2)",
            "rgba(168, 85, 247, 0.2)",
            "rgba(34, 211, 238, 0.2)",
          ],
          boxShadow: [
            "0 0 25px 5px rgba(34, 211, 238, 0.1)",
            "0 0 35px 10px rgba(168, 85, 247, 0.15)",
            "0 0 25px 5px rgba(34, 211, 238, 0.1)",
          ],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };
    }
  };

  const getOverlayText = () => {
    switch (state) {
      case "listening":
        return "Listening...";
      case "thinking":
        return "Thinking...";
      case "speaking":
        return "Speaking...";
      case "idle":
      default:
        return "Tap to Talk";
    }
  };

  const getOrbBg = () => {
    switch (state) {
      case "listening":
        return "bg-cyan-950/60";
      case "thinking":
        return "bg-purple-950/60";
      case "speaking":
        return "bg-cyan-950/60";
      case "idle":
      default:
        return "bg-[#0d0d18]";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative cursor-pointer" onClick={onClick}>
        {/* Outer Ripple Effects */}
        {state === "listening" && (
          <>
            <motion.div
              initial={{ opacity: 0.5, scale: 0.8 }}
              animate={{ opacity: 0, scale: 1.6 }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeOut" as const,
              }}
              className="absolute inset-0 rounded-full border border-cyan-500/30 -z-10"
            />
            <motion.div
              initial={{ opacity: 0.3, scale: 0.8 }}
              animate={{ opacity: 0, scale: 2.0 }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: 0.7,
                ease: "easeOut" as const,
              }}
              className="absolute inset-0 rounded-full border border-cyan-400/20 -z-10"
            />
          </>
        )}

        {state === "speaking" && (
          <motion.div
            initial={{ opacity: 0.4, scale: 0.9 }}
            animate={{ opacity: 0, scale: 1.8 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeOut" as const,
            }}
            className="absolute inset-0 rounded-full border border-purple-500/20 -z-10"
          />
        )}

        {/* Core Animated Orb */}
        <motion.div
          animate={getOrbAnimations()}
          className={`w-48 h-48 sm:w-60 sm:h-60 rounded-full border ${getOrbBg()} flex items-center justify-center backdrop-blur-md relative z-10 transition-colors duration-500`}
        >
          {/* Inner ring for depth */}
          <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />

          {/* Central Icon */}
          <motion.div
            key={state}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-foreground"
          >
            {state === "listening" && (
              <Mic size={48} className="text-cyan-400 animate-pulse" />
            )}
            {state === "thinking" && (
              <Sparkles size={48} className="text-purple-400" />
            )}
            {state === "speaking" && (
              <Volume2 size={48} className="text-cyan-400" />
            )}
            {state === "idle" && (
              <Mic
                size={48}
                className="text-cyan-400/60 hover:text-cyan-400 transition-colors duration-300"
              />
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Subtitle state label */}
      <div className="flex flex-col items-center gap-1">
        <motion.p
          key={state}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-medium font-sans uppercase tracking-widest text-muted-foreground/80 text-sm"
        >
          {getOverlayText()}
        </motion.p>
        {state === "idle" && (
          <span className="text-xs text-muted-foreground/50 font-mono">
            Click the orb to start speaking
          </span>
        )}
      </div>
    </div>
  );
}
