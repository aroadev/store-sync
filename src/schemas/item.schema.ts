import { z } from 'zod'

export const InventorySchema = z.object({
  name: z
    .string({
      required_error: 'El nombre es requerido',
    })
    .min(3, {
      message: 'El nombre debe tener al menos 3 caracteres',
    }),
  brandId: z.string({
    required_error: 'La marca es requerida',
  }),
  state: z.enum(['NEW', 'LIKENEW', 'USED', 'DAMAGED'], {
    required_error: 'El estado es requerido',
  }),
  type: z.enum(['BOOK', 'ELECTRONIC', 'FURNITURE', 'CLOTHING', 'OTHER'], {
    required_error: 'El tipo es requerido',
  }),
  quantity: z.string({
    required_error: 'La cantidad es requerida',
  }),
  description: z.string().optional(),
})
