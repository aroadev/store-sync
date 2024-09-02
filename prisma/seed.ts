import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

async function main() {
  const brands = await client.brands.createMany({
    data: [
      { name: 'Lenovo' },
      { name: 'H.P.' },
      { name: 'Vortex' },
      { name: 'Dell' },
      { name: 'Telmex' },
      { name: 'Genérico' },
    ],
  })

  return `Created ${brands.count} brands`
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await client.$disconnect()
  })
