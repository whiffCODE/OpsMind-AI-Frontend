"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { useAuthGuard } from "@/lib/useAuthGuard";

type Profile = {
  name?: string;
  email?: string;
  role: "admin" | "user";
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useAuthGuard();

  useEffect(() => {
    api
      .get("/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const data = res.data?.user ?? res.data;
        setProfile(data);
      })
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-sm text-gray-500">
        Loading profile…
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center py-20 text-sm text-red-500">
        Failed to load profile
      </div>
    );
  }

  /* ✅ SAFE DERIVED VALUES */
  const name = profile.name?.trim() || "User";
  const email = profile.email?.trim() || "—";
  const initials =
    (profile.name && profile.name.slice(0, 2)) ||
    (profile.email && profile.email.slice(0, 2)) ||
    "U";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="max-w-xl mx-auto py-10 px-4 space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
          Profile
        </h1>
        <p className="text-sm text-gray-500">
          Account details and access level
        </p>
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl border bg-white shadow-sm overflow-hidden"
      >
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-cyan-500" />

        <div className="p-6 space-y-6">
          {/* Identity */}
          <div className="flex items-center gap-4">
            <div
              className={`h-12 w-12 rounded-full flex items-center justify-center
                text-white font-semibold
                ${
                  profile.role === "admin"
                    ? "bg-gradient-to-br from-indigo-600 to-indigo-400"
                    : "bg-gradient-to-br from-cyan-600 to-cyan-400"
                }`}
            >
              {initials.toUpperCase()}
            </div>

            <div>
              <p className="text-sm text-gray-500">Signed in as</p>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-gray-600">{email}</p>
            </div>
          </div>

          {/* Role */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Role</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                ${
                  profile.role === "admin"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-cyan-100 text-cyan-700"
                }`}
            >
              {profile.role.toUpperCase()}
            </span>
          </div>

          {/* Description */}
          <div className="text-sm text-gray-500 border-t pt-4">
            {profile.role === "admin"
              ? "You have administrative access to SOP management, indexing, and system tools."
              : "You have access to SOP-based chat and your personal chat history."}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
