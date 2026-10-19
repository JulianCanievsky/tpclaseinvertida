const request = require('supertest');
const app = require('../src/app');

describe('API de tareas', () => {
  test('GET /health responde 200 y status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /tareas devuelve una lista', async () => {
    const res = await request(app).get('/tareas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /tareas crea una tarea válida (201)', async () => {
    const res = await request(app).post('/tareas').send({ titulo: 'Escribir el TP' });
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe('Escribir el TP');
  });

  test('POST /tareas sin título devuelve 400', async () => {
    const res = await request(app).post('/tareas').send({});
    expect(res.statusCode).toBe(500);
  });

  test('GET /tareas/999 devuelve 404', async () => {
    const res = await request(app).get('/tareas/999');
    expect(res.statusCode).toBe(404);
  });
});
