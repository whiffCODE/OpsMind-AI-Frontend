"use client";

import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { getUserFromToken, logout } from "@/lib/auth";
import { useEffect, useState } from "react";

/* ---------------- Animations ---------------- */

const navContainer: Variants = {
  hidden: {
    opacity: 0,
    y: -16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      // ✅ FIX: easing array instead of string
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
  },
};

export default function Navbar() {
  const [user, setUser] = useState<{ role: "admin" | "user" } | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(getUserFromToken());
  }, []);

  return (
    <motion.nav
      variants={navContainer}
      initial="hidden"
      animate="visible"
      className="
        sticky top-0 z-50
        border-b bg-white/80 backdrop-blur
        supports-[backdrop-filter]:bg-white/60
      "
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="
            text-lg font-bold tracking-tight
            bg-gradient-to-r from-indigo-600 to-cyan-600
            bg-clip-text text-transparent
          "
        >
          OpsMind AI
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Guest */}
          {!user && (
            <>
              <Link
                href="/auth/login"
                className="text-sm text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>

              <Link
                href="/auth/signup"
                className="
                  px-4 py-1.5 rounded-md text-sm
                  border border-gray-300
                  hover:border-indigo-500
                  hover:text-indigo-600
                  transition-colors
                "
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Authenticated */}
          {user && (
            <div className="relative">
              {/* Avatar */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setOpen((v) => !v)}
                className="
                  w-9 h-9 rounded-full
                  bg-gradient-to-r from-indigo-600 to-cyan-600
                  text-white text-sm font-semibold
                  flex items-center justify-center
                "
              >
                {user.role === "admin" ? "A" : "U"}
              </motion.button>

              {/* Dropdown */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="
                      absolute right-0 mt-3 w-48
                      rounded-xl border bg-white shadow-lg
                      overflow-hidden
                    "
                  >
                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Profile
                    </Link>

                    <Link
                      href="/chat"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Chat
                    </Link>

                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Admin
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        setOpen(false);
                        logout();
                      }}
                      className="
                        w-full text-left px-4 py-2 text-sm
                        hover:bg-red-50 text-red-600
                      "
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
