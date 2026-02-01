import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Userhome from './pages/Userhome'
import ProtectedRoutes from './components/ProtectedRoutes'
import Orgadmin from './pages/Orgadmin'
import AddProject from './pages/AddProject'
const App = () => {
  return (
    <div className='flex flex-col min-h-screen '>
      <Navbar/>
      <div className='mt-28 flex-grow '>
        <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<ProtectedRoutes role='user'><Userhome/></ProtectedRoutes>}/>
        <Route path='/adminhome' element={<ProtectedRoutes role='admin'><Orgadmin/></ProtectedRoutes>}/>
        <Route path='/addproject' element={<ProtectedRoutes role='admin'><AddProject/></ProtectedRoutes>}/>
      </Routes>
      </div>
      
      <Footer/>
    </div>
  )
}

export default App
