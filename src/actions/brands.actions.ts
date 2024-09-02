'use server'
import db from '@/db'
import type { brands as Brand } from '@prisma/client'

export const get = async () => {
  return await db.brands.findMany()
}
