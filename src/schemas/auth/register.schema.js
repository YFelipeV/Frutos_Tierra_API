import Joi from 'joi'


export const registerSchema = Joi.object({
  nombre_completo: Joi.string()
    .required()
    .messages({
      'string.empty': 'El nombre completo es obligatorio.',
      'any.required': 'El nombre completo es obligatorio.'
    }),
  nombre_comercial: Joi.string()
    .required()
    .messages({
      'string.empty': 'El nombre comercial es obligatorio.',
      'any.required': 'El nombre comercial es obligatorio.'
    }),
  razon_social: Joi.string()
    .required()
    .messages({
      'string.empty': 'La razón social es obligatoria.',
      'any.required': 'La razón social es obligatoria.'
    }),
  identificacion: Joi.string()
    .required()
    .messages({
      'string.empty': 'La identificación es obligatoria.',
      'any.required': 'La identificación es obligatoria.'
    }),
  telefono: Joi.string()
    .min(10)
    .max(15)
    .required()
    .messages({
      'string.empty': 'El número de teléfono es obligatorio.',
      'string.min': 'El número de teléfono debe tener al menos 10 dígitos.',
      'string.max': 'El número de teléfono no debe exceder los 15 dígitos.',
      'any.required': 'El número de teléfono es obligatorio.'
    }),
  correo: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'El correo electrónico es obligatorio.',
      'string.email': 'Debe proporcionar un correo electrónico válido.',
      'any.required': 'El correo electrónico es obligatorio.'
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'La contraseña es obligatoria.',
      'any.required': 'La contraseña es obligatoria.'
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
    })
});
