// src/pages/admin/AdminApp.js — portal de administración del blog (/admin)
// Se carga con React.lazy: no pesa en el bundle del sitio público.
import React, { useCallback, useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import PostList from './PostList';
import PostEditor from './PostEditor';

function Login({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminApi.login(password);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-paper px-4">
      <form onSubmit={submit} className="w-full max-w-sm border border-ink/15 bg-paper p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">Sur Digital Labs</p>
        <h1 className="mt-3 font-display text-4xl text-ink">Administración<span className="text-laguna">.</span></h1>
        <label htmlFor="password" className="mt-8 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-2">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-11 border border-ink/20 bg-paper px-3 text-ink focus:outline-none focus:border-ink"
        />
        {error && <p className="mt-3 text-sm text-ember" role="alert">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="mt-6 w-full rounded-sm bg-ink py-3 text-sm font-semibold text-paper hover:bg-petrol disabled:opacity-40 transition-colors"
        >
          {loading ? 'Ingresando…' : 'Ingresar'}
        </button>
        <Link to="/" className="mt-6 block text-center text-xs text-ink/50 hover:text-ink">← Volver al sitio</Link>
      </form>
    </div>
  );
}

function AdminShell({ children, onLogout }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/admin" className="flex items-baseline gap-3">
            <span className="font-display font-semibold text-lg">Sur Digital Labs</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember">Admin</span>
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <Link to="/blog" target="_blank" className="text-ink/60 hover:text-ink">Ver blog ↗</Link>
            <button type="button" onClick={onLogout} className="text-ink/60 hover:text-ember">Salir</button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

export default function AdminApp() {
  const [auth, setAuth] = useState('checking'); // checking | in | out
  const navigate = useNavigate();

  useEffect(() => {
    adminApi.session().then(() => setAuth('in')).catch(() => setAuth('out'));
  }, []);

  // Si una petición devuelve 401 (sesión expirada), vuelve al login
  const onAuthError = useCallback((err) => {
    if (err && err.status === 401) setAuth('out');
  }, []);

  const logout = async () => {
    await adminApi.logout().catch(() => {});
    setAuth('out');
    navigate('/admin');
  };

  if (auth === 'checking') {
    return <div className="min-h-screen grid place-items-center bg-paper font-mono text-xs uppercase tracking-[0.2em] text-ink/50">Cargando…</div>;
  }
  if (auth === 'out') return <Login onSuccess={() => setAuth('in')} />;

  return (
    <AdminShell onLogout={logout}>
      <Routes>
        <Route index element={<PostList onAuthError={onAuthError} />} />
        <Route path="nuevo" element={<PostEditor onAuthError={onAuthError} />} />
        <Route path="editar/:id" element={<PostEditor onAuthError={onAuthError} />} />
      </Routes>
    </AdminShell>
  );
}
