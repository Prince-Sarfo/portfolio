// AI calls are now handled directly via the /api/chat streaming route.
// See src/langchain/chain.ts for the LangChain implementation.
export type ChatHistory = Array<{
  role: "user" | "assistant";
  content: string;
}>;
