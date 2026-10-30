import { NextRequest, NextResponse } from "next/server";
import { generatePlanFromPrompt } from "@/lib/mistral";

const runtimeRuns = globalThis as typeof globalThis & {
  __visaRuns?: Array<{ id: string; applicationId: string; status: string; plan: string[]; createdAt: string }>;
};

if (!runtimeRuns.__visaRuns) runtimeRuns.__visaRuns = [];

export async function GET() {
  return NextResponse.json({ runs: runtimeRuns.__visaRuns ?? [] });
}

export async function POST(req: NextRequest) {
  const { applicationId, prompt } = await req.json();
  const plan = await generatePlanFromPrompt(prompt ?? "Create a safe visa application workflow.");
  const runId = `run_${Math.random().toString(36).slice(2, 10)}`;

  const run = {
    id: runId,
    applicationId,
    status: "queued",
    plan,
    createdAt: new Date().toISOString()
  };

  runtimeRuns.__visaRuns = [run, ...(runtimeRuns.__visaRuns ?? [])];

  return NextResponse.json({ runId, run }, { status: 201 });
}
