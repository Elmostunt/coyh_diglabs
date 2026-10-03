module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Schibsted Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['Spline Sans Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        // Tokens editoriales (flip automático en dark via CSS vars)
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        paper2: 'rgb(var(--c-paper2) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        petrol: 'rgb(var(--c-petrol) / <alpha-value>)',
        laguna: 'rgb(var(--c-laguna) / <alpha-value>)',
        aqua: 'rgb(var(--c-aqua) / <alpha-value>)',
        ember: 'rgb(var(--c-ember) / <alpha-value>)',
        // Fijos (no flipan): footer y superficies siempre oscuras
        night: '#0a1923',
        bone: '#f3ecdd',
        // Paleta legada (páginas aún no rediseñadas)
        blancoHueso: "#f8fafc",
        blancoCremoso: "#f1f5f9",
        azulOscuro: "#0d3b66",
        verdeTurquesa: "#1b998b",
        azulGrisaceo: "#2d728f",
        azulProfundo: "#3a506b",
        turquesaVibrante: "#6fffe9",
      },
    },
  },
  plugins: [],
};
