// src/lib/api.js — cliente de la API del blog (server/blogApi.js)

async function request(method, url, body) {
  const res = await fetch(url, {
    method,
    credentials: 'same-origin',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = null;
  try { data = await res.json(); } catch { /* respuesta sin cuerpo JSON */ }
  if (!res.ok) {
    const err = new Error((data && data.error) || `Error ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export const blogApi = {
  list: () => request('GET', '/api/posts'),
  get: (slug) => request('GET', `/api/posts/${encodeURIComponent(slug)}`),
};

export const adminApi = {
  login: (password) => request('POST', '/api/admin/login', { password }),
  logout: () => request('POST', '/api/admin/logout'),
  session: () => request('GET', '/api/admin/session'),
  list: () => request('GET', '/api/admin/posts'),
  get: (id) => request('GET', `/api/admin/posts/${id}`),
  create: (post) => request('POST', '/api/admin/posts', post),
  update: (id, post) => request('PUT', `/api/admin/posts/${id}`, post),
  remove: (id) => request('DELETE', `/api/admin/posts/${id}`),
};

export const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
