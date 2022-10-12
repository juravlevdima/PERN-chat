import { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Main from './pages/Main/Main'
import SignIn from './pages/Auth/SignIn'
import PrivateRoute from './components/common/PrivateRoute'
import OnlyAnonymousRoute from './components/common/OnlyAnonymousRoute'
import SignUp from './pages/Auth/SignUp'
import UserOptions from './pages/UserOptions/UserOptions'

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/chat" element={<PrivateRoute><Main/></PrivateRoute>}/>
      <Route path="/options" element={<PrivateRoute><UserOptions/></PrivateRoute>}/>
      <Route path="/sign-in" element={<OnlyAnonymousRoute><SignIn/></OnlyAnonymousRoute>}/>
      <Route path="/sign-up" element={<OnlyAnonymousRoute><SignUp/></OnlyAnonymousRoute>}/>
      <Route path="*" element={<Navigate to="/chat" replace/>}/>
    </Routes>
  )
}

export default AppRoutes
