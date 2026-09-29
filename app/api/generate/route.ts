import { NextResponse } from "next/server";
import { PipelineOrchestrator } from "@/lib/pipeline/orchestrator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topic = body.topic || "Why do humans dream?";
    const options = {
      duration: body.duration || 30,
      tone: body.tone || "curious",
      language: body.language || "English",
      visualStyle: body.visualStyle || "cinematic",
    };

    const orchestrator = new PipelineOrchestrator();
    const project = await orchestrator.executeFullPipeline(topic, options);

    return NextResponse.json(project);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
