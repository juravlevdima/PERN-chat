import { FC, useContext } from 'react'
import { ThemeContext } from '../Providers/ThemeProvider'
import { IThemeContext } from '../../types/theme.types'

const ThemeButton: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext) as IThemeContext

  const changeTheme = () => {
    toggleTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className="w-12 bg-gray-700 rounded-full relative outline-blue-600 select-none"
      onClick={changeTheme}
    >
      <span>🌜 🌞</span>
      <div
        className={`absolute bg-white rounded-full w-6 h-6 hover:bg-gray-400
                border-4 border-gray-700 top-0 left-0 transition duration-300
                ${theme === 'dark' && 'translate-x-full'}`}
      />
    </div>
  )
}

export default ThemeButton
