import express from 'express';
import { TicketController } from '../controllers/TicketController.js';
import { requireUser, requireAdmin } from '../middlewares/authorization.js';
import passport from 'passport';

const router = express.Router();
const ticketController = new TicketController();

// Todas las rutas requieren autenticación
router.use(passport.authenticate('jwt', { session: false }));

// Procesar compra desde carrito (solo usuarios)
router.post('/purchase', requireUser, ticketController.processPurchase.bind(ticketController));

// Obtener tickets del usuario (solo usuarios)
router.get('/my-tickets', requireUser, ticketController.getUserTickets.bind(ticketController));

// Obtener ticket por ID (usuario propietario o admin)
router.get('/:id', requireUser, ticketController.getTicketById.bind(ticketController));

// Obtener ticket por código (usuario propietario o admin)
router.get('/code/:code', requireUser, ticketController.getTicketByCode.bind(ticketController));

// Rutas solo para admin
router.get('/', requireAdmin, ticketController.getAllTickets.bind(ticketController));
router.put('/:id/status', requireAdmin, ticketController.updateTicketStatus.bind(ticketController));
router.delete('/:id', requireAdmin, ticketController.deleteTicket.bind(ticketController));

export default router; 