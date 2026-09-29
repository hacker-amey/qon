import { NextResponse } from "next/server";
import { INITIAL_PROJECT_HISTORY, SAMPLE_PROJECT_DREAMS } from "@/lib/demo/sampleData";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const found = INITIAL_PROJECT_HISTORY.find((p) => p.id === id);
    if (!found) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(found);
  }

  return NextResponse.json({ projects: INITIAL_PROJECT_HISTORY });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topic = body.topic || "Why do humans dream?";

    const newProject = {
      ...SAMPLE_PROJECT_DREAMS,
      id: "proj_" + Math.random().toString(36).substring(2, 8),
      title: topic.slice(0, 48),
      topic,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(newProject, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid payload";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
