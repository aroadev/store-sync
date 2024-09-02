'use client'
import Link from 'next/link'
import ThemeToggle from './theme-toggle'
import { Archive02Icon } from 'hugeicons-react'

export default function Navigation() {
  return (
    <div className="sticky top-0 z-50 bg-neutral-100/30 backdrop-blur-md dark:bg-black/30">
      <nav className="mx-auto flex h-16 max-w-screen-xl items-center justify-between">
        <Link href="#" className="flex items-center">
          <Archive02Icon className="text-primary mr-2 h-8 w-8" />
          <h2 className="text-lg font-bold">Inventario</h2>
        </Link>
        <ThemeToggle />
      </nav>
    </div>
  )
}
