import AlertBadge from "../components/AlertBadge";
import ReviewCard from "../components/ReviewCard";
import WhatsAppTestSection from "../components/WhatsAppTestSection";


const mockReviews = [
  {
    id: 1,
    source: "Google",
    author: "Rohit Sharma",
    rating: 5,
    text: "Excellent support team. Bahut fast response mila.",
    date: "2026-03-20T10:30:00Z",
  },
  {
    id: 2,
    source: "Google",
    author: "Aisha Khan",
    rating: 3,
    text: "Service okay thi, lekin delivery thodi delay hui.",
    date: "2026-03-19T15:00:00Z",
  },
  {
    id: 3,
    source: "WhatsApp",
    author: "Vikram Singh",
    rating: 2,
    text: "Issue resolve nahi hua, support call back ka wait kar raha hoon.",
    date: "2026-03-18T08:15:00Z",
  },
];

function DashboardPage() {
  const total = mockReviews.length;
  const positive = mockReviews.filter((item) => item.rating >= 4).length;
  const negative = mockReviews.filter((item) => item.rating <= 2).length;
  const avg = (mockReviews.reduce((sum, item) => sum + item.rating, 0) / total).toFixed(1);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#0F172A] text-white">
        <div className="mx-auto flex w-full max-w-[900px] items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <h1 className="text-2xl font-bold">Review Rakshak</h1>
            <p className="text-sm text-slate-200">Apne reviews pe nazar rakho</p>
          </div>
          <AlertBadge count={negative} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-[900px] space-y-5 px-4 py-6 sm:px-6">
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Total Reviews" value={total} valueClass="text-sky-700" />
          <StatCard label="Positive %" value={`${Math.round((positive / total) * 100)}%`} valueClass="text-emerald-700" />
          <StatCard label="Negative Count" value={negative} valueClass="text-red-700" />
          <StatCard label="Avg Rating" value={avg} valueClass="text-purple-700" />
        </section>

        <section className="space-y-4">
          {mockReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </section>

        <WhatsAppTestSection />
      </main>
    </div>
  );
}

function StatCard({ label, value, valueClass }) {
  return (
    <div className="rounded-xl bg-slate-100 p-4">
      <p className={`text-2xl font-extrabold ${valueClass}`}>{value}</p>
      <p className="mt-1 text-xs text-slate-600">{label}</p>
    </div>
  );
}

export default DashboardPage;
