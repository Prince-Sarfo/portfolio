import { NextRequest, NextResponse } from "next/server";
import { ingestPortfolioData } from "@/langchain/ingest";

export async function POST(request: NextRequest) {
  const secret = process.env.INGEST_SECRET;
  if (!secret || request.headers.get("Authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (
    !process.env.GOOGLE_API_KEY ||
    !process.env.PINECONE_API_KEY ||
    !process.env.PINECONE_INDEX_NAME
  ) {
    return NextResponse.json(
      { error: "Missing required environment variables" },
      { status: 503 },
    );
  }

  const result = await ingestPortfolioData();
  return NextResponse.json({ success: true, ...result });
}
