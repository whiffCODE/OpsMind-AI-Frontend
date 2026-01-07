"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getUserFromToken, logout } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<{
    role: "admin" | "user";
  } | null>(null);

  useEffect(() => {
    setUser(getUserFromToken());
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="border-b bg-white/80 backdrop-blur sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Brand */}
        <Link
          href="/"
          className="text-lg font-bold
                     bg-gradient-to-r from-indigo-600 to-cyan-600
                     bg-clip-text text-transparent"
        >
          OpsMind AI
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-6 text-sm font-medium">
          {user && (
            <Link
              href="/chat"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Chat
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              href="/admin/uploads"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Admin
            </Link>
          )}

          {!user && (
            <>
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>

              <Link
                href="/auth/signup"
                className="border px-4 py-1.5 rounded-md
                           hover:border-indigo-500
                           hover:text-indigo-600 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <button
              onClick={logout}
              className="px-4 py-1.5 rounded-md
                         border text-gray-700
                         hover:border-red-500
                         hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
