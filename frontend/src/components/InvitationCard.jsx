import React from 'react'
import { useState } from 'react'
import { inviteMember } from '../features/AuthSlice'
import { useDispatch } from 'react-redux'
import { animate, motion } from 'framer-motion'
const InvitationCard = ({ invitebox, setInvitebox }) => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        email: '',
        role: 'user'
    })
    const handleinput = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        console.log(form)
    }
    const handlesubmit = (e) => {
        e.preventDefault()
        dispatch(inviteMember(form))
        setInvitebox(false)

    }
    return (
        <div

        >
            {
                invitebox ? <div

                    className=' fixed   bg-black/40 backdrop-blur-2xl inset-0 z-999 flex justify-center items-center  ' onClick={() => { setInvitebox(false) }}>
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className='  relative h-90 w-140 rounded-xl shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0,0,0,0.4)] flex flex-col justify-center items-center' onClick={(e) => { e.stopPropagation() }}>
                        <button onClick={() => { setInvitebox(false) }} className='bg-red-600 text-white w-20 h-10  rounded-xl absolute top-6 right-5'>close</button>
                        <h1 className='mb-4 font-bold text-2xl text-gray-800 underline'>Invitation Box</h1>
                        <form action="" onSubmit={handlesubmit} className='bg-white flex flex-col h-50 w-90 justify-center p-3  rounded-xl gap-4 shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0,0,0,0.4)]'>
                           <div className='p-3 flex flex-col gap-3'>
                            <label className='font-bold text-[19px] text-gray-800 '>Email :</label>
                             <input type="text" name='email' className='outline-0 ' onChange={handleinput} value={form.email} placeholder='abc@gmail.com' />
                            <button type='submit' className='active:scale-95 duration-200 bg-gray-400 rounded-xl p-2 font-bold text-white hover:bg-green-500'>invite</button>
                           </div>
                        </form>

                    </motion.div>
                </div> : ''
            }
        </div>
    )
}

export default InvitationCard
