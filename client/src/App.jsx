import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'
import Search from './pages/Search'

function App() {
  return (
   <BrowserRouter>
   <ScrollToTop></ScrollToTop>
  <Header/>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
            <Route path='/about' element={<About></About>}/>
            <Route path='/signin' element={<Signin></Signin>}/>
                <Route path='/signup' element={<Signup></Signup>}/>
                <Route path='/search' element={<Search></Search>}/>

               <Route element={<PrivateRoute></PrivateRoute>} >
                     <Route path='/dashboard' element={<Dashboard></Dashboard>}/>
               </Route>
               <Route element={<OnlyAdminPrivateRoute></OnlyAdminPrivateRoute>} >
                     <Route path='/create-post' element={<CreatePost></CreatePost>}/>
                     <Route path='/update-post/:postId' element={<UpdatePost></UpdatePost>}/>
               </Route>
              <Route path='/project' element={<Project></Project>}/>
              <Route path='/post/:postSlug' element={<PostPage></PostPage>}/>
              
 
        </Routes>
        <Footer/>
   
   
   </BrowserRouter>
  )
}

export default App
