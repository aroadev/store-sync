'use client'
import UploadInventory from '@/components/upload-inventory'
import DataTable from '@/components/data-table'
import Header from '@/components/header'
import { useItems } from '@/hooks/items'
import { Spinner } from '@nextui-org/react'
import Navigation from '@/components/navigation'

export default function Page() {
  const { data, isLoading } = useItems()
  console.log(data)

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="mx-auto w-full max-w-screen-xl space-y-4 py-4">
        <Header
          title="Inventario"
          description="Revisa o agrega los productos del inventario"
          button={<UploadInventory />}
        />
        {isLoading || !data ? (
          <div className="mx-auto flex items-center justify-center">
            <Spinner size="lg" color="primary" />
          </div>
        ) : (
          <DataTable data={data as any} />
        )}
      </div>
    </main>
  )
}
