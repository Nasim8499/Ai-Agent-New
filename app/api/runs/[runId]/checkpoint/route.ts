import { NextRequest } from "next/server";

const runtimeEvents = globalThis as typeof globalThis & {
  __visaEvents?: Record<string, any[]>;
};

if (!runtimeEvents.__visaEvents) runtimeEvents.__visaEvents = {};

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: { runId: string } }) {
  const runId = params.runId;
  const url = new URL(request.url);
  const after = Number(url.searchParams.get("after") ?? 0);
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const pump = () => {
        const events = runtimeEvents.__visaEvents?.[runId] ?? [];
        const newer = events.filter((event) => event.seq > after);

        for (const event of newer) {
          after = event.seq;
          controller.enqueue(
            encoder.encode(`event: ${event.type}\ndata: ${JSON.stringify(event.payload)}\n\n`)
          );
        }
      };

      pump();
      const timer = setInterval(pump, 1000);
      request.signal.addEventListener("abort", () => {
        clearInterval(timer);
        controller.close();
      });
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive"
    }
  });
}
