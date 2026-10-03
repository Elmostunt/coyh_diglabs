#!/usr/bin/env node
// Genera la configuración del panel /admin: { passwordHash, sessionSecret }.
//
// Uso (la contraseña se pide por stdin y no queda en el historial de la shell):
//   node scripts/admin-config.js > /tmp/admin.json
//   gcloud secrets create sdl-blog-admin --data-file=/tmp/admin.json --project=memos-tablet
//   rm /tmp/admin.json
// Para cambiar la contraseña después:
//   gcloud secrets versions add sdl-blog-admin --data-file=/tmp/admin.json --project=memos-tablet
const crypto = require('crypto');
const readline = require('readline');

function hash(password) {
  const salt = crypto.randomBytes(16);
  const derived = crypto.scryptSync(password, salt, 64);
  return `scrypt$${salt.toString('hex')}$${derived.toString('hex')}`;
}

const rl = readline.createInterface({ input: process.stdin, output: process.stderr, terminal: true });
rl.stdoutMuted = true;
rl._writeToOutput = function write(s) { if (!rl.stdoutMuted) rl.output.write(s); };

process.stderr.write('Contraseña del admin (mín. 12 caracteres): ');
rl.question('', (password) => {
  rl.close();
  process.stderr.write('\n');
  if (!password || password.length < 12) {
    process.stderr.write('La contraseña debe tener al menos 12 caracteres.\n');
    process.exit(1);
  }
  const config = { passwordHash: hash(password), sessionSecret: crypto.randomBytes(32).toString('hex') };
  process.stdout.write(JSON.stringify(config));
});
