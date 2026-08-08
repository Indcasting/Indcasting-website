import { UserProfile } from "@/types/user";
import { cache } from "./cache";

const USERS_KEY = "indcasting_users";
const USERS_CACHE_KEY = "users_list";
const CURRENT_USER_KEY = "indcasting_current_user";

export function getUsers(): UserProfile[] {
  if (typeof window === "undefined") return [];

  const cached = cache.get<UserProfile[]>(USERS_CACHE_KEY);
  if (cached) return cached;

  const data = localStorage.getItem(USERS_KEY) || "[]";
  const users = JSON.parse(data);

  cache.set(USERS_CACHE_KEY, users, 5);
  return users;
}

export function registerUser(user: UserProfile) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  cache.remove(USERS_CACHE_KEY);
}

export function loginUser(email: string, password: string, remember: boolean = true) {
  const users = getUsers();

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) return null;

  if (remember) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }

  return user;
}

export function getCurrentUser(): UserProfile | null {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem(CURRENT_USER_KEY) || sessionStorage.getItem(CURRENT_USER_KEY);

  return data ? JSON.parse(data) : null;
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
  sessionStorage.removeItem(CURRENT_USER_KEY);
}

export function updateUser(oldEmail: string, updatedUser: UserProfile) {
  if (typeof window === "undefined") return;

  const users = getUsers();
  const index = users.findIndex(u => u.email === oldEmail);
  if (index !== -1) {
    users[index] = updatedUser;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    cache.remove(USERS_CACHE_KEY);
  }

  if (localStorage.getItem(CURRENT_USER_KEY)) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
  } else if (sessionStorage.getItem(CURRENT_USER_KEY)) {
    sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
  }
}