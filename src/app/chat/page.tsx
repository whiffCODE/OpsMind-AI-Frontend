"use client";

import { useState, useEffect, useRef } from "react";
import { Variants, motion, AnimatePresence } from "framer-motion";
import ChatInput from "@/components/Chat/ChatInput";
import { ChatMessage as ChatMsg } from "@/types/chat";
import api from "@/lib/api";
import { useAuthGuard } from "@/lib/useAuthGuard";

/* ---------------- Animations ---------------- */

const messageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

/* ---------------- Helpers ---------------- */

function formatResponse(text: string) {
  const lines = text
    .replace(/[*•\-]/g, "")
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  const paragraphs: string[] = [];
  const points: string[] = [];

  lines.forEach(line => {
    if (/^\d+\./.test(line)) {
      points.push(line.replace(/^\d+\.\s*/, ""));
    } else {
      paragraphs.push(line);
    }
  });

  return { paragraphs, points };
}

async function simulateStreaming(
  fullText: string,
  onUpdate: (t: string) => void,
  speed = 28
) {
  const words = fullText.split(" ");
  let current = "";

  for (let i = 0; i < words.length; i++) {
    current += (i ? " " : "") + words[i];
    onUpdate(current);
    await new Promise(r => setTimeout(r, speed));
  }
}

/* ---------------- Component ---------------- */

export default function ChatPage() {
  useAuthGuard();

  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  /* Load chat history */
  useEffect(() => {
    api.get("/chat-history/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(res => setHistory(res.data));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askQuestion = async (text: string) => {
    if (!text.trim() || streaming) return;

    setMessages(p => [...p, { role: "user", text }]);
    setMessages(p => [...p, { role: "assistant", text: "" }]);
    setStreaming(true);

    try {
      const res = await api.post(
        "/chat/ask",
        { query: text },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const finalAnswer = res.data.answer || "";

      await simulateStreaming(finalAnswer, partial => {
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "assistant",
            text: partial,
          };
          return copy;
        });
      });

      // refresh history list
      const h = await api.get("/chat-history/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setHistory(h.data);

    } catch {
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          text: "Something went wrong while generating the response.",
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  };

  return (
    <div className="h-[90vh] grid grid-cols-[260px_1fr] gap-4">

      {/* 🧾 HISTORY SIDEBAR */}
      <aside className="border-r bg-gray-50 p-4 overflow-y-auto">
        <h2 className="text-sm font-semibold text-gray-600 mb-3">
          Your chats
        </h2>

        <div className="space-y-2">
          {history.map(chat => (
            <button
              key={chat._id}
              onClick={() =>
                setMessages([
                  { role: "user", text: chat.query },
                  { role: "assistant", text: chat.response },
                ])
              }
              className="w-full text-left px-3 py-2 rounded-md
                         text-sm text-gray-700
                         hover:bg-indigo-50 hover:text-indigo-700
                         transition"
            >
              {chat.query.slice(0, 32)}…
            </button>
          ))}
        </div>
      </aside>

      {/* 💬 CHAT AREA */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col relative"
      >
        <div className="flex-1 overflow-y-auto space-y-5 px-3">

          <AnimatePresence>
            {messages.map((msg, i) => {
              if (msg.role === "assistant") {
                const { paragraphs, points } = formatResponse(msg.text);

                return (
                  <motion.div
                    key={i}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-[80%] bg-white border rounded-xl p-4 shadow-sm"
                  >
                    {paragraphs.map((p, idx) => (
                      <p key={idx} className="text-sm mb-2">{p}</p>
                    ))}

                    {points.length > 0 && (
                      <ol className="list-decimal pl-5 text-sm space-y-1">
                        {points.map((pt, idx) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ol>
                    )}
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={i}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className="ml-auto max-w-[70%]
                             bg-gradient-to-r from-indigo-600 to-cyan-600
                             text-white rounded-xl px-4 py-2 text-sm"
                >
                  {msg.text}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {streaming && (
            <div className="text-sm italic text-indigo-600/70">
              OpsMind AI is typing ▋
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <ChatInput onSend={askQuestion} disabled={streaming} />
      </motion.div>
    </div>
  );
}
