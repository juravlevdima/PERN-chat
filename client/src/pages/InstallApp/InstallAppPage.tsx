import { FC, useEffect } from 'react'

const InstallAppPage: FC = () => {
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setTimeout(() => {
        e.prompt()
      }, 500)
    })
  }, [])

  return <></>
}

export default InstallAppPage
