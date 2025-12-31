/** @type {import('tailwindcss').Config} */
module.exports = {
  // Ci-dessous, on configure les chemins à surveiller
  content: [
    "./**/*.{php,js}",  // Cherche dans TOUS les sous-dossiers les fichiers .php et .js
    "!./node_modules/**" // (Sécurité) Exclut explicitement le dossier node_modules
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

