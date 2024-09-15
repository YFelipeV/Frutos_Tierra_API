import Joi from 'joi';

// Esquema de Joi para validar los datos de Fincas
export const fincaSchema = Joi.object({
  nombre: Joi.string()
    .required()
    .messages({
      'string.empty': 'El nombre es obligatorio.',
      'any.required': 'El nombre es obligatorio.'
    }),
  direccion: Joi.string()
    .required()
    .messages({
      'string.empty': 'La dirección es obligatoria.',
      'any.required': 'La dirección es obligatoria.'
    }),
  departamento: Joi.string()
    .required()
    .messages({
      'string.empty': 'El departamento es obligatorio.',
      'any.required': 'El departamento es obligatorio.'
    }),
  ciudad: Joi.string()
    .required()
    .messages({
      'string.empty': 'La ciudad es obligatoria.',
      'any.required': 'La ciudad es obligatoria.'
    }),
  cantidad: Joi.string()
    .required()
    .messages({
      'string.empty': 'La cantidad es obligatoria.',
      'any.required': 'La cantidad es obligatoria.'
    }),
  usuarioId: Joi.string()
    .required()
    .messages({
      'string.empty': 'El  usuario es obligatorio.',
      'any.required': 'El  usuario es obligatorio.'
    })
});
