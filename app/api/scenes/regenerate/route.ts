import { NextResponse } from "next/server";
import { PipelineOrchestrator } from "@/lib/pipeline/orchestrator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { project, sceneId, customPrompt } = body;

    if (!project || !sceneId) {
      return NextResponse.json(
        { error: "Missing project or sceneId" },
        { status: 400 }
      );
    }

    const orchestrator = new PipelineOrchestrator();
    const updatedProject = await orchestrator.regenerateSingleScene(
      project,
      sceneId,
      customPrompt
    );

    return NextResponse.json(updatedProject);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Scene regeneration failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
