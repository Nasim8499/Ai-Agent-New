import Link from "next/link";
import { notFound } from "next/navigation";

const demoApplications: Record<string, { country: string; visaType: string; status: string }> = {
  "visa-demo": { country: "United Arab Emirates", visaType: "Tourist visa", status: "In review" },
  "app-2": { country: "Canada", visaType: "Study permit", status: "Pending docs" },
  "app-3": { country: "Germany", visaType: "Work visa", status: "Queued" }
};

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const app = demoApplications[params.id];

  if (!app) return notFound();

  return (
    <main className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-navy-100 bg-white p-8 shadow-card">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.12em] text-slate-500">Application details</p>
            <h1 className="mt-2 text-3xl font-semibold text-navy-900">{app.visaType}</h1>
          </div>
          <span className="rounded-full bg-navy-100 px-3 py-1 text-sm font-medium text-navy-700">{app.status}</span>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-navy-50 p-5">
            <div className="text-sm text-slate-500">Destination</div>
            <div className="mt-2 text-lg font-semibold text-navy-900">{app.country}</div>
          </div>
          <div className="rounded-2xl bg-navy-50 p-5">
            <div className="text-sm text-slate-500">Portal</div>
            <div className="mt-2 text-lg font-semibold text-navy-900">Example government portal</div>
          </div>
          <div className="rounded-2xl bg-navy-50 p-5">
            <div className="text-sm text-slate-500">Risk level</div>
            <div className="mt-2 text-lg font-semibold text-emerald-600">Low</div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/applications/${params.id}/workspace`} className="inline-flex items-center justify-center rounded-xl bg-navy-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-navy-900">
            Open live workspace
          </Link>
          <Link href="/applications" className="inline-flex items-center justify-center rounded-xl border border-navy-100 bg-white px-5 py-3 text-sm font-medium text-navy-700 transition hover:bg-navy-50">
            Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
