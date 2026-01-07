"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

export default function SourceModal({
  open,
  onClose,
  source,
}: {
  open: boolean;
  onClose: () => void;
  source: string;
}) {
  const [snippet, setSnippet] = useState("");

  useEffect(() => {
    if (!open) return;

    const [docId, page] = source.split(", Page ");

    api
      .get(`/sources/snippet?docId=${docId}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setSnippet(res.data.text))
      .catch(() => setSnippet("Snippet not available"));
  }, [open, source]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>{source}</DialogHeader>
        <p className="text-sm whitespace-pre-wrap">{snippet}</p>
      </DialogContent>
    </Dialog>
  );
}
