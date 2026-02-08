import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { inviteMember, logout } from '../features/AuthSlice'
import InvitationCard from './InvitationCard'
const Navbar = () => {
  const  {user}=useSelector(x=>x.auth)
  const dispatch=useDispatch()
   const [invitebox,setInvitebox] = useState(false)
  
 
  return (
    <div >
      <div >
      <div className='h-20 absolute  mt-5  shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0,0,0,0.4)] inset-x-0 fixed z-50 shadow rounded-4xl   top-0 bg-transparent backdrop-blur flex justify-between items-center p-6 '>
        <div>
           <h1 className='font-(--font-comic)'></h1> Home
        </div>
      {
        user?.role==='user'?<div>
            <Link onClick={()=>{dispatch(logout())}}>logout</Link>

        </div> :user?.role==='admin'?<div className='flex gap-3'>
          <Link to={'/members'}>Members</Link>
         <Link className="  " onClick={()=>{setInvitebox(!invitebox)}}>{invitebox?'cancel':' InviteMember'}</Link>
            <Link onClick={()=>{dispatch(logout())}}>Logout</Link>
        </div>
        
         :<div className='flex gap-3'>
            <Link to={'/login'}>Sign in</Link>
            <Link to={'/register'}>Register</Link>
            
        </div>
        
      }
        
      </div>

    </div>
              <InvitationCard invitebox={invitebox} setInvitebox={setInvitebox}/>
  
    </div>
  )
}

export default Navbar

