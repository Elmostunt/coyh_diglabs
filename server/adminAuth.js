// server/adminAuth.js — autenticación del panel /admin.
//
// La configuración ({ passwordHash, sessionSecret }) se lee de:
//   1. env ADMIN_CONFIG (JSON) — desarrollo local
//   2. Secret Manager: projects/<proyecto>/secrets/sdl-blog-admin — producción
// Si no hay configuración, el admin queda deshabilitado (el sitio público sigue funcionando).
// Genera la configuración con: node scripts/admin-config.js
const crypto = require('crypto');

const COOKIE = 'sdl_admin';
const SESSION_HOURS = 12;
const SECRET_NAME = 'sdl-blog-admin';

let configPromise = null;

async function loadConfig() {
  if (process.env.ADMIN_CONFIG) return JSON.parse(process.env.ADMIN_CONFIG);
  const project = process.env.GOOGLE_CLOUD_PROJECT;
  if (!project) return null;
  try {
    const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
    const client = new SecretManagerServiceClient();
    const [version] = await client.accessSecretVersion({
      name: `projects/${project}/secrets/${SECRET_NAME}/versions/latest`,
    });
    return JSON.parse(version.payload.data.toString('utf8'));
  } catch (err) {
    console.error(`[admin] No se pudo leer el secreto ${SECRET_NAME}: ${err.message}`);
    return null;
  }
}

function getConfig() {
  if (!configPromise) {
    configPromise = loadConfig().then((cfg) => {
      if (!cfg || !cfg.passwordHash || !cfg.sessionSecret) {
        configPromise = null; // reintentar en la próxima petición
        return null;
      }
      return cfg;
    });
  }
  return configPromise;
}

// Formato del hash: scrypt$<salt hex>$<hash hex>
function verifyPassword(password, stored) {
  const [algo, saltHex, hashHex] = String(stored).split('$');
  if (algo !== 'scrypt' || !saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, 'hex');
  const actual = crypto.scryptSync(String(password), Buffer.from(saltHex, 'hex'), expected.length);
  return crypto.timingSafeEqual(actual, expected);
}

function sign(payload, secret) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const mac = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${mac}`;
}

function verifyToken(token, secret) {
  const [body, mac] = String(token || '').split('.');
  if (!body || !mac) return null;
  const expected = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  return payload.exp > Date.now() ? payload : null;
}

function readCookie(req, name) {
  const header = req.headers.cookie || '';
  const match = header.split(';').map((c) => c.trim()).find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

// Límite simple de intentos por IP (memoria de la instancia)
const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function tooManyAttempts(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.first > WINDOW_MS) return false;
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailure(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.first > WINDOW_MS) attempts.set(ip, { first: now, count: 1 });
  else entry.count += 1;
}

const isProd = () => process.env.NODE_ENV === 'production';

function cookieOptions(maxAgeSeconds) {
  return [
    `Max-Age=${maxAgeSeconds}`,
    'Path=/api/admin',
    'HttpOnly',
    'SameSite=Strict',
    isProd() ? 'Secure' : null,
  ].filter(Boolean).join('; ');
}

async function login(req, res) {
  const cfg = await getConfig();
  if (!cfg) return res.status(503).json({ error: 'El panel de administración no está configurado.' });

  const ip = req.ip;
  if (tooManyAttempts(ip)) return res.status(429).json({ error: 'Demasiados intentos. Espera 15 minutos.' });

  const { password } = req.body || {};
  if (!password || !verifyPassword(password, cfg.passwordHash)) {
    recordFailure(ip);
    return res.status(401).json({ error: 'Contraseña incorrecta.' });
  }

  attempts.delete(ip);
  const token = sign({ exp: Date.now() + SESSION_HOURS * 3600 * 1000 }, cfg.sessionSecret);
  res.setHeader('Set-Cookie', `${COOKIE}=${token}; ${cookieOptions(SESSION_HOURS * 3600)}`);
  return res.json({ ok: true });
}

function logout(req, res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; ${cookieOptions(0)}`);
  res.json({ ok: true });
}

async function requireAdmin(req, res, next) {
  const cfg = await getConfig();
  if (!cfg) return res.status(503).json({ error: 'El panel de administración no está configurado.' });
  const session = verifyToken(readCookie(req, COOKIE), cfg.sessionSecret);
  if (!session) return res.status(401).json({ error: 'Sesión expirada. Vuelve a ingresar.' });
  return next();
}

module.exports = { login, logout, requireAdmin };
