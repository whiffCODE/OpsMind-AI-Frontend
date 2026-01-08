"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

type SOP = {
  _id: string;
  docId: string;
  fileName: string;
  totalPages: number;
};

export default function SOPManager() {
  const [sops, setSops] = useState<SOP[]>([]);
  const [loading, setLoading] = useState(false);

  const loadSOPs = async () => {
    try {
      const res = await api.get("/admin/sops", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSops(res.data);
    } catch (err) {
      console.error("Failed to load SOPs", err);
    }
  };

  useEffect(() => {
    loadSOPs();
  }, []);

  const reindex = async (docId: string) => {
    try {
      setLoading(true);
      await api.post(
        `/admin/reindex/${docId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Reindex completed successfully 🔄");
    } catch (err) {
      console.error("Reindex failed", err);
      alert("Reindex failed");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (docId: string) => {
    if (!confirm("Delete SOP permanently?")) return;

    try {
      await api.delete(`/admin/sop/${docId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSops((prev) => prev.filter((s) => s.docId !== docId));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">SOP Manager</h2>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">File Name</th>
            <th className="p-2">Pages</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sops.map((sop) => (
            <tr key={sop._id} className="border-t">
              <td className="p-2">{sop.fileName}</td>
              <td className="p-2 text-center">{sop.totalPages}</td>
              <td className="p-2 flex gap-4 justify-center">
                <button
                  disabled={loading}
                  onClick={() => reindex(sop.docId)}
                  className="text-indigo-600 hover:underline disabled:opacity-50"
                >
                  Reindex
                </button>

                <button
                  disabled={loading}
                  onClick={() => remove(sop.docId)}
                  className="text-red-600 hover:underline disabled:opacity-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {sops.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                No SOPs uploaded yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
