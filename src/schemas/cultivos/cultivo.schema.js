import Joi from 'joi';

// Esquema de Joi para validar los datos de Cultivos
export const cultivoSchema = Joi.object({
  nombre: Joi.string()
    .required()
    .messages({
      'string.base': 'El nombre debe ser una cadena de texto.',
      'string.empty': 'El nombre es un campo obligatorio.',
      'any.required': 'El nombre es un campo obligatorio.'
    }),
  fecha_inicio: Joi.string()
    .required()
    .messages({
      'string.base': 'La fecha de inicio debe ser una cadena de texto.',
      'string.empty': 'La fecha de inicio es un campo obligatorio.',
      'any.required': 'La fecha de inicio es un campo obligatorio.'
    }),
  fecha_finalizacion: Joi.string()
    .required()
    .messages({
      'string.base': 'La fecha de finalización debe ser una cadena de texto.',
      'string.empty': 'La fecha de finalización es un campo obligatorio.',
      'any.required': 'La fecha de finalización es un campo obligatorio.'
    }),
  proyeccion: Joi.string()
    .required()
    .messages({
      'string.base': 'La proyección debe ser una cadena de texto.',
      'string.empty': 'La proyección es un campo obligatorio.',
      'any.required': 'La proyección es un campo obligatorio.'
    }),
  imagenes: Joi.optional()
    .messages({
      'string.base': 'Las imágenes deben ser una cadena de texto.',
      'any.required': 'Las imágenes son opcionales.'
    }),
  cantidad: Joi.string()
    .required()
    .messages({
      'string.base': 'La cantidad debe ser una cadena de texto.',
      'string.empty': 'La cantidad es un campo obligatorio.',
      'any.required': 'La cantidad es un campo obligatorio.'
    }),
  direccion: Joi.string()
    .required()
    .messages({
      'string.base': 'La dirección debe ser una cadena de texto.',
      'string.empty': 'La dirección es un campo obligatorio.',
      'any.required': 'La dirección es un campo obligatorio.'
    }),
  descripcion_corta: Joi.string()
    .required()
    .messages({
      'string.base': 'La descripción corta debe ser una cadena de texto.',
      'string.empty': 'La descripción corta es un campo obligatorio.',
      'any.required': 'La descripción corta es un campo obligatorio.'
    }),
  descripcion_larga: Joi.string()
    .required()
    .messages({
      'string.base': 'La descripción larga debe ser una cadena de texto.',
      'string.empty': 'La descripción larga es un campo obligatorio.',
      'any.required': 'La descripción larga es un campo obligatorio.'
    }),
  usuarioId: Joi.string()
    .required()
    .messages({
      'string.base': 'El  usuario debe ser una cadena de texto.',
      'string.empty': 'El  usuario es un campo obligatorio.',
      'any.required': 'El  usuario es un campo obligatorio.'
    }),
  finca: Joi.string()
    .required()
    .messages({
      'string.base': 'La finca es un campo obligatorio.',
      'string.empty': 'La finca es un campo obligatorio.',
      'any.required': 'La finca es un campo obligatorio.'
    })
});
