import { UserProfile } from "@/types/user";

const USERS_KEY = "indcasting_users";
const CURRENT_USER_KEY = "indcasting_current_user";

export function getUsers(): UserProfile[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

export function registerUser(user: UserProfile) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function loginUser(email: string, password: string) {
  const users = getUsers();

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) return null;

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

  return user;
}

export function getCurrentUser(): UserProfile | null {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem(CURRENT_USER_KEY);

  return data ? JSON.parse(data) : null;
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}