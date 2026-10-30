import Link from "next/link";
import { ArrowRight, Bot, Globe, ShieldCheck, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-navy-900">
      <section className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-20 lg:px-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-navy-700 p-2 text-white">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold">Visa Agent OS</div>
              <div className="text-xs text-slate-500">AI portal workflow automation</div>
            </div>
          </div>
          <Link href="/applications" className="rounded-full bg-navy-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy-900">
            Open workspace
          </Link>
        </header>

        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-navy-100 bg-navy-50 px-3 py-1.5 text-xs font-medium text-navy-700">
              <Sparkles className="h-3.5 w-3.5" />
              Production-ready browser automation
            </div>

            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-navy-900 md:text-6xl">
              AI agent for visa, document, and portal workflows.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Automate onboarding, OCR checks, applicant validation, and securing real-time portal execution with a checkpointed browser agent.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/applications" className="inline-flex items-center gap-2 rounded-xl bg-navy-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-navy-900">
                Start application
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/applications/visa-demo" className="inline-flex items-center gap-2 rounded-xl border border-navy-100 bg-white px-5 py-3 text-sm font-medium text-navy-700 transition hover:bg-navy-50">
                Preview workflow
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-navy-100 bg-navy-50 p-6 shadow-card">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white p-2 text-navy-700 shadow-sm">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-navy-900">Agent status</div>
                  <div className="text-xs text-slate-500">Live runner active</div>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                Online
              </span>
            </div>

            <div className="space-y-4">
              {[
                { label: "Portal intake", status: "Completed" },
                { label: "Passport OCR", status: "Running" },
                { label: "Human confirmation", status: "Queued" },
                { label: "Submission", status: "Pending" }
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-xl bg-white p-3 text-sm">
                  <span className="text-slate-600">{item.label}</span>
                  <span className={item.status === "Completed" ? "text-emerald-600" : item.status === "Running" ? "text-amber-500" : "text-slate-500"}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              <ShieldCheck className="h-4 w-4" />
              Secure portal flow and confirmation gates enforced.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
