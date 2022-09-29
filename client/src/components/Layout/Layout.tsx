import { FC, PropsWithChildren } from 'react'
import Header from '../Header/Header'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark-theme dark:bg-dark-2">
      <Header/>
      <main className="flex-1 flex">
        {children}
      </main>
      {/* <footer>footer</footer> */}
    </div>
  )
}

export default Layout
