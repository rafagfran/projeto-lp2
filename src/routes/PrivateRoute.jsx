import React from 'react'
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  }

const PrivateRoute = ({children}) => {

    return isAuthenticated() ? children : <Navigate to='/login' />
}

export default PrivateRoute
