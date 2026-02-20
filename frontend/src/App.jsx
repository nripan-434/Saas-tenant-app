import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Userhome from './pages/user/Userhome'
import ProtectedRoutes from './components/ProtectedRoutes'
import Orgadmin from './pages/admin/Orgadmin'
import AddProject from './pages/admin/AddProject'
import Eachproject from './pages/admin/Eachproject'
import MemberRegister from './pages/user/MemberRegister'
import Members from './pages/admin/Members'
import Memberprj from './pages/user/Memberprj'
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
        <Route path='/memberprj/:id' element={<ProtectedRoutes role='user'><Memberprj/></ProtectedRoutes>}/>
        <Route path='/adminhome' element={<ProtectedRoutes role='admin'><Orgadmin/></ProtectedRoutes>}/>
        <Route path='/addproject' element={<ProtectedRoutes role='admin'><AddProject/></ProtectedRoutes>}/>
        <Route path='/project/:id' element={<ProtectedRoutes role='admin'><Eachproject/></ProtectedRoutes>}/>
        <Route path='/acceptinvite' element={<MemberRegister/>}/>
        <Route path='/members' element={<Members/>}/>

      </Routes>
      </div>
      
      <Footer/>
    </div>
  )
}

export default App
