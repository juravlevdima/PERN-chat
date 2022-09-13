import { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Main from './pages/Main/Main'
import SignIn from './pages/SignIn/SignIn'
import PrivateRoute from './components/common/PrivateRoute'
import OnlyAnonymousRoute from './components/common/OnlyAnonymousRoute'

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Main/></PrivateRoute>}/>
      <Route path="/sign-in" element={<OnlyAnonymousRoute><SignIn/></OnlyAnonymousRoute>}/>
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  )
}

export default AppRoutes
