'use client'
import { Delete02Icon, Edit02Icon, Search01Icon } from 'hugeicons-react'
import { useMemo, useState, useCallback } from 'react'
import { Inventory } from '@/types'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Tooltip,
} from '@nextui-org/react'

const columns = [
  { key: 'name', label: 'Artículo' },
  { key: 'brandId', label: 'Marca' },
  { key: 'state', label: 'Estado' },
  { key: 'quantity', label: 'Cantidad' },
  { key: 'actions', label: 'Acciones' },
]

const Actions = ({ id }: { id: string }) => {
  return (
    <div className="flex items-center gap-x-2">
      <Tooltip color="primary" content="Editar">
        <Button color="primary" variant="light" isIconOnly size="sm">
          <Edit02Icon className="h-5 w-5" />
        </Button>
      </Tooltip>
      <Tooltip color="danger" content="Eliminar">
        <Button color="danger" variant="light" isIconOnly size="sm">
          <Delete02Icon className="h-5 w-5" />
        </Button>
      </Tooltip>
    </div>
  )
}

const stateMap: Record<string, JSX.Element> = {
  NEW: (
    <Chip size="sm" color="success">
      Nuevo
    </Chip>
  ),
  LIKENEW: (
    <Chip size="sm" color="secondary">
      Semi-Nuevo
    </Chip>
  ),
  USED: (
    <Chip size="sm" color="warning">
      Usado
    </Chip>
  ),
  DAMAGED: (
    <Chip size="sm" color="danger">
      Dañado
    </Chip>
  ),
}

const renderCell = (item: Inventory, key: React.Key) => {
  switch (key) {
    case 'name':
      return item.name
    case 'brandId':
      return item.brand.name
    case 'state':
      return stateMap[item.state]
    case 'quantity':
      return item.quantity
    case 'actions':
      return <Actions id={item.id} />
    default:
      return null
  }
}

export default function DataTable({ data }: { data: Inventory[] }) {
  /** Pagination */
  const [page, setPage] = useState(1)
  const DEFAULT_ROWS = 8

  const pages = Math.ceil(data.length / DEFAULT_ROWS)

  /** Search Section */
  const [search, setSearch] = useState('')
  const hasSearch = Boolean(search)

  const filteredData = useMemo(() => {
    let filteredData = [...data]

    if (hasSearch) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    return filteredData
  }, [data, search, hasSearch])

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setSearch(value)
      setPage(1)
    } else setSearch('')
  }, [])

  const onClear = useCallback(() => {
    setSearch('')
    setPage(1)
  }, [])

  /** Main  */
  const items = useMemo(() => {
    const start = (page - 1) * DEFAULT_ROWS
    const end = start + DEFAULT_ROWS

    return filteredData.slice(start, end)
  }, [page, filteredData, DEFAULT_ROWS])

  const topContent = useMemo(
    () => (
      <div className="flex items-end justify-between gap-3">
        <Input
          isClearable
          className="w-full max-w-[34%]"
          placeholder="Buscar por artículo..."
          radius="full"
          variant="bordered"
          startContent={<Search01Icon className="h-4 w-4" />}
          onValueChange={onSearchChange}
          value={search}
          onClear={() => onClear()}
        />
      </div>
    ),
    [onClear, onSearchChange, search]
  )

  return (
    <Table
      aria-label="Inventario"
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody emptyContent={'No hay registros'} items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
