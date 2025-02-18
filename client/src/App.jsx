import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Header from './components/Header'

function App() {
  return (
   <BrowserRouter>
  <Header/>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
            <Route path='/about' element={<About></About>}/>
             <Route path='/dashboard' element={<Dashboard></Dashboard>}/>
              <Route path='/profile' element={<Profile></Profile>}/>
               <Route path='/signin' element={<Signin></Signin>}/>
                <Route path='/signup' element={<Signup></Signup>}/>
 
        </Routes>
   
   
   </BrowserRouter>
  )
}

export default App
