import { FC } from 'react'
import InstallPWAButton from './InstallPWAButton'
import ThemeButton from './ThemeButton'

const Controls: FC = () => {
  return (
    <div className="absolute top-3 right-2 z-100 flex">
      <InstallPWAButton/>
      <ThemeButton/>
    </div>
  )
}

export default Controls
