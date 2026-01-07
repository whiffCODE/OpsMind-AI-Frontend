"use client";
import { useState } from "react";
import SourceBadge from "../Sources/SourceBadge";
import SourceModal from "../Sources/SourceModal";

export default function ChatMessage({ message }: any) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  return (
    <div className="p-3 rounded bg-secondary space-y-2">
      <p>
  {message.text}
  {message.role === "assistant" && message.text && (
    <span className="animate-pulse">▍</span>
  )}
</p>


      {message.sources && (
        <div className="flex gap-2 flex-wrap">
          {message.sources.map((s: string) => (
            <SourceBadge
              key={s}
              label={s}
              onClick={() => {
                setActive(s);
                setOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <SourceModal open={open} onClose={() => setOpen(false)} source={active} />
    </div>
  );
}
