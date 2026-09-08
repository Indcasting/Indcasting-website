"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Inline fallback for getCurrentUser to avoid resolving an external utils module here.
// This reads a JSON-serialized user from localStorage under the key "currentUser".
function getCurrentUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("currentUser");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push("/login");
      return;
    }
    router.push(user.role === "talent" ? "/dashboard/talent" : "/dashboard/seeker");
  }, [router]);

  return null;
}
