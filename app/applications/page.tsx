import Link from "next/link";
import { FileText, Globe, Plus, Search } from "lucide-react";

const applications = [
  { id: "visa-demo", country: "United Arab Emirates", type: "Tourist visa", progress: 72 },
  { id: "app-2", country: "Canada", type: "Study permit", progress: 45 },
  { id: "app-3", country: "Germany", type: "Work visa", progress: 18 }
];

export default function ApplicationsPage() {
  return (
    <main className="min-h-screen bg-white p-6 lg:p-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-slate-500">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-navy-900">Visa applications</h1>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-navy-900">
            <Plus className="h-4 w-4" />
            New application
          </button>
        </header>

        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-navy-100 bg-navy-50 px-4 py-3 text-sm text-slate-600">
          <Search className="h-4 w-4 text-navy-700" />
          Search applications, status, or portal
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {applications.map((item) => (
            <Link key={item.id} href={`/applications/${item.id}`} className="rounded-2xl border border-navy-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-navy-50 p-2 text-navy-700">
                    <Globe className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-500">{item.country}</span>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-700">
                  active
                </span>
              </div>

              <div className="text-xl font-semibold text-navy-900">{item.type}</div>

              <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                <span>Progress</span>
                <span>{item.progress}%</span>
              </div>

              <div className="mt-2 h-2.5 rounded-full bg-navy-100">
                <div className="h-full rounded-full bg-navy-700" style={{ width: `${item.progress}%` }} />
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-navy-700">
                <FileText className="h-4 w-4" />
                Open application
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
