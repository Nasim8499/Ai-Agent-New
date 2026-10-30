import { NextRequest, NextResponse } from "next/server";
import { generatePlanFromPrompt } from "@/lib/mistral";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const plan = await generatePlanFromPrompt(prompt ?? "Create a safe visa application workflow for a tourist visa.");
  return NextResponse.json({ plan });
}
