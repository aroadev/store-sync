'use client'
import { z } from 'zod'
import { useBrands } from '@/hooks/brands'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateItem } from '@/hooks/items'
import { InventorySchema } from '@/schemas/item.schema'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react'
import { CloudUploadIcon } from 'hugeicons-react'

const types = [
  { key: 'BOOK', label: 'Libro' },
  { key: 'ELECTRONIC', label: 'Electrónico' },
  { key: 'FURNITURE', label: 'Mueble' },
  { key: 'OTHER', label: 'Otros' },
]

export default function CreateItemForm({ onClose }: { onClose: () => void }) {
  const { data: brands, isLoading } = useBrands()
  const { mutate, isPending, isError } = useCreateItem()
  const form = useForm<z.infer<typeof InventorySchema>>({
    resolver: zodResolver(InventorySchema),
  })

  const onSubmit: SubmitHandler<z.infer<typeof InventorySchema>> = (data) =>
    mutate(data)

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {isError && (
        <div
          role="error"
          className="rounded border border-danger p-2.5 text-sm text-danger-foreground"
        >
          Ocurrió un error al crear el artículo
        </div>
      )}
      <ModalBody>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Input
              isRequired
              label="Nombre del Artículo"
              variant="bordered"
              placeholder="Ingrese un nombre..."
              errorMessage={fieldState.error?.message}
              isInvalid={!!fieldState.error}
              {...field}
            />
          )}
        />
        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Select
              items={types}
              isRequired
              variant="bordered"
              label="Tipo de Artículo"
              placeholder="Seleccione el tipo..."
              isDisabled={isPending}
              errorMessage={fieldState.error?.message}
              isInvalid={!!fieldState.error}
              {...field}
            >
              {(type) => (
                <SelectItem key={type.key} value={type.key}>
                  {type.label}
                </SelectItem>
              )}
            </Select>
          )}
        />
        <Controller
          name="brandId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Select
              isRequired
              variant="bordered"
              items={brands || []}
              label="Marca del Artículo"
              placeholder="Seleccione una marca..."
              isDisabled={isPending}
              isLoading={isLoading}
              errorMessage={fieldState.error?.message}
              isInvalid={!!fieldState.error}
              {...field}
            >
              {(brand) => (
                <SelectItem key={brand.id} value={brand.id}>
                  {brand.name}
                </SelectItem>
              )}
            </Select>
          )}
        />
        <Controller
          name="state"
          control={form.control}
          render={({ field, fieldState }) => (
            <Select
              isRequired
              variant="bordered"
              label="Estado del Artículo"
              placeholder="Seleccione un estado..."
              isDisabled={isPending}
              errorMessage={fieldState.error?.message}
              isInvalid={!!fieldState.error}
              {...field}
            >
              <SelectItem key="NEW">Nuevo</SelectItem>
              <SelectItem key="LIKENEW">Semi-Nuevo</SelectItem>
              <SelectItem key="USED">Usado</SelectItem>
              <SelectItem key="DAMAGED">Dañado</SelectItem>
            </Select>
          )}
        />
        <Controller
          name="quantity"
          control={form.control}
          render={({ field, fieldState }) => (
            // @ts-ignore
            <Input
              isRequired
              label="Cantidad"
              variant="bordered"
              type="number"
              placeholder="Ingrese una cantidad..."
              errorMessage={fieldState.error?.message}
              isInvalid={!!fieldState.error}
              {...field}
            />
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            // @ts-ignore
            <Textarea
              label="Descripción"
              variant="bordered"
              placeholder="Ingrese una descriptión..."
              errorMessage={fieldState.error?.message}
              isInvalid={!!fieldState.error}
              {...field}
            />
          )}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant="flat" color="danger" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          type="submit"
          isLoading={isPending}
          color="primary"
          startContent={<CloudUploadIcon className="h-5 w-5" />}
        >
          Crear Artículo
        </Button>
      </ModalFooter>
    </form>
  )
}
