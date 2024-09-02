'use client'
import ReactQueryProvider from '@/providers/react-query.provider'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Toaster } from 'sonner'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <Toaster position="top-center" richColors closeButton />
        {children}
      </NextThemesProvider>
    </ReactQueryProvider>
  )
}
