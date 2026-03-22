import { useState } from "react";

function ReviewCard({ review }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reply, setReply] = useState("");

  const rating = Number(review.rating || 0);
  const isPositive = rating >= 5;
  const isNeutral = rating === 3;
  const isUrgent = rating <= 2;

  async function handleGenerateReply() {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setReply(
      rating >= 4
        ? "Aapke pyare feedback ke liye bahut shukriya. Aapka support hume better service dene ke liye motivate karta hai."
        : "Aapke experience ke liye sincerely sorry. Hum issue resolve karne ke liye ready hain, please hume details share karein."
    );
    setIsGenerating(false);
  }

  async function handleCopyReply() {
    if (!reply) return;
    await navigator.clipboard.writeText(reply);
  }

  const cardTone = isPositive
    ? "border-l-4 border-l-emerald-500 bg-emerald-50"
    : isNeutral
      ? "border-l-4 border-l-yellow-500 bg-yellow-50"
      : "border-l-4 border-l-red-500 bg-red-50";

  const dateText = new Date(review.date || Date.now()).toLocaleDateString();
  const starText = "⭐".repeat(Math.max(1, Math.min(5, rating)));

  return (
    <article className={`relative rounded-xl border border-slate-200 p-4 shadow-sm ${cardTone}`}>
      {isUrgent && (
        <span className="absolute right-3 top-3 rounded-full bg-red-600 px-2 py-1 text-[10px] font-bold tracking-wide text-white">
          URGENT
        </span>
      )}

      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <p className="font-bold text-slate-900">{review.author}</p>
          <p className="text-xs text-slate-500">{dateText}</p>
        </div>
        <p className="text-sm">{starText}</p>
      </div>

      <p className="text-sm text-slate-700">{review.text}</p>

      <button
        onClick={handleGenerateReply}
        disabled={isGenerating}
        className="mt-4 rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isGenerating ? "Generating..." : "Generate AI Reply"}
      </button>

      {(isGenerating || reply) && (
        <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
          {isGenerating && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-purple-600" />
              AI reply generate ho raha hai...
            </div>
          )}

          {!isGenerating && reply && (
            <div className="space-y-2">
              <textarea
                readOnly
                rows={3}
                value={reply}
                className="w-full rounded-md border border-slate-300 p-2 text-sm"
              />
              <button
                onClick={handleCopyReply}
                className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Copy Reply
              </button>
              <p className="text-xs text-slate-500">Characters: {reply.length}</p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export default ReviewCard;
