import { UserProfile } from "@/types/user";
import { cache } from "./cache";

const USERS_KEY = "indcasting_users";
const USERS_CACHE_KEY = "users_list";
const CURRENT_USER_KEY = "indcasting_current_user";
const PASSWORD_SALT_KEY = "indcasting_password_salt";

function getSalt(): string {
  if (typeof window === "undefined") return "";
  const salt = localStorage.getItem(PASSWORD_SALT_KEY);
  if (salt) return salt;
  const random = Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, "0")).join("");
  localStorage.setItem(PASSWORD_SALT_KEY, random);
  return random;
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const array = new Uint8Array(hash);
  return Array.from(array, b => b.toString(16).padStart(2, "0")).join("");
}

async function verifyPassword(password: string, salt: string, hash: string): Promise<boolean> {
  const computedHash = await hashPassword(password, salt);
  return computedHash === hash;
}

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

  // Store the user with hashed password
  const hashedPassword = hashPassword(user.password, getSalt());
  const userWithHash = {
    ...user,
    password: hashedPassword
  };

  users.push(userWithHash);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  cache.remove(USERS_CACHE_KEY);
}

export function loginUser(email: string, password: string, remember: boolean = true) {
  const users = getUsers();
  const salt = getSalt();

  const user = users.find(
    u => u.email === email
  );

  if (!user) return null;

  // Verify password using the stored salt and hash
  const isValid = verifyPassword(password, salt, user.password);

  if (!isValid) return null;

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