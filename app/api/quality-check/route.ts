import { NextResponse } from "next/server";
import { getAIProviders } from "@/lib/providers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, script, scenes } = body;

    const providers = getAIProviders();
    const report = await providers.llm.evaluateQuality(topic, script, scenes);

    return NextResponse.json(report);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Quality check failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
