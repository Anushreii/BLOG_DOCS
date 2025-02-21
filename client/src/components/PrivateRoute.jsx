import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() { 
  
    const {currentUser} = useSelector((state)=> state.user);
   return currentUser ? <Outlet/> : <Navigate to='/signin' />
   
// return currentUser && Object.keys(currentUser).length > 0 ? <Outlet/> : <Navigate to='/signin' />;
}

  

