"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function UploadSOP() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const upload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("Uploading & indexing...");
      await api.post("/admin/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStatus("SOP uploaded successfully 📘");
      setFile(null);
    } catch {
      setStatus("Upload failed");
    }
  };

  return (
    <div className="max-w-lg space-y-4">
      <h2 className="text-xl font-semibold">Upload SOP</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={upload}
        className="bg-gradient-to-r from-indigo-600 to-cyan-600
                   text-white px-4 py-2 rounded-md"
      >
        Upload
      </button>

      {status && <p className="text-sm">{status}</p>}
    </div>
  );
}
