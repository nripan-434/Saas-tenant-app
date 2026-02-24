import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createproject } from '../../features/ProjectSlice'
import { useState } from 'react'


const AddProject = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    name: '',
    description: '',
    organizationId: user.organizationId._id,
  })
  const handleinput = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }
  const handlesubmit = (e) => {
    e.preventDefault()
    dispatch(createproject(form))
  }
  return (
    <div>

      <div className='flex-2 p-5 bg-[#6D8196] flex justify-center items-center min-h-[calc(100vh-160px)]'>
        <form onSubmit={handlesubmit} action="" className='flex flex-col  shadow-[2px_13px_10px_3px_rgba(0,0,0,0.1)] gap-5 justify-center items-center p-7 rounded-xl w-100 bg-[#CBCBCB]'>
          <h1 className='text-xl text-slate-600'>Create Project</h1>
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="">Project Name</label>
            <input onChange={handleinput} name='name' value={form.name} className='outline-1 rounded-md p-2 hover:outline-slate-500' type="text" placeholder='E-commerce' />

          </div>
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="">Description</label>
            <input onChange={handleinput} name='description' value={form.description} className='outline-1 rounded-md p-2 hover:outline-slate-500' type="text" placeholder='purpose of the project is ....' />

          </div>
          <div className='w-full flex justify-center mt-4'>
            <button className='p-2 w-full rounded-md bg-slate-500 text-white shadow-md active:scale-95 duration-200'>Create</button>
          </div>

        </form>
      </div>


    </div>
  )
}


export default AddProject
