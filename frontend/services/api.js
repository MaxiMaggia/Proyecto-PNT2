
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

let authToken = null;
export function setToken(token) { authToken = token || null; }

export async function apiFetch(path, { method = 'GET', headers = {}, body } = {}) {
  const h = { 'Content-Type': 'application/json', ...headers };
  if (authToken) h.Authorization = `Bearer ${authToken}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: h,
    body: body ? JSON.stringify(body) : undefined,
  });


  let data = null;
  try { data = await res.json(); } catch {}

  if (!res.ok) {
    const msg = data?.message || data?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}
