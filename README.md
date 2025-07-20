# Ecommerce - Entrega Final (Arquitectura Profesional)

Este es un proyecto completo de ecommerce con **arquitectura profesional** que implementa patrones de diseño avanzados, sistema de roles y autorización, y lógica de negocio robusta.

## 🏗️ Arquitectura Implementada

### Patrones de Diseño
- **Patrón Repository**: Separación clara entre lógica de negocio y acceso a datos
- **Patrón DAO (Data Access Object)**: Abstracción del acceso a la base de datos
- **Patrón DTO (Data Transfer Object)**: Transferencia segura de datos sin información sensible
- **Arquitectura en Capas**: Controllers → Services → Repositories → DAOs → Models

### Características Principales
- ✅ **Sistema de Usuarios**: CRUD completo con roles (user/admin)
- ✅ **Autenticación JWT**: Login y registro seguro
- ✅ **Recuperación de Contraseña**: Sistema de email con tokens expirables
- ✅ **Autorización por Roles**: Middleware que controla acceso según permisos
- ✅ **Gestión de Productos**: CRUD con control de stock
- ✅ **Carritos de Compra**: Gestión completa por usuario
- ✅ **Sistema de Tickets**: Lógica de compra robusta con manejo de stock
- ✅ **Variables de Entorno**: Configuración segura y profesional

## 🚀 Instalación y Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Copia el archivo `env.example` a `.env` y configura:
```bash
cp env.example .env
```

Edita `.env` con tus valores:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=tu_jwt_secret_super_seguro
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_password_de_aplicacion
FRONTEND_URL=http://localhost:3000
```

### 3. Iniciar MongoDB
Asegúrate de tener MongoDB corriendo en tu máquina.

### 4. Ejecutar el servidor
```bash
npm start
# o para desarrollo
npm run dev
```

## 📋 Endpoints Disponibles

### 🔐 Autenticación y Sesiones
- `POST /api/sessions/register` — Registrar usuario (devuelve JWT)
- `POST /api/sessions/login` — Iniciar sesión (devuelve JWT)
- `GET /api/sessions/current` — Obtener usuario actual (protegido, usa DTO)
- `POST /api/sessions/forgot-password` — Solicitar recuperación de contraseña
- `POST /api/sessions/reset-password` — Restablecer contraseña con token

### 👥 Usuarios (Protegido por roles)
- `POST /api/users` — Crear usuario (solo admin)
- `GET /api/users` — Listar usuarios (solo admin)
- `GET /api/users/:id` — Obtener usuario (admin o propio usuario)
- `PUT /api/users/:id` — Actualizar usuario (admin o propio usuario)
- `DELETE /api/users/:id` — Eliminar usuario (solo admin)

### 📦 Productos
- `GET /api/products` — Listar productos (público)
- `GET /api/products/:id` — Obtener producto (público)
- `GET /api/products/category/:category` — Productos por categoría (público)
- `POST /api/products` — Crear producto (solo admin)
- `PUT /api/products/:id` — Actualizar producto (solo admin)
- `DELETE /api/products/:id` — Eliminar producto (solo admin)

### 🛒 Carritos (Requiere autenticación de usuario)
- `GET /api/carts` — Ver carrito del usuario
- `POST /api/carts/:productId` — Agregar producto al carrito
- `PUT /api/carts/:productId` — Actualizar cantidad
- `DELETE /api/carts/:productId` — Eliminar producto del carrito
- `DELETE /api/carts` — Vaciar carrito

### 🎫 Tickets (Lógica de Compra)
- `POST /api/tickets/purchase` — Procesar compra desde carrito (solo usuarios)
- `GET /api/tickets/my-tickets` — Ver tickets del usuario (solo usuarios)
- `GET /api/tickets/:id` — Obtener ticket por ID (usuario propietario o admin)
- `GET /api/tickets/code/:code` — Obtener ticket por código (usuario propietario o admin)
- `GET /api/tickets` — Listar todos los tickets (solo admin)
- `PUT /api/tickets/:id/status` — Actualizar estado del ticket (solo admin)
- `DELETE /api/tickets/:id` — Eliminar ticket (solo admin)

## 🔒 Sistema de Autorización

### Roles Implementados
- **user**: Puede gestionar su propio perfil, carrito y realizar compras
- **admin**: Acceso completo a todas las funcionalidades

### Middleware de Autorización
- `requireAdmin`: Solo administradores
- `requireUser`: Usuarios autenticados
- `requireOwnerOrAdmin`: Propietario del recurso o admin

## 📧 Sistema de Recuperación de Contraseña

1. **Solicitar recuperación**: `POST /api/sessions/forgot-password`
2. **Recibir email** con enlace de recuperación (expira en 1 hora)
3. **Restablecer contraseña**: `POST /api/sessions/reset-password`
4. **Validaciones**: No permite usar la misma contraseña anterior

## 🎫 Lógica de Compra Robusta

### Características del Sistema de Tickets
- **Verificación de Stock**: Valida disponibilidad antes de procesar
- **Compras Completas**: Todos los productos disponibles
- **Compras Incompletas**: Maneja productos sin stock suficiente
- **Actualización Automática**: Reduce stock al procesar compra
- **Vaciar Carrito**: Limpia carrito después de compra exitosa
- **Códigos Únicos**: Genera códigos únicos para cada ticket

### Estados de Ticket
- `pending`: Pendiente de procesamiento
- `completed`: Compra completada exitosamente
- `cancelled`: Compra cancelada
- `incomplete`: Compra parcial (productos sin stock)

## 🏛️ Estructura del Proyecto

```
src/
├── config/           # Configuraciones (DB, Passport, Mailer)
├── controllers/      # Controladores HTTP
├── daos/            # Data Access Objects
├── dtos/            # Data Transfer Objects
├── middlewares/     # Middlewares de autorización
├── models/          # Modelos de MongoDB
├── repositories/    # Repositories (lógica de negocio)
├── routes/          # Rutas de la API
├── services/        # Servicios de aplicación
└── app.js           # Archivo principal
```

## 🧪 Ejemplos de Uso

### 1. Registrar un usuario
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

### 2. Iniciar sesión
```bash
POST /api/sessions/login
{
  "email": "juan@ejemplo.com",
  "password": "123456"
}
```

### 3. Agregar producto al carrito
```bash
POST /api/carts/PRODUCT_ID
Authorization: Bearer <token_jwt>
{
  "quantity": 2
}
```

### 4. Procesar compra
```bash
POST /api/tickets/purchase
Authorization: Bearer <token_jwt>
```

### 5. Solicitar recuperación de contraseña
```bash
POST /api/sessions/forgot-password
{
  "email": "juan@ejemplo.com"
}
```

## 🎯 Criterios de Evaluación Cumplidos

### ✅ Implementación de DAO y DTO
- DAOs estructurados para acceso a datos
- DTOs para transferencia segura sin información sensible
- Separación clara entre capas

### ✅ Patrón Repository y Lógica de Negocio
- Repositories que encapsulan lógica de negocio
- Operaciones eficientes y coherentes
- Manejo de errores robusto

### ✅ Middleware de Autorización
- Integración perfecta con estrategia "current"
- Control de acceso por roles
- Seguridad en endpoints

### ✅ Sistema de Recuperación de Contraseña
- Email con enlaces expirables (1 hora)
- Validación de tokens
- Prevención de reutilización de contraseñas

### ✅ Modelo de Ticket y Lógica de Compra
- Modelo Ticket completo con todos los campos necesarios
- Lógica de compra robusta que verifica stock
- Manejo de compras completas e incompletas
- Generación de tickets y actualización de stock

### ✅ Arquitectura Profesional
- Variables de entorno
- Manejo de errores global
- Estructura modular y escalable

## 🚀 Tecnologías Utilizadas

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **Passport.js** (JWT + Local)
- **bcrypt** (encriptación)
- **nodemailer** (envío de emails)
- **dotenv** (variables de entorno)

