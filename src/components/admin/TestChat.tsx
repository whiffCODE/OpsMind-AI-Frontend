"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function TestChat() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<string[]>([]);

  const ask = async () => {
    const res = await api.post(
      "/chat/ask",
      { query },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Format response into paragraphs
    const formatted = res.data.answer
      .split(/\n\n+/) // split by blank lines
      .map((p: string) => p.trim())
      .filter(Boolean);

    setAnswer(formatted);
  };

  return (
    <div className="max-w-2xl space-y-4">
      <h2 className="text-xl font-semibold">Test Chat (Admin)</h2>

      <textarea
        className="w-full border p-2 rounded"
        rows={3}
        placeholder="Ask a test question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        onClick={ask}
        className="bg-gradient-to-r from-indigo-600 to-cyan-600
                   text-white px-4 py-2 rounded-md"
      >
        Ask
      </button>

      {answer.length > 0 && (
        <div className="border rounded p-4 bg-gray-50 space-y-3">
          {answer.map((para, idx) => (
            <p key={idx} className="text-sm leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
