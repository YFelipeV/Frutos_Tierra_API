import Joi from 'joi'

export const loginSchema = Joi.object({
  correo: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'El correo electrónico es obligatorio.',
      'string.email': 'Debe proporcionar un correo electrónico válido.',
      'any.required': 'El correo electrónico es obligatorio.'
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'La contraseña es obligatoria.',
      'string.min': 'La contraseña debe tener al menos 6 caracteres.',
      'any.required': 'La contraseña es obligatoria.'
    })
});