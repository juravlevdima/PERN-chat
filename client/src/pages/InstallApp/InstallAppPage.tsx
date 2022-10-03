import { FC, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const InstallAppPage: FC = () => {
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e?.prompt()
    })
  }, [])

  return <Navigate to="/" />
}

export default InstallAppPage
