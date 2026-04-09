import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createproject } from '../../features/ProjectSlice'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const AddProject = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    name: '',
    description: '',
    deadline: '',
    startDate: '',
    organizationId: user?.organizationId?._id,
  })

  const handleinput = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlesubmit = (e) => {
  e.preventDefault()

  const today = new Date().setHours(0, 0, 0, 0)
  const start = form.startDate ? new Date(form.startDate).setHours(0, 0, 0, 0) : null
  const end = form.deadline ? new Date(form.deadline).setHours(0, 0, 0, 0) : null
  // Required fields
  if (!form.name || !form.deadline) {
    toast.error("Project name and deadline are required")
    return
  }
  // Start date validation
  if (start && start < today) {
    toast.error("Start date cannot be in the past")
    return
  }
  // Deadline validation
  if (end < today) {
    toast.error("Deadline cannot be in the past")
    return
  }
  // Logical validation
  if (start && end && end < start) {
    toast.error("Deadline must be after the start date")
    return
  }
  dispatch(createproject(form))
  // reset
  setForm({
    name: '',
    description: '',
    deadline: '',
    startDate: '',
    organizationId: user?.organizationId?._id,
  })
}


  return (
    <div className="flex-2 p-5 bg-[#0C1A2B] flex justify-center items-center min-h-[calc(100vh-160px)]">
      
      <form
        onSubmit={handlesubmit}
        className="flex flex-col text-[#B6FF3B] border-t-2 border-[#B6FF3B] m-7 shadow-[2px_3px_10px_3px_rgba(0.4,0,0,2.1)] gap-3 justify-center items-center p-7 rounded-xl w-120"
      >
        <h1 className="text-[24px] font-serif w-full border-b ">Create Project</h1>

        {/* Project Name */}
        <div className="flex flex-col gap-2 w-full">
          <label>Project Name</label>
          <input
            onChange={handleinput}
            name="name"
            value={form.name}
            className="rounded-md p-2 border"
            type="text"
            placeholder="E-commerce"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2 w-full">
          <label>Description</label>
          <textarea
            onChange={handleinput}
            name="description"
            value={form.description}
            className="rounded-md p-2 border "
            placeholder="Purpose of the project..."
          />
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-2 w-full">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
             min={new Date().toISOString().split("T")[0]}
            value={form.startDate}
            onChange={handleinput}
            className="rounded-md p-2 border "
          />
        </div>

        {/* Deadline */}
        <div className="flex flex-col gap-2 w-full">
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
             min={new Date().toISOString().split("T")[0]}
            value={form.deadline}
            onChange={handleinput}
            className="rounded-md p-2 border"
          />
        </div>

        {/* Submit */}
        <div className="w-full flex justify-center mt-4">
          <button className="p-2 w-full rounded-md bg-[#B6FF3B] text-[#0C1A2B] shadow-md active:scale-95 duration-200">
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProject
