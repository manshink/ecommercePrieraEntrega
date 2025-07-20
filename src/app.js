import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import connectDB from './config/database.js';
import './config/passport.js';

// Importar rutas
import usersRouter from './routes/users.js';
import sessionsRouter from './routes/sessions.js';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import ticketsRouter from './routes/tickets.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de sesiones
app.use(session({
  secret: process.env.JWT_SECRET || 'secretJWT',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas públicas
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);

// Rutas protegidas (requieren autenticación)
app.use('/api/users', usersRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/tickets', ticketsRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Ecommerce con Arquitectura Profesional',
    version: '2.0.0',
    features: [
      'Patrón Repository y DAO',
      'DTOs para transferencia de datos',
      'Sistema de recuperación de contraseña',
      'Middleware de autorización por roles',
      'Arquitectura en capas',
      'Lógica de compra robusta con Tickets',
      'Control de stock y compras incompletas'
    ],
    endpoints: {
      auth: '/api/sessions',
      users: '/api/users',
      products: '/api/products',
      carts: '/api/carts',
      tickets: '/api/tickets'
    }
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Algo salió mal!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor'
  });
});

// Ruta para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Conectar a la base de datos y iniciar servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📧 Sistema de email configurado: ${process.env.EMAIL_USER ? 'Sí' : 'No'}`);
    console.log(`🔐 JWT Secret configurado: ${process.env.JWT_SECRET ? 'Sí' : 'No'}`);
    console.log(`🏗️ Arquitectura profesional implementada`);
  });
}).catch(err => {
  console.error('❌ Error al conectar con MongoDB:', err);
  process.exit(1);
}); 