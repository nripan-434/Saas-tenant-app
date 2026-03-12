import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { inviteMember, logout } from '../features/AuthSlice'
import InvitationCard from './InvitationCard'
const Navbar = () => {
  const  {user}=useSelector(x=>x.auth)
  const dispatch=useDispatch()
   const [invitebox,setInvitebox] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
//  [#B6FF3B] <-green blue-> [#0C1A2B]

  return (
    <div >
      <div className='flex justify-center items-center'  >
      <div className={`  z-80 absolute text-[#B6FF3B]   inset-x-5 fixed  z-50  rounded-b-xl font-bold  top-0 ${!isScrolled?'mt-5 bg-transparent h-23':'bg-[#0C1A2B]/80 h-18 shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0,0,0,0.9)]'} backdrop-blur-sm flex justify-between items-center p-6 transition-all duration-200`}>
         {
           user?.role==='user'?<div>
                      <Link to={'/home'} className='font-(--font-comic) cursor-pointer'>Home</Link> 


        </div>:user?.role==='admin'?<div>
                      <Link to={'/adminhome'} className='font-(--font-comic) cursor-pointer'>Home</Link> 


        </div>:
                      <Link to={'/'} className='font-(--font-comic) cursor-pointer'>Home</Link> 


       
        }
        <div>
        </div>
      {
        user?.role==='user'?<div>
            <Link onClick={()=>{dispatch(logout())}}>logout</Link>

        </div> :user?.role==='admin'?<div className='flex gap-3'>

          <Link  to={'/members'}>Members</Link>

       
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

