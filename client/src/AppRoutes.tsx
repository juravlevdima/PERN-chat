import { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Main from './pages/Main/Main'

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  )
}

export default AppRoutes
