import type { inventories, brands } from '@prisma/client'

declare type Inventory = inventories & {
  brand: brands
}
