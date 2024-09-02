import { useQuery } from '@tanstack/react-query'
import { get } from '@/actions/brands.actions'
import type { brands as Brand } from '@prisma/client'

export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => await get(),
  })
}
