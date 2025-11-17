"use client"

import * as React from "react"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9 rounded-lg hover:bg-white/10 transition-colors"
        disabled
      >
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-105"
      aria-label={theme === "dark" ? "Přepnout na světlý režim" : "Přepnout na tmavý režim"}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-gold transition-transform duration-200 hover:rotate-12" />
      ) : (
        <Moon className="h-5 w-5 text-gold transition-transform duration-200 hover:-rotate-12" />
      )}
    </Button>
  )
}
