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
    const [error, setError] = useState('');
    const validpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
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
         if (!form.name || !form.password) {
        setError("All fields are required");
        return;
    }

    if (!validpassword.test(form.password)) {
        setError(
            "Password must be at least 8 characters and include uppercase, lowercase, and a number"
        );
        return;
    }
        dispatch(acceptinvite({...form,token}))
       .then((res) => { if (res.type === acceptinvite.fulfilled.type)
         { navigate('/login'); }
         });
    }
  return (
      <div className='flex text-[#B6FF3B] min-h-[calc(100vh-160px)] justify-center items-center '>
        <form onSubmit={handlesubmit} action="" className='rounded-xl p-6 shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0,0,0,0.4)] gap-7  h-90 w-100 flex flex-col items-center justify-center '>
        <h1 className='w-full text-3xl hover:underline border-b pb-2 font-medium duration-300'>Member Registration</h1>

            <div className='flex flex-col w-full '>
              <label className=' text-[22px] ' >Member Name:</label>
            <input type="text" onChange={handleinput} name='name' value={form.name} className='outline-0 font-[bold] text-[20px]'   placeholder='John doe' />
            </div>
            <div className='flex flex-col w-full '>
              <label className=' text-[22px]' >Member Password:</label>
            <input type="password" onChange={handleinput} name='password' value={form.password} className='outline-0 font-[bold] text-[20px]  '  placeholder='••••••••' />
             {error && (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}
            </div>
            <div className='w-full'>
                <button className='p-2 bg-[#B6FF3B] text-[#0C1A2B] active:scale-95 duration-300 w-full text-xl rounded-sm'>register</button>
            </div>
        </form>
      </div>
  )
}

export default MemberRegister
