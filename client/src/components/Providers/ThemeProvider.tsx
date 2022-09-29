import { FC, createContext, PropsWithChildren, useState } from 'react'
import { IThemeContext, ThemeT } from '../../types/theme.types'

const getThemeFromLS = (): ThemeT => {
  const theme = localStorage.getItem('theme')
  if (theme && (theme === 'light' || theme === 'dark')) {
    return theme
  }
  return 'light'
}

export const ThemeContext = createContext<IThemeContext | null>(null)

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeT>(getThemeFromLS)

  const toggleTheme = (theme: ThemeT): void => {
    setTheme(theme)
    localStorage.setItem('theme', theme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
