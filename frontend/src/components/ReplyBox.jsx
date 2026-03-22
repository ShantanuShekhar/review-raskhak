import { useState } from "react";

function ReplyBox() {
  const [reply, setReply] = useState("");

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        AI Reply Draft
      </label>
      <textarea
        value={reply}
        onChange={(event) => setReply(event.target.value)}
        rows={4}
        className="w-full rounded-lg border border-slate-300 p-2 outline-none focus:border-sky-400"
        placeholder="Write or paste suggested reply..."
      />
    </div>
  );
}

export default ReplyBox;
