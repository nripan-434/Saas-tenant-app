import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registeruser } from '../features/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import peopimg from '../assets/images/peop.png';


const Register = () => {
    const [isFloating, setIsFloating] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        orgname: '',
        name: '',
        email: '',
        password: ''
    })
    const handleinput = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }
    const handlesubmit = (e) => {
        e.preventDefault()
        dispatch(registeruser(form))

    }
    return (
        <div className='flex flex-col md:flex-row min-h-[calc(100vh-160px)] overflow-hidden  '>
            <div className='flex-3  z-10 relative  flex justify-end flex-col items-center border-b-9 lg:border-b-0 lg:border-r-9 border-[#0C1A2B]'>

                {/* text */}
                <motion.p
                    initial={{ x: 50 }}
                    animate={{ x: 0 }}

                    transition={{ duration: 0.6 }}
                    className='absolute text-[#B6FF3B] lg:right-1 lg:top-15 top-9 sm:top-20 -z-10 font-[impact] text-7xl sm:text-8xl p-2 ' >REGISTER</motion.p>
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
                <div className='relative'>

                </div>
                <div className="absolute h-full w-full rounded-t-full lg:rounded-none lg:rounded-tl-[860px] -z-20 overflow-hidden">

                    {/* actual border */}
                    <div className="absolute inset-0 
      " />

                    {/* fake shadow only on top-left */}
                    <motion.div
                     initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                     className="absolute inset-0 
    bg-[radial-gradient(circle_at_top_left,_#B6FF3B40,_transparent_60%)] 
    blur-xl opacity-100" />

                </div>

                <motion.div

                >


                </motion.div>
                {/* element */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0], rotate: [0, 2, 0] }}
                    transition={{ opacity: 1, repeat: Infinity, duration: 2.8 }}
                    className=' text-transparent  lg:top-10 lg:left-22 backdrop-blur-xl shadow-[0_0_10px_rgba(0,0,0,1)] flex items-center justify-center top-10 left-8 -z-20 h-6  w-6 md:h-30 md:w-30 border lg:border-80 border-60    bg-transparent absolute bottom-4 rounded-xl  '>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0], rotate: [0, 6, 0] }}
                    transition={{ opacity: 1, repeat: Infinity, duration: 3.8 }}
                    className='  text-transparent   lg:top-45 lg:left-16 backdrop-blur-xl shadow-[0_0_10px_rgba(0,0,0,1)] top-3 left-5  -z-10  h-10 w-10 md:h-14 md:w-14 md:top-0  lg:border-30  border-30   bg-transparent absolute bottom-4 rounded-xl'>


                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0], rotate: [0, 2, 0] }}
                    transition={{ opacity: 1, repeat: Infinity, duration: 3.8 }}
                    className='  text-transparent  lg:bottom-15 lg:right-14 backdrop-blur-xl shadow-[0_0_10px_rgba(0,0,0,1)] bottom-10 right-8 -z-20 h-10 w-10 border lg:border-80 border-55    bg-transparent rounded-xl absolute '>


                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0], rotate: [0, 6, 0] }}
                    transition={{ opacity: 1, repeat: Infinity, duration: 3.8 }}
                    className=' text-transparent lg:bottom-10 lg:right-6 backdrop-blur-xl    shadow-[0_0_10px_rgba(0,0,0,1)] bottom-4 right-5  -z-10  h-10 w-10 border md:h-14 md:w-14 lg:border-30 border-30 rounded-xl  bg-transparent absolute '>


                </motion.div>

            </div>
            {/* regform */}
            <div className="z-20 flex-3 flex relative justify-center ">

                <div className="absolute lg:hidden top-0 left-0 w-full h-[2px] 
bg-gradient-to-r from-transparent via-[#B6FF3B] to-transparent 
opacity-60 blur-[1px]" />
                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    onSubmit={handlesubmit} action="" className='flex flex-col text-[#B6FF3B] shadow-[0_0_10px_#B6FF3B]/20 bg-[#0C1A2B]  gap-1 m-6 justify-center items-center p-7 rounded-xl w-100 bg-[#0C1A2B]'>
                    <h1 className='text-xl text-[#B6FF3B]'>Organization Register</h1>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor="">Organazation Name</label>
                        <input onChange={handleinput} name='orgname' value={form.orgname} className='outline-1 rounded-md p-2 outline-[#B6FF3B]' type="text" placeholder='abc.pvt lt' />

                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor="">Name</label>
                        <input onChange={handleinput} name='name' value={form.name} className='outline-1 rounded-md p-2 outline-[#B6FF3B]' type="text" placeholder='john Doe' />

                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor="">Email</label>
                        <input onChange={handleinput} name='email' value={form.email} className='outline-1 rounded-md p-2 outline-[#B6FF3B]' type="text" placeholder='abc@gmail.com' />

                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor="">Password</label>
                        <input onChange={handleinput} name='password' value={form.password} className='outline-1 rounded-md p-2 outline-[#B6FF3B]' type="password" placeholder='••••••••' />

                    </div>
                    <div className='w-full flex  justify-center mt-4'>
                        <button className='p-2 w-full  rounded-md bg-[#B6FF3B] text-[#0C1A2B] shadow-md active:scale-95 duration-200'>Register</button>
                    </div>
                    <div>
                        <p className='text-[#B6FF3B]'>Already have an account?<span className='underline cursor-pointer text-blue-500 hover:text-blue-700 duration-200' onClick={() => { navigate('/login') }} > Sign up</span> </p>
                    </div>
                </motion.form>
            </div>

        </div>
    )
}

export default Register
