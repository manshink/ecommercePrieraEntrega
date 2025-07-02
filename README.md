# Proyecto Ecommerce (Entrega CRUD + Autenticación)

Este es un proyecto simple de ecommerce que hice para practicar lo que aprendí en el curso de Backend. Aquí se puede crear, ver, actualizar y borrar usuarios (CRUD), y también hay un sistema de login con autenticación usando JWT.

## ¿Qué hace este proyecto?
- Permite registrar usuarios con nombre, apellido, email, edad, contraseña, carrito y rol.
- La contraseña se guarda de forma segura (encriptada).
- Se puede iniciar sesión y obtener un token (JWT) para acceder a rutas protegidas.
- Hay una ruta especial para ver los datos del usuario que está logueado.

## ¿Cómo lo uso?

1. Instala las dependencias:
   ```
   npm install
   ```

2. Asegúrate de tener MongoDB corriendo en tu computadora (usa por defecto `mongodb://localhost:27017/ecommerce`).

3. Inicia el servidor:
   ```
   npm start
   ```

## Rutas principales

### Usuarios
- `POST /api/users` — Crear usuario
- `GET /api/users` — Ver todos los usuarios
- `GET /api/users/:id` — Ver un usuario por su ID
- `PUT /api/users/:id` — Actualizar usuario
- `DELETE /api/users/:id` — Borrar usuario

### Sesiones y autenticación
- `POST /api/sessions/login` — Iniciar sesión (devuelve un token JWT)
- `GET /api/sessions/current` — Ver los datos del usuario logueado (requiere el token JWT en el header Authorization)

## Notas para el profe
- El modelo de usuario tiene todos los campos que pidió la consigna.
- La contraseña se encripta con bcrypt.
- El login y la ruta `/current` usan JWT para autenticación.
- Intenté comentar y dejar el código lo más claro posible porque todavía estoy aprendiendo :) 