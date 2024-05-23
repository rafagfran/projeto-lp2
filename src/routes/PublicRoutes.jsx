import React from 'react'
import { BrowserRouter ,Routes, Route } from 'react-router-dom'
import Login from '../pages/login/Login'
import PrivateRoute from './PrivateRoute'
import AppRoutes from './AppRoutes'

const PublicRoutes = () => {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<PrivateRoute><AppRoutes/></PrivateRoute>}/>
        </Routes>
    </BrowserRouter>
    
  )
}

export default PublicRoutes