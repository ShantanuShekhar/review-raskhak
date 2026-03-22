import { useState } from "react";

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

const initialRow = { loading: false, success: false, error: "" };

/**
 * Dashboard-only helpers to hit backend WhatsApp test endpoints.
 */
export default function WhatsAppTestSection() {
  const [newReview, setNewReview] = useState(initialRow);
  const [negative, setNegative] = useState(initialRow);
  const [weekly, setWeekly] = useState(initialRow);

  async function postTest(path, setState) {
    setState({ loading: true, success: false, error: "" });
    try {
      const res = await fetch(`${API_BASE}/api/test/${path}`, { method: "POST" });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      setState({ loading: false, success: true, error: "" });
    } catch (err) {
      setState({ loading: false, success: false, error: err.message || "Something went wrong" });
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">
        Testing Tools
      </h2>
      <div className="flex flex-col gap-4">
        <TestRow
          label="Test New Review Alert"
          state={newReview}
          onClick={() => postTest("whatsapp-new-review", setNewReview)}
        />
        <TestRow
          label="Test Negative Alert"
          state={negative}
          onClick={() => postTest("whatsapp-negative", setNegative)}
        />
        <TestRow
          label="Test Weekly Report"
          state={weekly}
          onClick={() => postTest("whatsapp-weekly", setWeekly)}
        />
      </div>
    </section>
  );
}

function TestRow({ label, state, onClick }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <button
        type="button"
        onClick={onClick}
        disabled={state.loading}
        className="rounded-lg border-2 border-slate-700 bg-transparent px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-slate-800" />
            Sending…
          </span>
        ) : (
          label
        )}
      </button>
      <div className="min-h-[1.5rem] text-sm sm:text-right">
        {state.success && <p className="font-medium text-emerald-600">Sent! Check WhatsApp</p>}
        {state.error && <p className="font-medium text-red-600">{state.error}</p>}
      </div>
    </div>
  );
}
