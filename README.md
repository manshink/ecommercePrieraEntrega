# Proyecto Ecommerce (Entrega CRUD + Autenticación)

Este es un proyecto completo de ecommerce que hice para practicar lo que aprendí en el curso de Backend. Aquí se puede crear, ver, actualizar y borrar usuarios (CRUD), hay un sistema de login con autenticación usando JWT, y también incluye gestión de productos y carritos de compra.

## ¿Qué hace este proyecto?
- **Usuarios**: Permite registrar usuarios con nombre, apellido, email, edad, contraseña, carrito y rol.
- **Autenticación**: Sistema de login y registro con JWT para acceder a rutas protegidas.
- **Productos**: CRUD completo de productos para el catálogo.
- **Carritos**: Gestión de carritos de compra por usuario.
- **Seguridad**: La contraseña se guarda de forma segura (encriptada con bcrypt).

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
- `POST /api/sessions/register` — **Registrar nuevo usuario** (devuelve JWT)
- `POST /api/sessions/login` — Iniciar sesión (devuelve un token JWT)
- `GET /api/sessions/current` — Ver los datos del usuario logueado (requiere el token JWT en el header Authorization)

### Productos
- `GET /api/products` — Ver todos los productos
- `GET /api/products/:id` — Ver un producto por su ID
- `POST /api/products` — Crear producto
- `PUT /api/products/:id` — Actualizar producto
- `DELETE /api/products/:id` — Borrar producto

### Carritos (requieren autenticación)
- `GET /api/carts` — Ver el carrito del usuario logueado
- `POST /api/carts/:productId` — Agregar producto al carrito
- `PUT /api/carts/:productId` — Actualizar cantidad de un producto
- `DELETE /api/carts/:productId` — Eliminar producto del carrito
- `DELETE /api/carts` — Vaciar carrito

## Ejemplo de uso

1. **Registrar un usuario**:
   ```bash
   POST /api/sessions/register
   {
     "first_name": "Juan",
     "last_name": "Pérez",
     "email": "juan@ejemplo.com",
     "age": 25,
     "password": "123456"
   }
   ```

2. **Iniciar sesión**:
   ```bash
   POST /api/sessions/login
   {
     "email": "juan@ejemplo.com",
     "password": "123456"
   }
   ```

3. **Usar el token para acceder a rutas protegidas**:
   ```bash
   GET /api/sessions/current
   Authorization: Bearer <token_jwt>
   ```

## Notas para el profe
- ✅ El modelo de usuario tiene todos los campos que pidió la consigna
- ✅ La contraseña se encripta con bcrypt
- ✅ El login y la ruta `/current` usan JWT para autenticación
- ✅ **NUEVO**: Agregué ruta de registro (`/api/sessions/register`)
- ✅ **NUEVO**: Incluí `express-session` en las dependencias
- ✅ **NUEVO**: Integré el proyecto con modelos de Product y Cart para hacer un ecommerce completo
- ✅ Intenté comentar y dejar el código lo más claro posible porque todavía estoy aprendiendo :) 