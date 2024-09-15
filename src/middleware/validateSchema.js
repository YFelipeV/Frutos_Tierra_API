import Joi from 'joi'


export const validateSchema = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });

      
      if (error) {
        // Si hay un error de validación, responder con un error 400 y los detalles del error
        const errorMessages = error.details.map(detail => detail.message).join(', ');

        return res.status(400).json({
          message: 'Datos no válidos',
          details: errorMessages,
          status:400
        });
      }
  
      next(); // Pasar al siguiente middleware o ruta si la validación es exitosa
    };
  };