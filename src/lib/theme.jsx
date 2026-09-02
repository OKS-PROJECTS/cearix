import { useCallback, useState } from 'react'
import { ThemeContext } from './theme-context'

const THEME_KEY = 'cearix-theme'
const RAIL_KEY = 'cearix-rail'

function readStored(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v == null ? fallback : v
  } catch {
    return fallback
  }
}

function persist(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* ignore */
  }
}

function applyTheme(theme) {
  const root = document.documentElement
  if (theme === 'dark') root.setAttribute('data-theme', 'dark')
  else root.removeAttribute('data-theme')
}

// Apply the stored theme synchronously on module load to avoid a flash.
const initialTheme = readStored(THEME_KEY, 'light')
applyTheme(initialTheme)

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(initialTheme)
  const [rail, setRailState] = useState(() => readStored(RAIL_KEY, '0') === '1')

  const setTheme = useCallback((next) => {
    setThemeState(next)
    applyTheme(next)
    persist(THEME_KEY, next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      applyTheme(next)
      persist(THEME_KEY, next)
      return next
    })
  }, [])

  const toggleRail = useCallback(() => {
    setRailState((prev) => {
      const next = !prev
      persist(RAIL_KEY, next ? '1' : '0')
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, rail, toggleRail }}>
      {children}
    </ThemeContext.Provider>
  )
}
