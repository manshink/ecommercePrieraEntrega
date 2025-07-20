export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador' });
  }

  next();
};

export const requireUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  if (req.user.role !== 'user' && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado' });
  }

  next();
};

export const requireOwnerOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  const resourceUserId = req.params.userId || req.body.userId;
  
  if (req.user.role === 'admin' || req.user.id === resourceUserId) {
    return next();
  }

  return res.status(403).json({ error: 'Acceso denegado. Solo puedes acceder a tus propios recursos' });
}; 