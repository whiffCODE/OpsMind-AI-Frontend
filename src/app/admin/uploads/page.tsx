"use client";

import { useState } from "react";
import api from "@/lib/api";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function AdminUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadSOP = async () => {
    if (!file || loading) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setStatus("Uploading and indexing SOP…");

      await api.post("/admin/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setStatus("SOP uploaded and indexed successfully 📘");
      setFile(null);
    } catch {
      setStatus("Upload failed. Please try again.");
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
        className="w-full max-w-lg space-y-6
                   border rounded-xl p-8
                   bg-white shadow-lg"
      >
        {/* Header */}
        <div className="space-y-1">
          <h2
            className="text-2xl font-bold
                       bg-gradient-to-r from-indigo-600 to-cyan-600
                       bg-clip-text text-transparent"
          >
            Admin – SOP Upload
          </h2>
          <p className="text-sm text-muted-foreground">
            Upload official SOP documents to update the OpsMind AI knowledge base.
          </p>
        </div>

        {/* File Input */}
        <motion.label
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          className="block border-2 border-dashed rounded-lg p-6
                     text-center cursor-pointer
                     hover:border-indigo-500 transition-colors"
        >
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <p className="text-sm font-medium">
            {file ? file.name : "Click to select a PDF file"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Only PDF files are supported
          </p>
        </motion.label>

        {/* Upload Button */}
        <motion.button
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={!file || loading}
          onClick={uploadSOP}
          className="w-full py-2 rounded-md
                     bg-gradient-to-r from-indigo-600 to-cyan-600
                     text-white font-medium
                     disabled:opacity-60
                     hover:opacity-90 transition"
        >
          {loading ? "Uploading…" : "Upload SOP"}
        </motion.button>

        {/* Status Message */}
        {status && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-center
                       text-indigo-600/80"
          >
            {status}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
