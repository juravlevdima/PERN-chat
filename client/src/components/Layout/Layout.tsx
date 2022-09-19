import { FC, PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>header</header>
      <main className="flex-1 flex">
        {children}
      </main>
      <footer>footer</footer>
    </div>
  )
}

export default Layout
