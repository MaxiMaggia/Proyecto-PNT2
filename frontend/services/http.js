
const API = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

let authToken = null;
export function setAuthToken(token) { authToken = token || null; }

async function request(path, { method = 'GET', headers = {}, body } = {}) {
  const finalHeaders = { 'Content-Type': 'application/json', ...headers };
  if (authToken) finalHeaders.Authorization = `Bearer ${authToken}`;

  const res = await fetch(`${API}${path}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try { data = await res.json(); } catch { /* noop */ }

  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export const http = {
  get: (p) => request(p, { method: 'GET' }),
  post: (p, b) => request(p, { method: 'POST', body: b }),
  put: (p, b) => request(p, { method: 'PUT', body: b }),
  del: (p) => request(p, { method: 'DELETE' }),
};

export { API };
