// server/blogStore.js — persistencia de posts del blog.
//
// Producción: Cloud Datastore (la base "(default)" de memos-tablet está en modo
// Datastore, por eso no se usa el SDK de Firestore).
// Desarrollo local: BLOG_STORE=file guarda en server/.data/posts.json.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const SEED_POSTS = require('./seedPosts');

const KIND = 'SdlBlogPost';

const FIELDS = ['slug', 'title', 'summary', 'content', 'category', 'coverImage', 'video', 'videoTitle', 'author', 'status', 'publishedAt'];

function normalize(input, existing = {}) {
  const now = new Date().toISOString();
  const post = { ...existing };
  FIELDS.forEach((f) => {
    if (input[f] !== undefined) post[f] = typeof input[f] === 'string' ? input[f].trim() : input[f];
  });
  post.status = post.status === 'published' ? 'published' : 'draft';
  if (post.status === 'published' && !post.publishedAt) post.publishedAt = now;
  post.createdAt = existing.createdAt || now;
  post.updatedAt = now;
  return post;
}

function slugify(text) {
  return String(text || '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function validate(post) {
  const errors = [];
  if (!post.title || post.title.length < 3) errors.push('El título es obligatorio.');
  if (!post.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) errors.push('El slug solo puede tener minúsculas, números y guiones.');
  if (!post.content) errors.push('El contenido es obligatorio.');
  if (post.title && post.title.length > 160) errors.push('El título es muy largo (máx. 160).');
  if (post.summary && post.summary.length > 320) errors.push('El resumen es muy largo (máx. 320).');
  return errors;
}

// ── Adaptador Datastore ──────────────────────────────────────────
function datastoreAdapter() {
  const { Datastore } = require('@google-cloud/datastore');
  const ds = new Datastore();
  const toPost = (entity) => ({ id: entity[ds.KEY].name, ...entity });

  return {
    async all() {
      const [entities] = await ds.createQuery(KIND).run();
      return entities.map(toPost);
    },
    async get(id) {
      const [entity] = await ds.get(ds.key([KIND, id]));
      return entity ? toPost(entity) : null;
    },
    async save(id, data) {
      const { id: _omit, ...rest } = data;
      await ds.save({ key: ds.key([KIND, id]), data: rest, excludeFromIndexes: ['content', 'summary'] });
      return { id, ...rest };
    },
    async remove(id) {
      await ds.delete(ds.key([KIND, id]));
    },
  };
}

// ── Adaptador archivo local (solo desarrollo) ───────────────────
function fileAdapter() {
  const file = path.join(__dirname, '.data', 'posts.json');
  const read = () => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {});
  const write = (db) => {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(db, null, 2));
  };
  return {
    async all() { return Object.entries(read()).map(([id, p]) => ({ id, ...p })); },
    async get(id) { const p = read()[id]; return p ? { id, ...p } : null; },
    async save(id, data) { const db = read(); const { id: _omit, ...rest } = data; db[id] = rest; write(db); return { id, ...rest }; },
    async remove(id) { const db = read(); delete db[id]; write(db); },
  };
}

function createBlogStore() {
  const adapter = process.env.BLOG_STORE === 'file' ? fileAdapter() : datastoreAdapter();

  // Caché en memoria de los posts publicados (la lectura pública es la ruta caliente)
  let cache = null;
  let cacheAt = 0;
  const TTL = 60 * 1000;
  const invalidate = () => { cache = null; };

  async function allSorted() {
    const posts = await adapter.all();
    return posts.sort((a, b) => String(b.publishedAt || b.createdAt).localeCompare(String(a.publishedAt || a.createdAt)));
  }

  return {
    slugify,

    async listPublished() {
      if (cache && Date.now() - cacheAt < TTL) return cache;
      cache = (await allSorted()).filter((p) => p.status === 'published');
      cacheAt = Date.now();
      return cache;
    },

    async getPublishedBySlug(slug) {
      const posts = await this.listPublished();
      return posts.find((p) => p.slug === slug) || null;
    },

    async listAll() {
      return allSorted();
    },

    async get(id) {
      return adapter.get(id);
    },

    async create(input) {
      const post = normalize({ ...input, slug: input.slug || slugify(input.title) });
      const errors = validate(post);
      if (errors.length) return { errors };
      const all = await adapter.all();
      if (all.some((p) => p.slug === post.slug)) return { errors: ['Ya existe un post con ese slug.'] };
      const id = crypto.randomUUID();
      const saved = await adapter.save(id, post);
      invalidate();
      return { post: saved };
    },

    async update(id, input) {
      const existing = await adapter.get(id);
      if (!existing) return { notFound: true };
      const post = normalize(input, existing);
      const errors = validate(post);
      if (errors.length) return { errors };
      const all = await adapter.all();
      if (all.some((p) => p.slug === post.slug && p.id !== id)) return { errors: ['Ya existe un post con ese slug.'] };
      const saved = await adapter.save(id, post);
      invalidate();
      return { post: saved };
    },

    async remove(id) {
      await adapter.remove(id);
      invalidate();
    },

    // Carga los posts históricos del sitio si la colección está vacía
    async seedIfEmpty() {
      const all = await adapter.all();
      if (all.length > 0) return 0;
      for (const p of SEED_POSTS) {
        await adapter.save(crypto.randomUUID(), normalize(p));
      }
      invalidate();
      return SEED_POSTS.length;
    },
  };
}

module.exports = { createBlogStore, slugify };
