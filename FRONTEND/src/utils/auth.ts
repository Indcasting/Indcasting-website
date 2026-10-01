import type { UserProfile } from "@/types/user";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const CURRENT_USER_KEY = "indcasting_current_user";

interface BackendUser {
  id: string;
  name: string;
  email: string;
  role: "talent" | "seeker";

  // Backend currently returns these only through some user/profile
  // responses, so keep them optional here.
  phone?: string | null;
  mobile?: string | null;
  city?: string | null;
  region?: string | null;
  bio?: string | null;
}

interface AuthResponse {
  user: BackendUser;
}

function normalizeUser(user: BackendUser): UserProfile {
  return {
    id: user.id,
    name: user.name,
    email: user.email,

    // The frontend UserProfile still expects these fields.
    // The backend auth response does not currently return them,
    // so use empty strings rather than inventing values.
    password: "",
    phone: user.phone ?? user.mobile ?? "",
    city: user.city ?? user.region ?? "",
    role: user.role,
    bio: user.bio ?? "",
  };
}

function saveCurrentUser(user: UserProfile) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(user)
  );
}

function clearCurrentUser() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(CURRENT_USER_KEY);
  sessionStorage.removeItem(CURRENT_USER_KEY);
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return null;
}

function getErrorMessage(data: any, fallback: string): string {
  if (!data) return fallback;

  if (Array.isArray(data.message)) {
    return data.message.join(", ");
  }

  if (typeof data.message === "string") {
    return data.message;
  }

  if (typeof data.error === "string") {
    return data.error;
  }

  return fallback;
}

/**
 * Register a new user through the NestJS backend.
 */
export async function registerUser(
  userData: Omit<UserProfile, "id"> & {
    password: string;
    phone?: string;
    city?: string;
  },
  _remember = true
): Promise<UserProfile> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      password: userData.password,
      phone: userData.phone?.trim() || undefined,
      city: userData.city?.trim() || undefined,
      role: userData.role,
    }),
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(
        data,
        "Unable to create your account. Please try again."
      )
    );
  }

  if (!data?.user) {
    throw new Error(
      "Account was created, but the server did not return user information."
    );
  }

  const user = normalizeUser(data.user);

  saveCurrentUser(user);

  return user;
}

/**
 * Login through the NestJS backend.
 *
 * The backend sets the JWT as an HTTP-only cookie.
 * We do NOT store the JWT in localStorage.
 */
export async function loginUser(
  email: string,
  password: string,
  _remember = true
): Promise<UserProfile> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
    }),
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(
        data,
        "Invalid email or password."
      )
    );
  }

  if (!data?.user) {
    throw new Error(
      "Login succeeded, but the server did not return user information."
    );
  }

  const user = normalizeUser(data.user);

  saveCurrentUser(user);

  return user;
}

/**
 * Get the currently authenticated user from the backend.
 *
 * Important:
 * /auth/me returns the user directly, NOT { user: ... }.
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();

      const user = normalizeUser(data);

      saveCurrentUser(user);

      return user;
    }

    if (response.status === 401) {
      clearCurrentUser();
      return null;
    }

    return getCachedUser();
  } catch (error) {
    console.error("Failed to get current user:", error);

    return getCachedUser();
  }
}

/**
 * Read the cached frontend user.
 *
 * This is only a UI cache.
 * Authentication itself is handled by the HTTP-only backend cookie.
 */
function getCachedUser(): UserProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY);

    if (!stored) {
      return null;
    }

    return JSON.parse(stored) as UserProfile;
  } catch {
    clearCurrentUser();
    return null;
  }
}

/**
 * Logout from the backend and clear the local UI cache.
 */
export async function logoutUser(): Promise<void> {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Backend logout failed:", error);
  } finally {
    clearCurrentUser();
  }
}

/**
 * Update user information.
 *
 * The current backend auth API does not expose a general
 * user-update endpoint, so keep the existing local behaviour
 * for now rather than sending unsupported requests.
 */
export async function updateUser(
  updates: Partial<UserProfile>
): Promise<UserProfile | null> {
  const currentUser = getCachedUser();

  if (!currentUser) {
    return null;
  }

  const updatedUser: UserProfile = {
    ...currentUser,
    ...updates,
  };

  saveCurrentUser(updatedUser);

  return updatedUser;
}
