"use client"

import { Button } from '@/components/ui/button'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full relative"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <FaSun className="absolute h-6 w-6 rotate-0 scale-100 transition-all ease-in-out dark:-rotate-90 dark:scale-0" />
      <FaMoon className="absolute h-6 w-6 rotate-90 scale-0 transition-all ease-in-out dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
