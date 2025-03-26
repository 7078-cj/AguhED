import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from './AuthContext'

function PrivateRoutes({children,...rest}) {
    
    let {user} = useContext(AuthContext)
  return (
    !user ? <Navigate to ="/"/> : children
  )
}

export default PrivateRoutes