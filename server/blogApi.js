// server/blogApi.js — API REST del blog.
//   Público:  GET  /api/posts            GET /api/posts/:slug
//   Admin:    POST /api/admin/login      POST /api/admin/logout
//             GET  /api/admin/posts      GET  /api/admin/posts/:id
//             POST /api/admin/posts      PUT  /api/admin/posts/:id
//             DELETE /api/admin/posts/:id
const express = require('express');
const { login, logout, requireAdmin } = require('./adminAuth');

// Lo que ve el público en el listado (sin el contenido completo)
const readingMinutes = (text) => Math.max(1, Math.round(String(text || '').trim().split(/\s+/).length / 200));
const summaryOf = ({ id, slug, title, summary, category, coverImage, author, publishedAt, content }) =>
  ({ id, slug, title, summary, category, coverImage, author, publishedAt, readingMinutes: readingMinutes(content) });

const publicPost = ({ status, createdAt, updatedAt, ...rest }) => rest;

function createBlogApi(store) {
  const router = express.Router();
  router.use(express.json({ limit: '1mb' }));

  const wrap = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.error('[blog-api]', err);
      res.status(500).json({ error: 'Error interno del servidor.' });
    });

  // ── Público ──
  router.get('/posts', wrap(async (req, res) => {
    const posts = await store.listPublished();
    res.set('Cache-Control', 'public, max-age=60');
    res.json(posts.map(summaryOf));
  }));

  router.get('/posts/:slug', wrap(async (req, res) => {
    const post = await store.getPublishedBySlug(req.params.slug);
    if (!post) return res.status(404).json({ error: 'Post no encontrado.' });
    res.set('Cache-Control', 'public, max-age=60');
    return res.json(publicPost(post));
  }));

  // ── Admin ──
  router.post('/admin/login', wrap(login));
  router.post('/admin/logout', logout);

  const admin = express.Router();
  admin.use(wrap(requireAdmin));
  admin.use((req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });

  admin.get('/session', (req, res) => res.json({ ok: true }));

  admin.get('/posts', wrap(async (req, res) => {
    res.json(await store.listAll());
  }));

  admin.get('/posts/:id', wrap(async (req, res) => {
    const post = await store.get(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado.' });
    return res.json(post);
  }));

  admin.post('/posts', wrap(async (req, res) => {
    const result = await store.create(req.body || {});
    if (result.errors) return res.status(400).json({ error: result.errors.join(' ') });
    return res.status(201).json(result.post);
  }));

  admin.put('/posts/:id', wrap(async (req, res) => {
    const result = await store.update(req.params.id, req.body || {});
    if (result.notFound) return res.status(404).json({ error: 'Post no encontrado.' });
    if (result.errors) return res.status(400).json({ error: result.errors.join(' ') });
    return res.json(result.post);
  }));

  admin.delete('/posts/:id', wrap(async (req, res) => {
    await store.remove(req.params.id);
    res.json({ ok: true });
  }));

  router.use('/admin', admin);
  router.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada.' }));
  return router;
}

module.exports = { createBlogApi };
