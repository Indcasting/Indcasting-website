import { UserProfile } from "@/types/user";

const USER_KEY = "currentUser";

export function getCurrentUser(): UserProfile | null {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem(USER_KEY);

  if (!user) return null;

  return JSON.parse(user);
}

export function loginUser(user: UserProfile) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function logoutUser() {
  localStorage.removeItem(USER_KEY);
}