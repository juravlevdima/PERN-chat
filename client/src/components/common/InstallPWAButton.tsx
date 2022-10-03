import { FC, useEffect, useState, MouseEvent } from 'react'
import { BeforeInstallPromptEvent } from '../../types/events.types'
import installIcon from '../../images/icons/install.svg'

const InstallPwaButton: FC = () => {
  const [supportsPWA, setSupportsPWA] = useState(false)
  const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      setSupportsPWA(true)
      setPromptInstall(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
  }, [])

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!promptInstall) {
      return
    }
    promptInstall?.prompt()
  }

  if (!supportsPWA) {
    return null
  }

  return (
    <button
      className="w-6 mr-3"
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
    >
      <img src={installIcon} alt="Install"/>
    </button>
  )
}

export default InstallPwaButton
