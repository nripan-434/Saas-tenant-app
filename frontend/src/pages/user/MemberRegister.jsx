import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { acceptinvite } from '../../features/AuthSlice'
import { useNavigate } from 'react-router-dom'
const MemberRegister = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [searchparams] =useSearchParams()
    const token = searchparams.get('token')
    const [form,setForm]=useState({
        name:'',
        password:'',
    })
    const handleinput =(e)=>{
        const {name,value}=e.target
        setForm((prev)=>({...prev,[name]:value}))
    }
    const handlesubmit =(e)=>{
        e.preventDefault()
        dispatch(acceptinvite({...form,token}))
       .then((res) => { if (res.type === acceptinvite.fulfilled.type)
         { navigate('/login'); }
         });
    }
  return (
      <div className='flex min-h-[calc(100vh-160px)] justify-center items-center '>
        <form onSubmit={handlesubmit} action="" className='rounded-xl p-6 shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0,0,0,0.4)] gap-7  h-90 w-100 flex flex-col items-center justify-center '>
        <h1 className='font-[bold] w-full text-3xl hover:underline duration-300'>Member Registration</h1>

            <div className='flex flex-col w-full '>
              <label className='font-[bold] text-[22px] ' >Member Name:</label>
            <input type="text" onChange={handleinput} name='name' value={form.name} className='outline-0 font-[bold] text-[20px]'   placeholder='John doe' />
            </div>
            <div className='flex flex-col w-full '>
              <label className='font-[bold] text-[22px]' >Member Password:</label>
            <input type="text" onChange={handleinput} name='password' value={form.password} className='outline-0 font-[bold] text-[20px]  '  placeholder='••••••••' />
            </div>
            <div className='w-full'>
                <button className='p-2 bg-gray-500 w-full rounded-full'>register</button>
            </div>
        </form>
      </div>
  )
}

export default MemberRegister
