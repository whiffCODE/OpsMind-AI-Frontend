"use client";

import api from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants, easeOut } from "framer-motion";

/* ✅ Typed & Safe Animation */
const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut, // ✅ FIXED
    },
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async () => {
    if (!email || !password) return;

    try {
      setLoading(true);
      const res = aawait api.post("/auth/signup", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      router.push("/chat");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="
          w-full max-w-sm space-y-6
          border rounded-xl p-8
          bg-white shadow-lg
        "
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h2
            className="
              text-2xl font-bold
              bg-gradient-to-r from-indigo-600 to-cyan-600
              bg-clip-text text-transparent
            "
          >
            OpsMind AI
          </h2>
          <p className="text-sm text-muted-foreground">
            Sign in to access the knowledge workspace
          </p>
        </div>

        {/* Email */}
        <motion.input
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            border rounded-md p-2 w-full
            focus:outline-none
            focus:ring-2 focus:ring-indigo-500/40
            transition
          "
        />

        {/* Password */}
        <motion.input
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            border rounded-md p-2 w-full
            focus:outline-none
            focus:ring-2 focus:ring-indigo-500/40
            transition
          "
        />

        {/* Login Button */}
        <motion.button
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          onClick={login}
          className="
            w-full py-2 rounded-md
            bg-gradient-to-r from-indigo-600 to-cyan-600
            text-white font-medium
            hover:opacity-90
            disabled:opacity-60
            transition
          "
        >
          {loading ? "Signing in…" : "Login"}
        </motion.button>
      </motion.div>
    </div>
  );
}
