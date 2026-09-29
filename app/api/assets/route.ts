import { NextResponse } from "next/server";
import { INITIAL_ASSETS } from "@/lib/demo/sampleData";

export async function GET() {
  return NextResponse.json({ assets: INITIAL_ASSETS });
}
