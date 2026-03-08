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
 const dynamicColor = isScrolled ? 'text-black' : 'text-[#B6FF3B]';
//  [#B6FF3B] <-green blue-> [#0C1A2B]

  return (
    <div >
      <div className='flex justify-center items-center'  >
      <div className={`h-23  z-80 absolute  mt-5  ${dynamicColor==='text-[#B6FF3B]'?'':'shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0,0,0,0.9)]'} inset-x-5 fixed ${dynamicColor} z-50  rounded-full font-bold  top-0 ${dynamicColor==='text-[#B6FF3B]'?'bg-transparent':'bg-[#B6FF3B]/60'} backdrop-blur-sm flex justify-between items-center p-6 transition-all duration-200`}>
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

