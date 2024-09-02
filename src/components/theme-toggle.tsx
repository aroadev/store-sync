'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun02Icon, Moon02Icon } from 'hugeicons-react'
import { Button } from '@nextui-org/react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const handleToggle = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <Button isIconOnly size="sm" onClick={handleToggle} variant="light">
      <Moon02Icon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Sun02Icon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
