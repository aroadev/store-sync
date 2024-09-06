import { z } from 'zod'

export const LoginSchema = z.object({
  username: z
    .string({
      required_error: 'El nombre de usuario es requerido',
    })
    .min(4, {
      message: 'El nombre de usuario debe tener al menos 4 caracteres',
    }),
  password: z
    .string({
      required_error: 'La contraseña es requerida',
    })
    .min(8, {
      message: 'La contraseña debe tener al menos 8 caracteres',
    }),
})
