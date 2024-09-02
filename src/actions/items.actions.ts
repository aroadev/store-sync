'use server'
import db from '@/db'
import { z } from 'zod'
import { InventorySchema } from '@/schemas/item.schema'

export const get = async () => {
  return await db.inventories.findMany({
    include: { brand: true },
  })
}

export const getById = async (id: string) => {
  return await db.inventories.findUnique({
    where: { id },
    include: { brand: true },
  })
}

export const create = async (values: z.infer<typeof InventorySchema>) => {
  const validation = InventorySchema.safeParse(values)

  if (validation.error || !validation.success)
    return { error: 'Datos no válidos' }

  const { data } = validation

  try {
    const product = await db.inventories.create({
      data: {
        name: data.name,
        brandId: data.brandId,
        state: data.state,
        quantity: Number(data.quantity),
        type: data.type,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    if (!product) return { error: 'Error al crear el producto' }

    return { message: '¡Proceso creado! 🎉' }
  } catch (error) {
    console.log(error)
    if (error instanceof Error) return { error: error.message }

    return { error: 'Error al crear el producto' }
  }
}

export const update = async (
  id: string,
  values: z.infer<typeof InventorySchema>
) => {
  const validation = InventorySchema.safeParse(values)

  if (validation.error || !validation.success)
    return { error: 'Datos no válidos' }

  const { data } = validation

  try {
    const product = await db.inventories.update({
      where: { id },
      data: {
        name: data.name,
        brandId: data.brandId,
        state: data.state,
        quantity: Number(data.quantity),
        updatedAt: new Date(),
      },
    })

    if (!product) return { error: 'Error al actualizar el producto' }

    return { message: '¡Proceso actualizado! 🎉' }
  } catch (error) {
    console.log(error)
    if (error instanceof Error) return { error: error.message }

    return { error: 'Error al actualizar el producto' }
  }
}

export const remove = async (id: string) => {
  try {
    const product = await db.inventories.delete({ where: { id } })

    if (!product) return { error: 'Error al eliminar el producto' }

    return { message: '¡Proceso eliminado! 🎉' }
  } catch (error) {
    console.log(error)
    if (error instanceof Error) return { error: error.message }

    return { error: 'Error al eliminar el producto' }
  }
}
