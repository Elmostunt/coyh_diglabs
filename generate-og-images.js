const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Asegurar que la carpeta public existe
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Definición de imágenes OG
const images = [
  {
    filename: 'og-home.jpg',
    title: 'Sur Digital Labs',
    subtitle: 'Software • Datos • Cloud',
    color1: '#6c63ff',
    color2: '#00d4aa',
  },
  {
    filename: 'og-software.jpg',
    title: 'Desarrollo Web',
    subtitle: 'Apps a medida para tu empresa',
    color1: '#2563eb',
    color2: '#06b6d4',
  },
  {
    filename: 'og-datos.jpg',
    title: 'Ingeniería de Datos',
    subtitle: 'Pipelines, BI y análisis avanzado',
    color1: '#06b6d4',
    color2: '#10b981',
  },
  {
    filename: 'og-nosotros.jpg',
    title: 'Sobre Nosotros',
    subtitle: '8+ años en Patagonia',
    color1: '#8b5cf6',
    color2: '#ec4899',
  },
  {
    filename: 'og-empleos.jpg',
    title: 'Trabaja con Nosotros',
    subtitle: 'Únete a nuestro equipo',
    color1: '#f59e0b',
    color2: '#ef4444',
  },
  {
    filename: 'og-contacto.jpg',
    title: 'Contáctanos',
    subtitle: 'Consulta gratis en 24h',
    color1: '#6366f1',
    color2: '#06b6d4',
  },
];

function generateOGImage(config) {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fondo con gradiente
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#0a0a0f');
  gradient.addColorStop(1, '#1a1a2e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Línea de color (arriba)
  ctx.fillStyle = config.color1;
  ctx.fillRect(0, 0, width, 8);

  // Línea de color (abajo)
  ctx.fillStyle = config.color2;
  ctx.fillRect(0, height - 8, width, 8);

  // Círculo decorativo (fondo, semi-transparente)
  ctx.fillStyle = `${config.color1}20`;
  ctx.beginPath();
  ctx.arc(width * 0.85, height * 0.3, 250, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = `${config.color2}15`;
  ctx.beginPath();
  ctx.arc(width * 0.15, height * 0.7, 200, 0, Math.PI * 2);
  ctx.fill();

  // Title (grande y bold)
  ctx.font = 'bold 80px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Dividir título si es muy largo
  const titleLines = wrapText(config.title, 30);
  const titleStartY = height / 2 - 100;
  titleLines.forEach((line, i) => {
    ctx.fillText(line, width / 2, titleStartY + i * 100);
  });

  // Subtitle (mediano, color)
  ctx.font = '40px Arial';
  ctx.fillStyle = config.color2;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(config.subtitle, width / 2, titleStartY + 120);

  // URL (abajo pequeño)
  ctx.font = '24px Arial';
  ctx.fillStyle = '#9999bb';
  ctx.textAlign = 'center';
  ctx.fillText('surdigitallabs.cl', width / 2, height - 50);

  return canvas.toBuffer('image/jpeg', { quality: 0.9 });
}

function wrapText(text, maxLength) {
  if (text.length <= maxLength) return [text];

  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    if ((currentLine + word).length > maxLength) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += (currentLine ? ' ' : '') + word;
    }
  });

  if (currentLine) lines.push(currentLine.trim());
  return lines;
}

// Generar todas las imágenes
console.log('📸 Generando imágenes OG...');
images.forEach((config) => {
  const buffer = generateOGImage(config);
  const filePath = path.join(publicDir, config.filename);
  fs.writeFileSync(filePath, buffer);
  console.log(`✅ ${config.filename} generado (1200x630px)`);
});

console.log('\n✨ ¡Todas las imágenes OG fueron generadas correctamente!');
console.log('📂 Ubicación: public/og-*.jpg');
