import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
    // Obtener el token del encabezado de autorización
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Espera que el encabezado sea de la forma "Bearer TOKEN"
  
    if (token == null) return res.status(401).json({ message: 'No se proporcionó token' ,status:false});
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'No autorizado',status:false });
      req.user = user;
      next(); 
    });
  };