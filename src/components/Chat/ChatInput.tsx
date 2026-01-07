"use client";

import { useState } from "react";

export default function ChatInput({
  onSend,
  disabled = false,
}: {
  onSend: (t: string) => void;
  disabled?: boolean;
}) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="border-t pt-4 flex gap-2">
      <input
        className="flex-1 border rounded px-3 py-2 disabled:opacity-50"
        placeholder="Ask about SOPs…"
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }
        }}
      />

      <button
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={disabled}
        onClick={handleSend}
      >
        Ask
      </button>
    </div>
  );
}
