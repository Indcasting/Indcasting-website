const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function apiFetch(
  path: string,
  options: RequestInit = {},
) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();

    throw new Error(
      `API error ${response.status}: ${text || response.statusText}`,
    );
  }

  return response.json();
}