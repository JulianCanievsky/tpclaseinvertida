// "Build" simple: copia src/ a dist/ (genera el artefacto que se despliega)
const fs = require('fs');
fs.rmSync('dist', { recursive: true, force: true });
fs.cpSync('src', 'dist', { recursive: true });
console.log('Build OK: artefacto generado en dist/');
