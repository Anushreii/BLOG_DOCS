import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() { 
//     const {currentUser} = useSelector((state)=> state.user);
// //   return currentUser ? <Outlet/> : <Navigate to='/signin' />
// return currentUser && Object.keys(currentUser).length > 0 ? <Outlet/> : <Navigate to='/signin' />;

    const { currentUser } = useSelector((state) => state.user);
    
    console.log("Current User in PrivateRoute:", currentUser); // Debugging
  
    if (!currentUser || Object.keys(currentUser).length === 0) {
      console.log("No user found! Redirecting to signin...");
      return <Navigate to="/signin" />;
    }
  
    return <Outlet />;
  }
  

