"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Globe, MonitorPlay, ShieldCheck, Upload } from "lucide-react";

type LiveEvent = {
  type: string;
  payload: any;
};

export default function ApplicationWorkspace({ params }: { params: { id: string } }) {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const runId = `demo-run-${params.id}`;

  useEffect(() => {
    const source = new EventSource(`/api/runs/${runId}/stream`);

    const handler = (event: MessageEvent) => {
      const parsed = JSON.parse(event.data);
      setEvents((prev) => [...prev, { type: event.type, payload: parsed }]);

      if (event.type === "screenshot") {
        setScreenshot(`data:image/png;base64,${parsed.base64}`);
      }
    };

    for (const type of ["run_started", "thought", "tool_call", "tool_result", "screenshot", "checkpoint", "awaiting_user", "run_completed", "error"]) {
      source.addEventListener(type, handler);
    }

    return () => source.close();
  }, [runId]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [events]);

  return (
    <main className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-[minmax(420px,44%)_1fr]">
      <section className="border-r border-navy-100 p-8">
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-navy-700 p-2 text-white">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-navy-900">Visa Application</h1>
              <p className="text-sm text-slate-500">Guided submission with live validation</p>
            </div>
          </div>
        </header>

        <div className="space-y-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">Full name</label>
            <input className="w-full rounded-xl border border-navy-100 bg-navy-50 px-3 py-2.5 outline-none focus:border-navy-700" defaultValue="Aisha Rahman" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">Passport number</label>
              <input className="w-full rounded-xl border border-navy-100 bg-navy-50 px-3 py-2.5 outline-none focus:border-navy-700" defaultValue="P1234567" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">Nationality</label>
              <input className="w-full rounded-xl border border-navy-100 bg-navy-50 px-3 py-2.5 outline-none focus:border-navy-700" defaultValue="Bangladeshi" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">Date of birth</label>
              <input type="date" className="w-full rounded-xl border border-navy-100 bg-navy-50 px-3 py-2.5 outline-none focus:border-navy-700" defaultValue="1998-04-12" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">Visa type</label>
              <select className="w-full rounded-xl border border-navy-100 bg-navy-50 px-3 py-2.5 outline-none focus:border-navy-700">
                <option>Tourist</option>
                <option>Business</option>
                <option>Study</option>
              </select>
            </div>
          </div>

          <button className="w-full rounded-xl bg-navy-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-navy-900">
            Save profile
          </button>
        </div>
      </section>

      <section className="bg-navy-50/40 p-8">
        <div className="grid gap-6">
          <div className="rounded-2xl border border-navy-100 bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-navy-100 px-6 py-4">
              <div className="flex items-center gap-2">
                <MonitorPlay className="h-5 w-5 text-navy-700" />
                <h2 className="font-medium text-navy-900">Live Browser Session</h2>
              </div>
              <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-700">Secure sandbox</span>
            </div>

            <div className="p-6">
              {screenshot ? (
                <img src={screenshot} alt="Live browser preview" className="w-full rounded-xl border border-navy-100" />
              ) : (
                <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-navy-100 text-sm text-slate-500">
                  Browser session will appear here
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-navy-100 bg-white shadow-card">
            <div className="flex items-center gap-2 border-b border-navy-100 px-6 py-4">
              <FileText className="h-5 w-5 text-navy-700" />
              <h2 className="font-medium text-navy-900">Agent Activity</h2>
            </div>

            <div ref={logRef} className="max-h-80 space-y-3 overflow-y-auto p-6 font-mono text-xs">
              {events.map((event, index) => (
                <motion.div key={`${event.type}-${index}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg bg-navy-50 p-3">
                  <div className="font-semibold text-navy-700">{event.type}</div>
                  <pre className="mt-1 whitespace-pre-wrap text-slate-600">{JSON.stringify(event.payload, null, 2)}</pre>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <h2 className="font-medium text-navy-900">Document Validation</h2>
            </div>

            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-navy-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-navy-900">
              <Upload className="h-4 w-4" />
              Upload Passport
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
