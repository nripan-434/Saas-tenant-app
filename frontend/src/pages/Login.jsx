import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/AuthSlice'
import peopimg from '../assets/images/peop.png'
import { motion } from 'framer-motion';
import { useEffect } from 'react'

const Login = () => {
    const {user} = useSelector(state => state.auth)
    const [isFloating, setIsFloating] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    useEffect(()=>{
          if (user&& user.role==='user') {
            navigate('/home')
        }
        else if (user&& user.role==='admin') {
            navigate('/adminhome')
        }
        
    },[user, navigate])
    const handleinput = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        console.log(form)
    }
    const handlesubmit = async (e) => {
        e.preventDefault()
        const res = await dispatch(login(form))
      
       

    }
    return (
        <div className='overflow-hidden min-h-[calc(100vh-113px)]  flex flex-col lg:flex-row  '>
            {/* dynamic div */}
            <div className='flex-3 z-10 relative  flex justify-end flex-col items-center border-b-9 lg:border-b-0 lg:border-r-9 border-[#0C1A2B]'>
                {/* text */}
                <motion.p
                    initial={{  x: 100 }}
                    animate={{  x: 0 }}

                    transition={{ duration: 0.6 }}
                    className='absolute text-[#0C1A2B] lg:right-1 lg:top-15 top-9 sm:top-20 -z-10 font-[impact] text-8xl sm:text-9xl p-2 ' >SIGN IN</motion.p>
                {/* image */}
                <motion.img
                    src={peopimg}
                    className="relative"
                    initial={{ y: 100 }}
                    animate={isFloating ? { y: [0, 10, 0] } : { y: 0 }
                    }
                    transition={isFloating ? { repeat: Infinity, duration: 3, ease: "easeInOut" } : { duration: 0.8, ease: "easeOut" }
                    }
                    onAnimationComplete={() => setIsFloating(true)}
                />
                {/* backgrounddiv */}
                <motion.div
                    initial={{   y: 50 }}
                    animate={{  y: 0 }}
                    transition={{ duration: 0.3 }}
                    className='bg-[#B6FF3B]  absolute h-full w-full rounded-t-full lg:rounded-none lg:rounded-tl-[860px]  -z-20  '>


                </motion.div>
                {/* element */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0], rotate: [0, 2, 0] }}
                    transition={{ opacity: 1, repeat: Infinity, duration: 2.8 }}
                    className='text-[#B6FF3B]  lg:top-10 lg:left-22 shadow-[0_0_10px_rgba(0,0,0,1)] flex items-center justify-center top-10 left-8 -z-20 h-6  w-6 md:h-30 md:w-30 border lg:border-80 border-45    bg-transparent absolute bottom-4 rounded-xl  '>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0  }}
                    animate={{ opacity: 1, y: [0, 10, 0] ,rotate: [0, 6, 0] }}
                    transition={{ opacity: 1, repeat: Infinity, duration: 3.8 }}
                    className=' text-[#B6FF3B]   lg:top-45 lg:left-16 shadow-[0_0_10px_rgba(0,0,0,1)] top-3 left-5  -z-10  h-10 w-10 md:h-14 md:w-14 md:top-0 border lg:border-30 border-10   bg-transparent absolute bottom-4 rounded-xl'>
                            

                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0],  rotate: [0, 2, 0] }}
                    transition={{ opacity: 1, repeat: Infinity, duration: 3.8 }}
                    className='  text-[#B6FF3B]  lg:bottom-15 lg:right-14 shadow-[0_0_10px_rgba(0,0,0,1)] bottom-10 right-8 -z-20 h-10 w-10 border lg:border-80 border-45    bg-transparent rounded-xl absolute '>


                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0],rotate: [0, 6, 0]   }}
                    transition={{ opacity: 1, repeat: Infinity, duration: 3.8 }}
                    className='  text-[#B6FF3B]  lg:bottom-10 lg:right-6 shadow-[0_0_10px_rgba(0,0,0,1)] bottom-4 right-5  -z-10  h-10 w-10 border md:h-14 md:w-14 lg:border-30 border-10 rounded-xl  bg-transparent absolute '>


                </motion.div>

            </div>
{/* signin */}
            <div className=' z-20 flex-3'>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className='flex-3 h-full p-10 pt-15 flex justify-center items-center bg-[#B6FF3B] '>   
{/* green 0C1A2B */}

                    <motion.form
                        initial={{  y: 50 }}
                        animate={{  y: 0 }}
                        transition={{ duration: 1 }}
                        action="" onSubmit={handlesubmit} className='bg-[#0C1A2B]   text-white shadow-xl p-10 w-100 rounded-md flex flex-col gap-3 items-center justify-center  '>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className='flex flex-col gap-3 items-center justify-center'>
                            <h1 className='text-xl text-[#B6FF3B]'>Sign in</h1>
                            <div

                                className='flex flex-col gap-1 w-full'>
                                <label className='text-[#B6FF3B]' htmlFor="">Email  </label>
                                <input type="text" name='email' value={form.email} onChange={handleinput} className='outline-1 rounded-md p-2 outline-[#B6FF3B]  duration-100' placeholder='you@example.com' />
                            </div>
                            <div

                                className='flex flex-col gap-1 w-full'>
                                <label className='text-[#B6FF3B]' htmlFor="">Password  </label>
                                <input

                                    type="text" name='password' value={form.password} onChange={handleinput} className='outline-1 rounded-md p-2 outline-[#B6FF3B]' placeholder='••••••••' />
                            </div>
                            <div className='mt-5 w-full'>
                                <button className='p-2 w-full rounded-md bg-[#B6FF3B] text-black shadow-md active:scale-95 duration-200'>Sign In</button>
                            </div>
                            <div>
                                <p className='text-[#B6FF3B]'>Don't have an account?<span className='underline cursor-pointer text-blue-500 hover:text-blue-700 duration-200' onClick={() => { navigate('/register') }} > Sign up</span> </p>
                            </div>
                        </motion.div>
                    </motion.form>
                </motion.div>


            </div>

        </div>
    )
}

export default Login
// #4A4A4A
// #FFFFE3
// #6D8196
// #CBCBCB