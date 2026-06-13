"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  MessageSquare,
  Radio,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useSpeech } from "@/hooks/use-speech";
import { AIOrb } from "@/modules/ai/components/ai-orb";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ChatHistory } from "@/modules/ai/utils/ai-engine";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

const WELCOME: Message = {
  id: "welcome",
  sender: "ai",
  text: "Hello! I'm Prince Sarfo's AI Twin, powered by LangChain. Ask me anything about his skills, experience, or projects!",
  timestamp: new Date(),
};

export default function AIPage() {
  const [mode, setMode] = useState<"voice" | "text">("voice");
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [inputText, setInputText] = useState("");
  const [aiState, setAiState] = useState<
    "idle" | "listening" | "thinking" | "speaking"
  >("idle");
  const [isStreaming, setIsStreaming] = useState(false);
  const [muteVoice, setMuteVoice] = useState(false);

  const {
    supported,
    isSpeaking,
    isListening,
    transcript,
    speak,
    stopSpeaking,
    startListening,
    stopListening,
  } = useSpeech();

  const chatEndRef = useRef<HTMLDivElement>(null);

  const displayState = ((): "idle" | "listening" | "thinking" | "speaking" => {
    if (aiState === "thinking") return "thinking";
    if (isListening) return "listening";
    if (isSpeaking && !muteVoice) return "speaking";
    return "idle";
  })();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Build conversation history from the current messages state.
  // Called synchronously before React applies any pending state update,
  // so it correctly captures the history *before* the current user message.
  const buildHistory = useCallback(
    (): ChatHistory =>
      messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role:
            m.sender === "user" ? ("user" as const) : ("assistant" as const),
          content: m.text,
        })),
    [messages],
  );

  const handleProcessInput = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      // Snapshot history before adding the user message
      const history = buildHistory();

      // Add user message
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "user",
          text,
          timestamp: new Date(),
        },
      ]);
      setAiState("thinking");

      const aiId = crypto.randomUUID();
      let fullText = "";

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history }),
        });

        if (!res.ok || !res.body) {
          throw new Error(`API error ${res.status}`);
        }

        // Transition: thinking → streaming
        setIsStreaming(true);
        setAiState("idle");
        setMessages((prev) => [
          ...prev,
          { id: aiId, sender: "ai", text: "", timestamp: new Date() },
        ]);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullText += decoder.decode(value, { stream: true });
          // Update the AI message in-place as chunks arrive
          setMessages((prev) =>
            prev.map((m) => (m.id === aiId ? { ...m, text: fullText } : m)),
          );
        }

        setIsStreaming(false);

        if (!muteVoice && supported.speechSynthesis && fullText) {
          speak(fullText, { onEnd: () => setAiState("idle") });
        }
      } catch (err) {
        console.error("AI error:", err);
        setIsStreaming(false);
        setAiState("idle");
        const errorText =
          "Sorry, I couldn't reach the AI service. Please try again.";
        setMessages((prev) => {
          const hasPlaceholder = prev.some((m) => m.id === aiId);
          return hasPlaceholder
            ? prev.map((m) => (m.id === aiId ? { ...m, text: errorText } : m))
            : [
                ...prev,
                {
                  id: aiId,
                  sender: "ai",
                  text: errorText,
                  timestamp: new Date(),
                },
              ];
        });
      }
    },
    [buildHistory, muteVoice, speak, supported.speechSynthesis],
  );

  const toggleVoiceListen = useCallback(() => {
    if (isListening) {
      stopListening();
      setAiState("idle");
    } else {
      stopSpeaking();
      setAiState("listening");
      startListening({
        onResult: (result) => {
          setAiState("thinking");
          handleProcessInput(result);
        },
        onEnd: () => {
          setAiState((prev) => (prev === "listening" ? "idle" : prev));
        },
      });
    }
  }, [
    isListening,
    stopListening,
    stopSpeaking,
    startListening,
    handleProcessInput,
  ]);

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const prompt = inputText;
    setInputText("");
    handleProcessInput(prompt);
  };

  const lastAiMessage = [...messages].reverse().find((m) => m.sender === "ai");

  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-foreground flex flex-col font-sans overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] -z-10" />

      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-white/5 bg-black/10 backdrop-blur-md z-30">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            onClick={() => {
              stopSpeaking();
              stopListening();
            }}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "text-muted-foreground hover:text-foreground hover:bg-white/5",
            )}
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
              Prince Sarfo AI
            </h1>
            <p className="text-xs text-muted-foreground/60 hidden sm:block">
              Powered by LangChain + Gemini
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode switcher */}
          <div className="bg-white/5 p-1 rounded-lg border border-white/5 flex gap-1">
            {(["voice", "text"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  stopSpeaking();
                  stopListening();
                }}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5",
                  mode === m
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/10"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {m === "voice" ? (
                  <Radio size={14} />
                ) : (
                  <MessageSquare size={14} />
                )}
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>

          {/* Mute */}
          <button
            onClick={() => {
              if (!muteVoice) stopSpeaking();
              setMuteVoice((v) => !v);
            }}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "text-muted-foreground hover:text-foreground hover:bg-white/5",
            )}
            title={muteVoice ? "Unmute Voice" : "Mute Voice"}
          >
            {muteVoice ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-20">
        <AnimatePresence mode="wait">
          {mode === "voice" ? (
            /* ── Voice interface ── */
            <motion.div
              key="voice"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-between h-[65vh] w-full max-w-md"
            >
              <div className="flex-1 flex items-center justify-center">
                <AIOrb state={displayState} onClick={toggleVoiceListen} />
              </div>

              {/* Subtitle box */}
              <div className="w-full bg-white/5 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-5 text-center shadow-2xl min-h-[120px] flex flex-col justify-center gap-2">
                {displayState === "listening" && (
                  <p className="text-cyan-400 font-mono text-xs uppercase tracking-wider animate-pulse">
                    Listening...
                  </p>
                )}
                {displayState === "thinking" && !isStreaming && (
                  <div className="flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
                {displayState === "speaking" && (
                  <p className="text-purple-400 font-mono text-xs uppercase tracking-wider">
                    AI Twin Speaking...
                  </p>
                )}

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {displayState === "listening" &&
                    (transcript ||
                      "Say something like 'What projects have you built?'")}
                  {displayState === "thinking" &&
                    (isStreaming
                      ? lastAiMessage?.text || "Building response..."
                      : "Consulting knowledge base...")}
                  {displayState === "speaking" && lastAiMessage?.text}
                  {displayState === "idle" &&
                    (lastAiMessage?.text || "Press the orb or speak to chat.")}
                </p>
              </div>
            </motion.div>
          ) : (
            /* ── Text / chat interface ── */
            <motion.div
              key="text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-2xl h-[75vh] flex flex-col bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex flex-col max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed",
                      msg.sender === "user"
                        ? "self-end bg-cyan-500 text-black rounded-tr-none font-medium"
                        : "self-start bg-white/5 border border-cyan-500/40 text-foreground rounded-tl-none",
                    )}
                  >
                    <p className="whitespace-pre-wrap">
                      {msg.text}
                      {/* Blinking cursor while this message is streaming */}
                      {isStreaming &&
                        msg === messages[messages.length - 1] &&
                        msg.sender === "ai" && (
                          <span className="inline-block w-0.5 h-4 bg-cyan-400 ml-0.5 animate-pulse align-middle" />
                        )}
                    </p>
                    {msg.text && (
                      <span
                        className={cn(
                          "text-[10px] mt-1.5 block",
                          msg.sender === "user"
                            ? "text-black/60"
                            : "text-muted-foreground/60",
                        )}
                      >
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>
                ))}

                {/* Thinking indicator (only before first streaming chunk) */}
                {aiState === "thinking" && !isStreaming && (
                  <div className="self-start bg-white/5 border border-cyan-500/40 rounded-2xl rounded-tl-none p-4 max-w-[80%] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleTextSubmit}
                className="p-4 border-t border-white/5 bg-black/20 flex gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask me about my projects, skills, or experience..."
                  disabled={aiState === "thinking" || isStreaming}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50"
                />

                {supported.speechRecognition && (
                  <button
                    type="button"
                    onClick={toggleVoiceListen}
                    className={cn(
                      "p-3 rounded-xl border border-white/10 transition-all flex items-center justify-center",
                      isListening
                        ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/55 animate-pulse"
                        : "bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10",
                    )}
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                )}

                <button
                  type="submit"
                  disabled={
                    aiState === "thinking" || isStreaming || !inputText.trim()
                  }
                  className="bg-cyan-500 text-black px-4 py-3 rounded-xl font-bold text-sm hover:bg-cyan-400 transition-colors flex items-center justify-center disabled:opacity-50 disabled:hover:bg-cyan-500"
                >
                  <Send size={18} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
