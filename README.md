# api-cicd-demo

API Node.js (Express) de ejemplo para demostrar un pipeline **CI/CD con GitHub Actions**.
Trabajo Práctico de Investigación – Tema 5: CI/CD y GitHub Actions.

## Endpoints
| Método | Ruta | Descripción |
|---|---|---|
| GET | /health | Estado de la API |
| GET | /tareas | Lista de tareas |
| POST | /tareas | Crea una tarea (body: `{"titulo": "..."}`) |
| GET | /tareas/:id | Detalle (404 si no existe) |

## Uso local
```bash
npm ci
npm test        # tests con Jest + Supertest
npm run build   # genera dist/
npm start       # http://localhost:3000
```

## Pipeline (.github/workflows/ci.yml)
`push` / `pull_request` → **test** (matriz Node 22 y 24) → **build** (sube artefacto `dist`) → **deploy** (solo `push` a `main`, llama al deploy hook de Render).

## Configuración para reproducir la demo
1. Crear un repositorio en GitHub y subir este código a la rama `main`.
2. Crear un *Web Service* en Render conectado al repo (Build: `npm ci`, Start: `npm start`) y **desactivar el auto-deploy** (Auto-Deploy: Off), para que solo despliegue el pipeline.
3. Copiar el **Deploy Hook** de Render (Settings → Deploy Hook).
4. En GitHub: Settings → Secrets and variables → Actions → New secret: `RENDER_DEPLOY_HOOK` con esa URL.
5. (Opcional) Settings → Environments → `production` → agregar *Required reviewers* para exigir aprobación manual (entrega continua).
6. Settings → Branches → regla de protección de `main`: *Require status checks to pass* (jobs `Tests`).

## Demo "pipeline rojo"
Cambiar una expectativa de `tests/api.test.js` (por ejemplo `toBe(400)` por `toBe(500)`) y hacer push: el job de tests falla y **build y deploy no se ejecutan**.
