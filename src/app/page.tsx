import UploadInventory from '@/components/upload-inventory'
import DataTable from '@/components/data-table'
import Header from '@/components/header'
import { get } from '@/actions/items.actions'
import { Spinner } from '@nextui-org/react'
import Navigation from '@/components/navigation'

export default async function Page() {
  const data = await get()

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="mx-auto w-full max-w-screen-xl space-y-4 py-4">
        <Header
          title="Inventario"
          description="Revisa o agrega los productos del inventario"
          button={<UploadInventory />}
        />
        <DataTable data={data as any} />
      </div>
    </main>
  )
}
