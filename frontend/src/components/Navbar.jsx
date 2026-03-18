import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { inviteMember, logout } from '../features/AuthSlice'
import InvitationCard from './InvitationCard'
import Menu from './Menu'
import logo from '../assets/images/orgsync.png'
import { motion } from 'framer-motion'
const Navbar = () => {
  const [menu, setMenu]=useState(false)
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
      <div className={`  z-80 absolute text-[#B6FF3B]   inset-x-5 fixed  z-50   rounded-b-xl font-bold  top-0 ${!isScrolled?'mt-5 bg-transparent h-23':'bg-[#0C1A2B]/80 h-18 shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0,0,0,0.9)]'} backdrop-blur-md flex justify-between items-center p-6 transition-all duration-200`}>
         {
           user?.role==='user'?<div>
                      <Link to={'/home'} className='font-(--font-comic) cursor-pointer'><img className='h-13 w-38' src={logo} alt="" /></Link> 


        </div>:user?.role==='admin'?<div>
                      <Link to={'/adminhome'} className='font-(--font-comic) cursor-pointer'><img className='h-13 w-38' src={logo} alt="" /></Link> 


        </div>:
                      <Link to={'/'} className='font-(--font-comic) cursor-pointer'><img className='h-13 w-38' src={logo} alt="" /></Link> 


       
        }
      <div className='flex md:hidden'>
        <Menu menu={menu}  setMenu={setMenu} />
      </div>
      <motion.div 
       initial={{opacity:0,x:20}}
        animate={{opacity:menu ?1:0,x:menu ?0:20}}
        transition={{duration:0.3}}
      className='absolute rounded-xl md:hidden  bg-[#0C1A2B] shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0,0,0,0.9)] p-5  top-20 right-0'>
       
           {
        user?.role==='user'?<div className='flex flex-col'>
            <Link onClick={()=>{dispatch(logout())}}>logout</Link>

        </div> :user?.role==='admin'?<div className='flex flex-col gap-3'>

          <Link  to={'/members'}>Members</Link>

       
         <Link className="  " onClick={()=>{setInvitebox(!invitebox)}}>{invitebox?'cancel':' InviteMember'}</Link>
            <Link onClick={()=>{dispatch(logout())}}>Logout</Link>
        </div>
        
         :<div className='flex flex-col gap-3 '>
            <Link to={'/login'}>Sign in</Link>
            <Link to={'/register'}>Register</Link>
            
        </div>
        
      }
        </motion.div>

     
    <div className='hidden md:flex'>
        {
        user?.role==='user'?<div>
            <Link onClick={()=>{dispatch(logout())}}>logout</Link>

        </div> :user?.role==='admin'?<div className='flex  gap-3'>

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

    </div>
              <InvitationCard invitebox={invitebox} setInvitebox={setInvitebox}/>
  
    </div>
  )
}

export default Navbar

