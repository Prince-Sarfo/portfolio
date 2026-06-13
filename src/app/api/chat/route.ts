import { NextRequest } from "next/server";
import { buildChain, toMessages } from "@/langchain/chain";
import type { HistoryMessage } from "@/langchain/chain";

export async function POST(request: NextRequest) {
  if (!process.env.GOOGLE_API_KEY) {
    return new Response("AI service not configured", { status: 503 });
  }

  const {
    message,
    history = [],
  }: { message: string; history: HistoryMessage[] } = await request.json();

  if (!message?.trim()) {
    return new Response("Message is required", { status: 400 });
  }

  const chain = await buildChain();

  const langchainStream = await chain.stream({
    message,
    history: toMessages(history),
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of langchainStream) {
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (err) {
        console.error("Stream error:", err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
