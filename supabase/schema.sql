import { NextRequest, NextResponse } from "next/server";

const runtimeEvents = globalThis as typeof globalThis & {
  __visaEvents?: Record<string, any[]>;
};

if (!runtimeEvents.__visaEvents) runtimeEvents.__visaEvents = {};

export async function POST(req: NextRequest, { params }: { params: { runId: string } }) {
  const body = await req.json();
  const runId = params.runId;
  const current = runtimeEvents.__visaEvents?.[runId] ?? [];
  const nextSeq = current.length + 1;
  const event = {
    seq: nextSeq,
    type: body.type ?? "checkpoint",
    payload: body.payload ?? { message: "checkpoint" }
  };

  runtimeEvents.__visaEvents = {
    ...runtimeEvents.__visaEvents,
    [runId]: [...current, event]
  };

  return NextResponse.json({ ok: true, event });
}
