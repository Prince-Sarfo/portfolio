"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface UseSpeechReturn {
  supported: {
    speechSynthesis: boolean;
    speechRecognition: boolean;
  };
  isSpeaking: boolean;
  isListening: boolean;
  transcript: string;
  speak: (
    text: string,
    options?: { onStart?: () => void; onEnd?: () => void },
  ) => void;
  stopSpeaking: () => void;
  startListening: (options?: {
    onResult?: (text: string) => void;
    onEnd?: () => void;
  }) => void;
  stopListening: () => void;
}

export function useSpeech(): UseSpeechReturn {
  const [supported] = useState(() => {
    if (typeof window !== "undefined") {
      const hasSynthesis = "speechSynthesis" in window;
      const hasRecognition =
        "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
      return {
        speechSynthesis: hasSynthesis,
        speechRecognition: hasRecognition,
      };
    }
    return {
      speechSynthesis: false,
      speechRecognition: false,
    };
  });

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech recognition client-side
  useEffect(() => {
    if (typeof window !== "undefined" && supported.speechRecognition) {
      const SpeechRecognitionClass =
        (window as any).SpeechRecognition || // eslint-disable-line @typescript-eslint/no-explicit-any
        (window as any).webkitSpeechRecognition; // eslint-disable-line @typescript-eslint/no-explicit-any
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognitionRef.current = recognition;
    }
  }, [supported.speechRecognition]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (!supported.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [supported.speechSynthesis]);

  // Speak text
  const speak = useCallback(
    (text: string, options?: { onStart?: () => void; onEnd?: () => void }) => {
      if (!supported.speechSynthesis) return;

      // Cancel any ongoing speech
      stopSpeaking();

      // Simple clean up text of markdown-like brackets/etc. to read cleanly
      const cleanText = text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // link text only
        .replace(/[*_`#]/g, "") // markdown characters
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utteranceRef.current = utterance;

      // Try to select a premium English voice
      const voices = window.speechSynthesis.getVoices();
      // Prefer Google US English or natural sounding English voices
      const voice =
        voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            (v.name.includes("Google") ||
              v.name.includes("Natural") ||
              v.name.includes("Samantha")),
        ) || voices.find((v) => v.lang.startsWith("en"));

      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        options?.onStart?.();
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        options?.onEnd?.();
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        options?.onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    },
    [supported.speechSynthesis, stopSpeaking],
  );

  // Stop listening
  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch {
      // Ignore if already stopped
    }
    setIsListening(false);
  }, []);

  // Start listening
  const startListening = useCallback(
    (options?: { onResult?: (text: string) => void; onEnd?: () => void }) => {
      if (!supported.speechRecognition || !recognitionRef.current) return;

      // Cancel synthesis if speaking
      stopSpeaking();
      stopListening();

      setTranscript("");
      setIsListening(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognitionRef.current.onresult = (event: any) => {
        const currentTranscript = event.results[0][0].transcript;
        setTranscript(currentTranscript);
        options?.onResult?.(currentTranscript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        options?.onEnd?.();
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognitionRef.current.onerror = (event: any) => {
        console.error("SpeechRecognition error:", event.error);
        setIsListening(false);
        options?.onEnd?.();
      };

      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("SpeechRecognition start error:", e);
        setIsListening(false);
      }
    },
    [supported.speechRecognition, stopSpeaking, stopListening],
  );

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore if already stopped
        }
      }
    };
  }, []);

  return {
    supported,
    isSpeaking,
    isListening,
    transcript,
    speak,
    stopSpeaking,
    startListening,
    stopListening,
  };
}
