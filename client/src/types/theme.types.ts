export type ThemeT = 'light' | 'dark'

export interface IThemeContext {
  toggleTheme: (theme: ThemeT) => void
  theme: ThemeT
}
