/**
 * Portfolio data ingestion utility
 *
 * Embeds Prince's portfolio data as documents in Pinecone so the RAG chain
 * can retrieve relevant context when answering visitor questions.
 *
 * Usage (run once, or whenever portfolio data changes):
 *   POST /api/ingest   (with Authorization: Bearer <INGEST_SECRET>)
 */
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "@langchain/core/documents";
import { siteConfig, skills, experiences, projects } from "@/modules/home/data";

function buildDocuments(): Document[] {
  return [
    // Profile
    new Document({
      pageContent: `Name: ${siteConfig.name}. Role: ${siteConfig.role}. Location: ${siteConfig.location}. Email: ${siteConfig.email}. GitHub: ${siteConfig.socials.github}. LinkedIn: ${siteConfig.socials.linkedin}. Bio: ${siteConfig.bio}. Tagline: ${siteConfig.tagline}.`,
      metadata: { section: "profile" },
    }),

    // Skills
    new Document({
      pageContent: `Skills and technologies: ${skills.map((s) => `${s.category}: ${s.items.join(", ")}`).join(". ")}.`,
      metadata: { section: "skills" },
    }),

    // One document per experience entry
    ...experiences.map(
      (e) =>
        new Document({
          pageContent: `Work experience — ${e.role} at ${e.company} (${e.period}): ${e.description} Technologies used: ${e.tech.join(", ")}.`,
          metadata: { section: "experience", company: e.company },
        }),
    ),

    // One document per project
    ...projects.map(
      (p) =>
        new Document({
          pageContent: `Project — ${p.title}: ${p.description} Technologies: ${p.tech.join(", ")}.`,
          metadata: { section: "projects", project: p.title },
        }),
    ),
  ];
}

export async function ingestPortfolioData(): Promise<{ count: number }> {
  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004",
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

  const docs = buildDocuments();

  await PineconeStore.fromDocuments(docs, embeddings, { pineconeIndex });

  return { count: docs.length };
}
