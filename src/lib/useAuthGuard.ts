"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "@/lib/auth";

export const useAuthGuard = (
  role?: "admin" | "user"
) => {
  const router = useRouter();

  useEffect(() => {
    const user = getUserFromToken();

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    if (role && user.role !== role) {
      router.replace("/chat");
    }
  }, [router, role]);
};
