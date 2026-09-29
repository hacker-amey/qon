import { NextResponse } from "next/server";
import { INITIAL_PROJECT_HISTORY } from "@/lib/demo/sampleData";

export async function GET() {
  return NextResponse.json({ history: INITIAL_PROJECT_HISTORY });
}
