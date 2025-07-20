import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import './config/passport.js';
import usersRouter from './routes/users.js';
import sessionsRouter from './routes/sessions.js';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secretJWT',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Rutas públicas
app.use('/api/users', usersRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);

// Rutas protegidas (requieren autenticación)
app.use('/api/carts', passport.authenticate('jwt', { session: false }), cartsRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Ecommerce funcionando correctamente' });
});

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('MongoDB connection error:', err)); 