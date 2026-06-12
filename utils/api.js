export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://educappdf-back.vercel.app";

export function formatSize(bytes) {
  if (!bytes || bytes === 0) return "0 Ko";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export async function portailFetch(path, options = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("portail_token") : null;
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  return res;
}
