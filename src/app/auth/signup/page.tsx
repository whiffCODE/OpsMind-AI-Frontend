"use client";

import api from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signup = async () => {
    if (!name || !email || !password) return;

    try {
      setLoading(true);
      await api.post("/auth/signup", { name, email, password });
      router.push("/auth/login");
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
        className="w-full max-w-sm space-y-6
                   border rounded-xl p-8
                   bg-white shadow-lg"
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          custom={1}
          className="text-center space-y-2"
        >
          <h2
            className="text-2xl font-bold
                       bg-gradient-to-r from-indigo-600 to-cyan-600
                       bg-clip-text text-transparent"
          >
            Create your account
          </h2>
          <p className="text-sm text-muted-foreground">
            Join OpsMind AI to access trusted SOP intelligence
          </p>
        </motion.div>

        {/* Name */}
        <motion.input
          variants={fadeUp}
          custom={2}
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-md p-2 w-full
                     focus:outline-none
                     focus:ring-2 focus:ring-indigo-500/40
                     transition"
        />

        {/* Email */}
        <motion.input
          variants={fadeUp}
          custom={3}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-md p-2 w-full
                     focus:outline-none
                     focus:ring-2 focus:ring-indigo-500/40
                     transition"
        />

        {/* Password */}
        <motion.input
          variants={fadeUp}
          custom={4}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-md p-2 w-full
                     focus:outline-none
                     focus:ring-2 focus:ring-indigo-500/40
                     transition"
        />

        {/* Signup Button */}
        <motion.button
          variants={fadeUp}
          custom={5}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          onClick={signup}
          className="w-full py-2 rounded-md
                     bg-gradient-to-r from-indigo-600 to-cyan-600
                     text-white font-medium
                     hover:opacity-90
                     disabled:opacity-60
                     transition"
        >
          {loading ? "Creating account…" : "Sign Up"}
        </motion.button>

        {/* Login Link */}
        <motion.p
          variants={fadeUp}
          custom={6}
          className="text-sm text-center text-muted-foreground"
        >
          Already a user?{" "}
          <Link
            href="/auth/login"
            className="text-indigo-600 hover:underline"
          >
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
