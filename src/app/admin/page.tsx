"use client";

import { useState } from "react";
import { useAuthGuard } from "@/lib/useAuthGuard";
import { motion, AnimatePresence } from "framer-motion";

import UploadSOP from "@/components/admin/UploadSOP";
import SOPManager from "@/components/admin/SOPManager";
import TestChat from "@/components/admin/TestChat";

const tabs = [
  { key: "Upload SOP", label: "Upload SOP" },
  { key: "SOP Manager", label: "SOP Manager" },
  { key: "Test Chat", label: "Test Chat" },
] as const;

type TabKey = typeof tabs[number]["key"];

export default function AdminPage() {
  useAuthGuard("admin");

  const [activeTab, setActiveTab] = useState<TabKey>("Upload SOP");

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="max-w-6xl mx-auto py-10 px-4 space-y-8"
    >
      {/* Header */}
      <div className="space-y-1">
        <h1
          className="text-3xl font-bold
                     bg-gradient-to-r from-indigo-600 to-cyan-600
                     bg-clip-text text-transparent"
        >
          Admin Control Panel
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage SOPs, indexing, and internal testing for OpsMind AI.
        </p>
      </div>

      {/* Tabs */}
      <div className="relative inline-flex gap-1 rounded-xl
                      bg-gray-100/80 p-1 shadow-inner">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="relative px-5 py-2 text-sm font-medium z-10"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  className="absolute inset-0 rounded-lg
                             bg-white shadow-sm border"
                />
              )}
              <span
                className={`relative ${
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                } transition-colors`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Card */}
      <div
        className="relative rounded-2xl border bg-white
                   shadow-sm p-6 min-h-[320px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {activeTab === "Upload SOP" && <UploadSOP />}
            {activeTab === "SOP Manager" && <SOPManager />}
            {activeTab === "Test Chat" && <TestChat />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
