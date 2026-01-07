"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInput from "@/components/Chat/ChatInput";
import ChatMessage from "@/components/Chat/ChatMessage";
import { ChatMessage as ChatMsg } from "@/types/chat";
import { streamChat } from "@/lib/sse";

const messageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [streaming, setStreaming] = useState(false);

  // 🔽 Auto-scroll anchor
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 🔄 Auto-scroll on new messages / chunks
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askQuestion = async (text: string) => {
    if (!text.trim() || streaming) return;

    // 1️⃣ User message
    setMessages((prev) => [...prev, { role: "user", text }]);

    // 2️⃣ Placeholder assistant message
    let streamedText = "";
    let sources: string[] = [];

    setMessages((prev) => [...prev, { role: "assistant", text: "" }]);
    setStreaming(true);

    try {
      await streamChat(
        text,

        // 🧠 Stream chunks
        (chunk) => {
          streamedText += chunk;

          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = {
              role: "assistant",
              text: streamedText,
              sources,
            };
            return copy;
          });
        },

        // 📎 Sources arrive at the end
        (src) => {
          sources = src;
        }
      );
    } catch (err) {
      console.error("Streaming failed:", err);
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          text: "Something went wrong while streaming.",
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col h-[80vh]"
    >
      {/* 💬 Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 px-1">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <ChatMessage message={msg} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* ✍️ Typing indicator */}
        <AnimatePresence>
          {streaming && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm italic
                         text-indigo-600/70"
            >
              OpsMind AI is typing…
            </motion.p>
          )}
        </AnimatePresence>

        {/* 🔽 Auto-scroll target */}
        <div ref={bottomRef} />
      </div>

      {/* ⌨️ Input */}
      <ChatInput onSend={askQuestion} disabled={streaming} />
    </motion.div>
  );
}
