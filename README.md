# Ecommerce - Entrega N°1

## Instalación

1. Instala las dependencias:
   ```
   npm install
   ```

2. Inicia MongoDB en tu máquina local (por defecto usa `mongodb://localhost:27017/ecommerce`).

3. Ejecuta el servidor:
   ```
   npm start
   ```

## Rutas principales

### Usuarios (CRUD)
- `POST /api/users` — Crear usuario
- `GET /api/users` — Listar usuarios
- `GET /api/users/:id` — Obtener usuario por ID
- `PUT /api/users/:id` — Actualizar usuario
- `DELETE /api/users/:id` — Eliminar usuario

### Sesiones y autenticación
- `POST /api/sessions/login` — Login (devuelve JWT)
- `GET /api/sessions/current` — Devuelve el usuario autenticado (requiere JWT en header Authorization)

## Notas
- El campo `password` se almacena encriptado usando bcrypt.
- El login y la ruta `/current` usan JWT para autenticación.
- El modelo de usuario incluye los campos requeridos por la consigna. 