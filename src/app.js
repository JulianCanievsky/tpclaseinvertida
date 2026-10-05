const express = require('express');
const app = express();
app.use(express.json());

let tareas = [{ id: 1, titulo: 'Aprender CI/CD', hecha: false }];

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.get('/tareas', (req, res) => res.json(tareas));

app.post('/tareas', (req, res) => {
  const { titulo } = req.body || {};
  if (!titulo || typeof titulo !== 'string') {
    return res.status(400).json({ error: 'El campo "titulo" es obligatorio' });
  }
  const nueva = { id: tareas.length + 1, titulo, hecha: false };
  tareas.push(nueva);
  res.status(201).json(nueva);
});

app.get('/tareas/:id', (req, res) => {
  const tarea = tareas.find((t) => t.id === Number(req.params.id));
  if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(tarea);
});

module.exports = app;
