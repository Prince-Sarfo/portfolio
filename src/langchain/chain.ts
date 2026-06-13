import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import type { BaseMessage } from "@langchain/core/messages";
import { siteConfig, skills, experiences, projects } from "@/modules/home/data";

export type HistoryMessage = { role: "user" | "assistant"; content: string };

type ChainInput = { message: string; history: BaseMessage[] };

// ---------------------------------------------------------------------------
// System prompt — embedded profile ensures responses even without RAG hits
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `You are the AI Twin of ${siteConfig.name}, a ${siteConfig.role} from ${siteConfig.location} who builds fast, accessible, and beautiful web and mobile experiences.
Respond in a friendly, conversational, professional tone. Keep responses concise (2-3 sentences) so they are pleasant when read aloud.
Answer in the first person ("I", "my") as if you are ${siteConfig.name}.

Profile:
- Name: ${siteConfig.name}
- Role: ${siteConfig.role}
- Tagline: ${siteConfig.tagline}
- Location: ${siteConfig.location}
- Email: ${siteConfig.email}
- GitHub: ${siteConfig.socials.github}
- LinkedIn: ${siteConfig.socials.linkedin}
- Bio: ${siteConfig.bio}

Skills:
${skills.map((s) => `- ${s.category}: ${s.items.join(", ")}`).join("\n")}

Work Experience:
${experiences.map((e) => `- ${e.role} at ${e.company} (${e.period}): ${e.description}`).join("\n")}

Projects:
${projects.map((p) => `- ${p.title}: ${p.description}`).join("\n")}

Additional context retrieved from knowledge base:
{context}

If asked about something outside this profile, politely decline and invite the visitor to reach out at ${siteConfig.email}.`;

// ---------------------------------------------------------------------------
// LLM
// ---------------------------------------------------------------------------
function buildLLM() {
  return new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 0.7,
    maxOutputTokens: 300,
  });
}

// ---------------------------------------------------------------------------
// Vector store retriever (only when Pinecone is configured)
// ---------------------------------------------------------------------------
async function buildRetriever() {
  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004",
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
  });

  return vectorStore.asRetriever({ k: 3 });
}

// ---------------------------------------------------------------------------
// Chain builder — returns RAG chain when Pinecone is configured,
// falls back to a profile-only chain when it is not.
// ---------------------------------------------------------------------------
export async function buildChain() {
  const llm = buildLLM();
  const useRAG = !!(
    process.env.PINECONE_API_KEY && process.env.PINECONE_INDEX_NAME
  );

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", SYSTEM_PROMPT],
    new MessagesPlaceholder("history"),
    ["human", "{message}"],
  ]);

  if (useRAG) {
    const retriever = await buildRetriever();

    return RunnableSequence.from([
      RunnablePassthrough.assign({
        context: async (input: ChainInput) => {
          const docs = await retriever.invoke(input.message);
          return docs.map((d) => d.pageContent).join("\n\n");
        },
      }),
      prompt,
      llm,
      new StringOutputParser(),
    ]);
  }

  // No RAG — context slot is empty, profile in system prompt covers responses
  return RunnableSequence.from([
    RunnablePassthrough.assign({ context: () => "" }),
    prompt,
    llm,
    new StringOutputParser(),
  ]);
}

// ---------------------------------------------------------------------------
// History conversion
// ---------------------------------------------------------------------------
export function toMessages(history: HistoryMessage[]): BaseMessage[] {
  return history.map(({ role, content }) =>
    role === "user" ? new HumanMessage(content) : new AIMessage(content),
  );
}
