import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { authContext } from '../../Context/AuthContext'


export default function ProtectedRoutes({children}) {
    const {token} = useContext(authContext)
    const location =useLocation()
    return (
        <>
        {token? children : <Navigate to={'/login'} replace  state={{ from: location }}/>}
        </>
    )
}
