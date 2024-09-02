import { z } from 'zod'
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import { create, get, getById, remove, update } from '@/actions/items.actions'
import { InventorySchema } from '@/schemas/item.schema'
import { toast } from 'sonner'

export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: async () => await get(),
  })
}

export function useCreateItem() {
  const queryClient = new QueryClient()

  return useMutation({
    mutationFn: async (values: z.infer<typeof InventorySchema>) =>
      await create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
      return toast.success('¡Creado con éxito! 🎉', {
        duration: 6000,
      })
    },
  })
}

export function useUpdateItem(id: string) {
  const queryClient = new QueryClient()

  return useMutation({
    mutationFn: async (values: z.infer<typeof InventorySchema>) =>
      await update(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
      return toast.success('¡Actualizado con éxito! 🎉', {
        duration: 6000,
      })
    },
  })
}

export function useRemoveItem() {
  const queryClient = new QueryClient()

  return useMutation({
    mutationFn: async (id: string) => await remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
      return toast.success('¡Eliminado con éxito! 🎉', {
        duration: 6000,
      })
    },
  })
}

export function useItem(id: string) {
  return useQuery({
    queryKey: ['item', id],
    queryFn: async () => await getById(id),
  })
}
