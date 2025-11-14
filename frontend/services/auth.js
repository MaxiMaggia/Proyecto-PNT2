const API = process.env.EXPO_PUBLIC_API_URL || 'http://IP:3000';

export async function loginRequest(email, password) {
  const r = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err.message || 'Error de login');
  }
  return r.json(); 
}
