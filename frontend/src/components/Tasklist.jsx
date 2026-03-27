import React from 'react'
import { useDispatch } from 'react-redux'
import { removetask, taskassign, updatetask } from '../features/TaskSlice'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Tasklist = ({ tasks, members }) => {

  const pendingtasks = tasks.filter(x => {
    return x.status == 'todo'
  })
  const inprogresstasks = tasks.filter(x => {
    return x.status == 'in-progress'
  })
  const completedtasks = tasks.filter(x => {
    return x.status == 'done'
  })
  const [taskcatogory, setTaskcatogory] = useState('alltasks')
  const [isremove, setIsremove] = useState(null)
  const [isupdate, setIsupdate] = useState(null)
  const [isassign, setIsassign] = useState(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: '',
    status: ''
  })
  useEffect(() => {
    if (isupdate) {
      setForm({
        title: isupdate.title || '',
        description: isupdate.description || '',
        priority: isupdate.priority || '',
        status: isupdate.status || ''
      })
    }
  }, [isupdate])
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    console.log(form)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
    dispatch(updatetask({ task: form, taskId: isupdate?._id }))
    setIsupdate(null)
    setForm({
      title: isupdate.title || '',
      description: isupdate.description || '',
      priority: isupdate.priority || '',
      status: isupdate.status || ''
    })
  }
  const dispatch = useDispatch()
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex gap-3'>
        <button onClick={() => { setTaskcatogory('alltasks') }} className={`${taskcatogory == 'alltasks' ? 'bg-white text-black' : 'text-white bg-gray-500'} text-[15px]  cursor-pointer duration-300 active:scale-95  rounded-sm px-2 text-medium`}>all tasks</button>
        <button onClick={() => { setTaskcatogory('completed') }} className={`${taskcatogory == 'completed' ? 'bg-white  text-black' : 'text-white bg-gray-500'} text-[15px]  cursor-pointer duration-300 active:scale-95  rounded-sm px-2 text-medium`}>completed tasks</button>
        <button onClick={() => { setTaskcatogory('pending') }} className={`${taskcatogory == 'pending' ? 'bg-white  text-black' : 'text-white bg-gray-500'} text-[15px]  cursor-pointer  duration-300 active:scale-95  rounded-sm px-2 text-medium`}>pending tasks</button>
        <button onClick={() => { setTaskcatogory('in-progress') }} className={`${taskcatogory == 'in-progress' ? 'bg-white  text-black' : 'text-white bg-gray-500'} text-[15px]  cursor-pointer  duration-300 active:scale-95  rounded-sm px-2 text-medium`}>in-progress </button>

      </div>
      <div className={`${taskcatogory == 'alltasks' ? 'block' : 'hidden'} flex flex-col md:flex-row gap-4`}>
        {
          tasks.length == '0' ? <div className='flex justify-center items-center w-full border py-2 rounded-sm border-gray-500'>No Tasks!</div> :
            <div className='flex gap-2 rounded-xl overflow-x-auto  custom-scrollbar pb-5 '>
              {
                tasks?.map(x => {
                  return <div key={x._id} className={`flex flex-col gap-1 custom-scrollbar  overflow-x-auto items-start ${x.status != 'done' ? 'text-[#B6FF3B]  shadow-[inset_5px_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0,0,0,0.9)]' : 'bg-[#B6FF3B]'}  justify-between min-w-80 max-w-100  p-3  /90 text-[#0C1A2B] rounded-xl `}>
                    <span className="text-[18px] underline font-bold"><span className='font-bold'></span>Task: {x.title}</span>
                    <span className="text-[16px]"><span className='font-bold'>Description:</span> {x.description}</span>
                    <span className="text-[16px]"><span className='font-bold'>Priority:</span> {x.priority}</span>
                    <span className="text-[16px]"><span className='font-bold'>Status:</span> {x.status}</span>
                    <div className='flex  justify-between w-full gap-2 font-bold'>
                      <button className='shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] p-1 bg-red-600  font-light rounded-sm text-white' onClick={() => { setIsremove(x._id) }}>remove</button>
                      {
                        isremove == x._id ? <div onClick={() => { setIsremove(null) }} className=' text-[#B6FF3B]  inset-0 z-100 fixed flex justify-center items-center  min-h-screen bg-black/50 backdrop-blur-md'>
                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => { e.stopPropagation() }}
                            className='flex relative  flex-col items-center justify-center shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] rounded-xl p-10 bg-[#0C1A2B] gap-3'>
                            <h1>Do you want to remove the task permenantly?</h1>
                            <div className='flex gap-3'>
                              <button className='absolute top-2 right-2 border   rounded-full w-6 h-6 flex justify-center items-center    p-1' onClick={() => { setIsremove(null) }}>X</button>
                              <button className='bg-red-500 rounded-xl text-white p-1' onClick={() => { dispatch(removetask(x._id)) }}>Remove</button>
                              <button className='bg-sky-500 rounded-xl text-white p-1' onClick={() => { setIsremove(null) }}>Cancel</button>
                            </div>
                          </motion.div>
                        </div> : ''
                      }

                      <button className={`${x.status == 'done' ? 'hidden' : ''} shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] bg-[#0C1A2B]/90 p-1 font-light rounded-sm text-white`} onClick={() => { setIsupdate(x) }}>update</button>
                      {
                        isupdate == x ? <div onClick={() => { setIsupdate({}) }} className='fixed backdrop-blur-md flex justify-center items-center inset-0 bg-black/50'>

                          <motion.form action=""
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 90 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            onClick={(e) => { e.stopPropagation() }}
                            className='z-109 relative text-[#B6FF3B] w-120 mt-15 flex flex-col gap-4 bg-[#0C1A2B] p-9 rounded-xl '>
                            <div className='flex gap-2 flex-col'>
                              <label className='' htmlFor="">Task : </label>
                              <input onChange={handleChange} name='title' type="text" className='outline-1 outline-white focus:outline-3 focus:outline-[#B6FF3B]  rounded-md p-2' value={form.title} />

                            </div>
                            <div className='flex gap-2 flex-col'>
                              <label className='' htmlFor="">Description : </label>
                              <textarea onChange={handleChange} name='description' className='min-h-[70px] outline-1 outline-white  focus:outline-3 focus:outline-[#B6FF3B]  rounded-md p-2' type="text" value={form.description} />

                            </div>
                            <div className='flex gap-2 flex-col'>
                              <label htmlFor="">Priority :{form.priority}</label>
                              <select onChange={handleChange} name='priority' value={form.priority} className=' outline-1 outline-white focus:outline-3 bg-[#0C1A2B]   focus:outline-[#B6FF3B]  rounded-md p-2' id="">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </select>

                            </div>
                            <div className='flex flex-col gap-2 w-full'>
                              <label>Deadline :</label>
                              <input
                                type="date"
                                name="deadline"
                                value={form.startDate}
                                onChange={handleChange}
                                className='rounded-md border border-white p-2'
                              />
                            </div>


                            {/* <div className='flex gap-2 flex-col'>
                                <label className='' htmlFor="">Status : </label>
                              <input type="text" onChange={handleChange} name='status' className='outline-1 outline-white focus:outline-3  focus:outline-[#B6FF3B]  rounded-md p-2' value={form.status} />

                              </div> */}

                            <div className='flex gap-6 justify-center '>
                              <button className='absolute top-3 right-3  border rounded-full w-6 h-6 flex justify-center items-center    p-1' onClick={() => { setIsupdate(null) }}>X</button>
                              <button className='bg-green-500 rounded-xl text-white p-1 cursor-pointer active:scale-95' onClick={() => { dispatch() }}>Update</button>
                              <button className='bg-red-500 rounded-xl text-white p-1 cursor-pointer active:scale-95' onClick={() => { setIsupdate(null) }}>Cancel</button>
                            </div>
                          </motion.form>
                        </div> : ''
                      }
                      {
                        x.assignedTo ?
                          <button className={`font-medium  ${x.status == 'done' ? 'text-[#0C1A2B]' : 'text-[#B6FF3B]'} p-1 text-sm rounded-sm `} >Assigned to {x.assignedTo.name}</button>
                          :
                          <button className=' font-light shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] bg-[#0C1A2B] p-1 rounded-sm text-white' onClick={() => { setIsassign(x._id) }}>+assign</button>


                      }
                      {
                        isassign ? <div onClick={() => { setIsassign(null) }} className='fixed flex justify-center items-center inset-0 bg-black/10 backdrop-blur-md '>

                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}

                            onClick={(e) => e.stopPropagation()} className='bg-[#0C1A2B] p-7 max-w-180 overflow-x-auto custom-scrollbar shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)]  flex flex-col  gap-5 rounded-xl text-[#B6FF3B]'>
                            <h1>Available Members :</h1>
                            <div className='flex   gap-6'>
                              {
                                members.length == 0 ? <div className='text-sm font-light flex justify-center items-center '>No members</div> :
                                  members?.map(x => {
                                    return <div key={x._id} className={`flex flex-col gap-1 custom-scrollbar  overflow-x-auto items-center ${x.status != 'done' ? 'text-[#B6FF3B]  shadow-[inset_5px_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0,0,0,0.9)]' : 'bg-[#B6FF3B]'}  justify-between min-w-80 max-w-100  p-3  /90 text-[#0C1A2B] rounded-xl `}>

                                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#B6FF3B] text-[#0C1A2B] font-bold text-xl ">
                                        {x.name.charAt(0)}
                                      </div>

                                      <div className="text-center">
                                        <h1 className="text-[#B6FF3B] font-semibold mb-4 w-32">{x.name}</h1>
                                      </div>

                                      <button className="w-full py-2 bg-[#0C1A2B] text-[#0C1A2B] active:scale-95 rounded-xl text-sm font-light bg-[#B6FF3B]  "
                                        onClick={() => { dispatch(taskassign({ taskId: isassign, memberId: x._id })) }}
                                      >
                                        Assign
                                      </button>
                                      <button className="w-full mt-2 py-2 bg-[#0C1A2B] text-[#0C1A2B] active:scale-95 rounded-xl text-sm font-medium bg-[#B6FF3B]  ">
                                        Tasks assigned
                                      </button>
                                    </div>
                                  })
                              }
                            </div>
                          </motion.div>


                        </div> : ''
                      }
                    </div>


                  </div>
                })
              }
            </div>
        }
      </div>
      <div className={`${taskcatogory == 'in-progress' ? 'block' : 'hidden'} flex flex-col md:flex-row gap-4`}>
        {
          inprogresstasks.length == '0' ? <div className='flex justify-center items-center w-full border py-2 rounded-sm border-gray-500'>No Tasks!</div> :
            <div className='flex gap-2 rounded-xl overflow-x-auto  custom-scrollbar pb-5 '>
              {
                inprogresstasks?.map(x => {
                  return <div key={x._id} className={`flex flex-col gap-1 custom-scrollbar  overflow-x-auto items-start ${x.status != 'done' ? 'text-[#B6FF3B]  shadow-[inset_5px_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0,0,0,0.9)]' : 'bg-[#B6FF3B]'}  justify-between min-w-80 max-w-100  p-3  /90 text-[#0C1A2B] rounded-xl `}>
                    <span className="text-[18px] underline font-bold"><span className='font-bold'></span>Task: {x.title}</span>
                    <span className="text-[16px]"><span className='font-bold'>Description:</span> {x.description}</span>
                    <span className="text-[16px]"><span className='font-bold'>Priority:</span> {x.priority}</span>
                    <span className="text-[16px]"><span className='font-bold'>Status:</span> {x.status}</span>
                    <div className='flex  justify-between w-full gap-2 font-bold'>
                      <button className='shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] p-1 bg-red-600  font-light rounded-sm text-white' onClick={() => { setIsremove(x._id) }}>remove</button>
                      {
                        isremove == x._id ? <div onClick={() => { setIsremove(null) }} className=' text-[#B6FF3B]  inset-0 z-999 fixed flex justify-center items-center  min-h-screen bg-black/50 backdrop-blur-md'>
                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => { e.stopPropagation() }}
                            className='flex relative  flex-col items-center justify-center shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] rounded-xl p-10 bg-[#0C1A2B] gap-3'>
                            <h1>Do you want to remove the task permenantly?</h1>
                            <div className='flex gap-3'>
                              <button className='absolute top-2 right-2 border   rounded-full w-6 h-6 flex justify-center items-center    p-1' onClick={() => { setIsremove(null) }}>X</button>
                              <button className='bg-red-500 rounded-xl text-white p-1' onClick={() => { dispatch(removetask(x._id)) }}>Remove</button>
                              <button className='bg-sky-500 rounded-xl text-white p-1' onClick={() => { setIsremove(null) }}>Cancel</button>
                            </div>
                          </motion.div>
                        </div> : ''
                      }

                      <button className={`${x.status == 'done' ? 'hidden' : ''} shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] bg-[#0C1A2B]/90 p-1 font-light rounded-sm text-white`} onClick={() => { setIsupdate(x) }}>update</button>
                      {
                        isupdate == x ? <div onClick={() => { setIsupdate({}) }} className='fixed backdrop-blur-md flex justify-center items-center inset-0 bg-black/50'>

                          <motion.form action=""
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 90 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            onClick={(e) => { e.stopPropagation() }}
                            className='z-999 relative text-[#B6FF3B] w-120 mt-15 flex flex-col gap-4 bg-[#0C1A2B] p-9 rounded-xl '>
                            <div className='flex gap-2 flex-col'>
                              <label className='' htmlFor="">Task : </label>
                              <input onChange={handleChange} name='title' type="text" className='outline-1 outline-white focus:outline-3 focus:outline-[#B6FF3B]  rounded-md p-2' value={form.title} />

                            </div>
                            <div className='flex gap-2 flex-col'>
                              <label className='' htmlFor="">Description : </label>
                              <textarea onChange={handleChange} name='description' className='min-h-[70px] outline-1 outline-white  focus:outline-3 focus:outline-[#B6FF3B]  rounded-md p-2' type="text" value={form.description} />

                            </div>
                            <div className='flex gap-2 flex-col'>
                              <label htmlFor="">Priority :{form.priority}</label>
                              <select onChange={handleChange} name='priority' value={form.priority} className=' outline-1 outline-white focus:outline-3 bg-[#0C1A2B]   focus:outline-[#B6FF3B]  rounded-md p-2' id="">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </select>

                            </div>
                            {/* <div className='flex gap-2 flex-col'>
                                <label className='' htmlFor="">Status : </label>
                              <input type="text" onChange={handleChange} name='status' className='outline-1 outline-white focus:outline-3  focus:outline-[#B6FF3B]  rounded-md p-2' value={form.status} />

                              </div> */}

                            <div className='flex gap-6 justify-center '>
                              <button className='absolute top-3 right-3  border rounded-full w-6 h-6 flex justify-center items-center    p-1' onClick={() => { setIsupdate(null) }}>X</button>
                              <button className='bg-green-500 rounded-xl text-white p-1 cursor-pointer active:scale-95' onClick={() => { dispatch() }}>Update</button>
                              <button className='bg-red-500 rounded-xl text-white p-1 cursor-pointer active:scale-95' onClick={() => { setIsupdate(null) }}>Cancel</button>
                            </div>
                          </motion.form>
                        </div> : ''
                      }
                      {
                        x.assignedTo ?
                          <button className={`font-medium  ${x.status == 'done' ? 'text-[#0C1A2B]' : 'text-[#B6FF3B]'} p-1 text-sm rounded-sm `} >Assigned to {x.assignedTo.name}</button>
                          :
                          <button className=' font-light shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] bg-[#0C1A2B] p-1 rounded-sm text-white' onClick={() => { setIsassign(x._id) }}>+assign</button>


                      }
                      {
                        isassign ? <div onClick={() => { setIsassign(null) }} className='fixed flex justify-center items-center inset-0 bg-black/10 backdrop-blur-md '>

                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}

                            onClick={(e) => e.stopPropagation()} className='bg-[#0C1A2B] p-7 max-w-180 overflow-x-auto custom-scrollbar shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)]  flex flex-col  gap-5 rounded-xl text-[#B6FF3B]'>
                            <h1>Available Members :</h1>
                            <div className='flex gap-6'>
                              {
                                members ?
                                  members?.map(x => {
                                    return <div key={x._id} className={`flex flex-col gap-1 custom-scrollbar  overflow-x-auto items-start ${x.status != 'done' ? 'text-[#B6FF3B]  shadow-[inset_5px_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0,0,0,0.9)]' : 'bg-[#B6FF3B]'}  justify-between min-w-80 max-w-100  p-3  /90 text-[#0C1A2B] rounded-xl `}>

                                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#B6FF3B] text-[#0C1A2B] font-bold text-xl ">
                                        {x.name.charAt(0)}
                                      </div>

                                      <div className="text-center">
                                        <h1 className="text-[#B6FF3B] font-semibold mb-4 w-32">{x.name}</h1>
                                      </div>

                                      <button className="w-full py-2 bg-[#0C1A2B] text-[#0C1A2B] active:scale-95 rounded-xl text-sm font-light bg-[#B6FF3B]  "
                                        onClick={() => { dispatch(taskassign({ taskId: isassign, memberId: x._id })) }}
                                      >
                                        Assign
                                      </button>
                                      <button className="w-full mt-2 py-2 bg-[#0C1A2B] text-[#0C1A2B] active:scale-95 rounded-xl text-sm font-medium bg-[#B6FF3B]  ">
                                        Tasks assigned
                                      </button>
                                    </div>
                                  }) : 'No members'
                              }
                            </div>
                          </motion.div>


                        </div> : ''
                      }
                    </div>


                  </div>
                })
              }
            </div>
        }
      </div>
      <div className={`${taskcatogory == 'pending' ? 'block' : 'hidden'} flex flex-col md:flex-row gap-4`}>
        {
          pendingtasks.length == 0 ? <div className='flex justify-center items-center w-full border py-2 rounded-sm border-gray-500'>No Tasks!</div> :
            <div className='flex gap-2 rounded-xl overflow-x-auto  custom-scrollbar pb-5 '>
              {
                pendingtasks?.map(x => {
                  return <div key={x._id} className={`flex flex-col gap-1 custom-scrollbar  overflow-x-auto items-start ${x.status != 'done' ? 'text-[#B6FF3B]  shadow-[inset_5px_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0,0,0,0.9)]' : 'bg-[#B6FF3B]'}  justify-between min-w-80 max-w-100  p-3  /90 text-[#0C1A2B] rounded-xl `}>
                    <span className="text-[18px] underline font-bold"><span className='font-bold'></span>Task: {x.title}</span>
                    <span className="text-[16px]"><span className='font-bold'>Description:</span> {x.description}</span>
                    <span className="text-[16px]"><span className='font-bold'>Priority:</span> {x.priority}</span>
                    <span className="text-[16px]"><span className='font-bold'>Status:</span> {x.status}</span>
                    <div className='flex  justify-between w-full gap-2 font-bold'>
                      <button className='shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] p-1 bg-red-600  font-light rounded-sm text-white' onClick={() => { setIsremove(x._id) }}>remove</button>
                      {
                        isremove == x._id ? <div onClick={() => { setIsremove(null) }} className=' text-[#B6FF3B]  inset-0 z-999 fixed flex justify-center items-center  min-h-screen bg-black/50 backdrop-blur-md'>
                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => { e.stopPropagation() }}
                            className='flex relative  flex-col items-center justify-center shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] rounded-xl p-10 bg-[#0C1A2B] gap-3'>
                            <h1>Do you want to remove the task permenantly?</h1>
                            <div className='flex gap-3'>
                              <button className='absolute top-2 right-2 border   rounded-full w-6 h-6 flex justify-center items-center    p-1' onClick={() => { setIsremove(null) }}>X</button>
                              <button className='bg-red-500 rounded-xl text-white p-1' onClick={() => { dispatch(removetask(x._id)) }}>Remove</button>
                              <button className='bg-sky-500 rounded-xl text-white p-1' onClick={() => { setIsremove(null) }}>Cancel</button>
                            </div>
                          </motion.div>
                        </div> : ''
                      }

                      <button className={`${x.status == 'done' ? 'hidden' : ''} shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] bg-[#0C1A2B]/90 p-1 font-light rounded-sm text-white`} onClick={() => { setIsupdate(x) }}>update</button>
                      {
                        isupdate == x ? <div onClick={() => { setIsupdate({}) }} className='fixed backdrop-blur-md flex justify-center items-center inset-0 bg-black/50'>

                          <motion.form action=""
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 90 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            onClick={(e) => { e.stopPropagation() }}
                            className='z-999 relative text-[#B6FF3B] w-120 mt-15 flex flex-col gap-4 bg-[#0C1A2B] p-9 rounded-xl '>
                            <div className='flex gap-2 flex-col'>
                              <label className='' htmlFor="">Task : </label>
                              <input onChange={handleChange} name='title' type="text" className='outline-1 outline-white focus:outline-3 focus:outline-[#B6FF3B]  rounded-md p-2' value={form.title} />

                            </div>
                            <div className='flex gap-2 flex-col'>
                              <label className='' htmlFor="">Description : </label>
                              <textarea onChange={handleChange} name='description' className='min-h-[70px] outline-1 outline-white  focus:outline-3 focus:outline-[#B6FF3B]  rounded-md p-2' type="text" value={form.description} />

                            </div>
                            <div className='flex gap-2 flex-col'>
                              <label htmlFor="">Priority :{form.priority}</label>
                              <select onChange={handleChange} name='priority' value={form.priority} className=' outline-1 outline-white focus:outline-3 bg-[#0C1A2B]   focus:outline-[#B6FF3B]  rounded-md p-2' id="">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </select>

                            </div>
                            {/* <div className='flex gap-2 flex-col'>
                                <label className='' htmlFor="">Status : </label>
                              <input type="text" onChange={handleChange} name='status' className='outline-1 outline-white focus:outline-3  focus:outline-[#B6FF3B]  rounded-md p-2' value={form.status} />

                              </div> */}

                            <div className='flex gap-6 justify-center '>
                              <button className='absolute top-3 right-3  border rounded-full w-6 h-6 flex justify-center items-center    p-1' onClick={() => { setIsupdate(null) }}>X</button>
                              <button className='bg-green-500 rounded-xl text-white p-1 cursor-pointer active:scale-95' onClick={() => { dispatch() }}>Update</button>
                              <button className='bg-red-500 rounded-xl text-white p-1 cursor-pointer active:scale-95' onClick={() => { setIsupdate(null) }}>Cancel</button>
                            </div>
                          </motion.form>
                        </div> : ''
                      }
                      {
                        x.assignedTo ?
                          <button className={`font-medium  ${x.status == 'done' ? 'text-[#0C1A2B]' : 'text-[#B6FF3B]'} p-1 text-sm rounded-sm `} >Assigned to {x.assignedTo.name}</button>
                          :
                          <button className=' font-light shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] bg-[#0C1A2B] p-1 rounded-sm text-white' onClick={() => { setIsassign(x._id) }}>+assign</button>


                      }
                      {
                        isassign ? <div onClick={() => { setIsassign(null) }} className='fixed flex justify-center items-center inset-0 bg-black/10 backdrop-blur-md '>

                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}

                            onClick={(e) => e.stopPropagation()} className='bg-[#0C1A2B] p-7 max-w-180 overflow-x-auto custom-scrollbar shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)]  flex flex-col  gap-5 rounded-xl text-[#B6FF3B]'>
                            <h1>Available Members :</h1>
                            <div className='flex gap-6'>
                              {
                                members ?
                                  members?.map(x => {
                                    return <div className=" relative flex flex-col items-center justify-between   p-4  rounded-2xl shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] ">

                                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#B6FF3B] text-[#0C1A2B] font-bold text-xl ">
                                        {x.name.charAt(0)}
                                      </div>

                                      <div className="text-center">
                                        <h1 className="text-[#B6FF3B] font-semibold mb-4 w-32">{x.name}</h1>
                                      </div>

                                      <button className="w-full py-2 bg-[#0C1A2B] text-[#0C1A2B] active:scale-95 rounded-xl text-sm font-light bg-[#B6FF3B]  "
                                        onClick={() => { dispatch(taskassign({ taskId: isassign, memberId: x._id })) }}
                                      >
                                        Assign
                                      </button>
                                      <button className="w-full mt-2 py-2 bg-[#0C1A2B] text-[#0C1A2B] active:scale-95 rounded-xl text-sm font-medium bg-[#B6FF3B]  ">
                                        Tasks assigned
                                      </button>
                                    </div>
                                  }) : 'No members'
                              }
                            </div>
                          </motion.div>


                        </div> : ''
                      }
                    </div>


                  </div>
                })
              }
            </div>
        }
      </div>
      <div className={`${taskcatogory == 'completed' ? 'block' : 'hidden'} flex flex-col md:flex-row gap-4`}>
        {
          completedtasks.length == '0' ? <div className='flex justify-center items-center w-full border py-2 rounded-sm border-gray-500'>No Tasks!</div> :
            <div className='flex gap-2 rounded-xl overflow-x-auto  custom-scrollbar pb-5 '>
              {
                completedtasks?.map(x => {
                  return <div key={x._id} className={`flex flex-col gap-1 custom-scrollbar  overflow-x-auto items-start ${x.status != 'done' ? 'text-[#B6FF3B]  shadow-[inset_5px_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0,0,0,0.9)]' : 'bg-[#B6FF3B]'}  justify-between min-w-80 max-w-100  p-3  /90 text-[#0C1A2B] rounded-xl `}>
                    <span className="text-[18px] underline font-bold"><span className='font-bold'></span>Task: {x.title}</span>
                    <span className="text-[16px]"><span className='font-bold'>Description:</span> {x.description}</span>
                    <span className="text-[16px]"><span className='font-bold'>Priority:</span> {x.priority}</span>
                    <span className="text-[16px]"><span className='font-bold'>Status:</span> {x.status}</span>
                    <div className='flex  justify-between w-full gap-2 font-bold'>
                      <button className='shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] p-1 bg-red-600  font-light rounded-sm text-white' onClick={() => { setIsremove(x._id) }}>remove</button>
                      {
                        isremove == x._id ? <div onClick={() => { setIsremove(null) }} className=' text-[#B6FF3B]  inset-0 z-999 fixed flex justify-center items-center  min-h-screen bg-black/50 backdrop-blur-md'>
                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => { e.stopPropagation() }}
                            className='flex relative  flex-col items-center justify-center shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] rounded-xl p-10 bg-[#0C1A2B] gap-3'>
                            <h1>Do you want to remove the task permenantly?</h1>
                            <div className='flex gap-3'>
                              <button className='absolute top-2 right-2 border   rounded-full w-6 h-6 flex justify-center items-center    p-1' onClick={() => { setIsremove(null) }}>X</button>
                              <button className='bg-red-500 rounded-xl text-white p-1' onClick={() => { dispatch(removetask(x._id)) }}>Remove</button>
                              <button className='bg-sky-500 rounded-xl text-white p-1' onClick={() => { setIsremove(null) }}>Cancel</button>
                            </div>
                          </motion.div>
                        </div> : ''
                      }

                      <button className={`${x.status == 'done' ? 'hidden' : ''} shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] bg-[#0C1A2B]/90 p-1 font-light rounded-sm text-white`} onClick={() => { setIsupdate(x) }}>update</button>
                      {
                        isupdate == x ? <div onClick={() => { setIsupdate({}) }} className='fixed backdrop-blur-md flex justify-center items-center inset-0 bg-black/50'>

                          <motion.form action=""
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 90 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            onClick={(e) => { e.stopPropagation() }}
                            className='z-999 relative text-[#B6FF3B] w-120 mt-15 flex flex-col gap-4 bg-[#0C1A2B] p-9 rounded-xl '>
                            <div className='flex gap-2 flex-col'>
                              <label className='' htmlFor="">Task : </label>
                              <input onChange={handleChange} name='title' type="text" className='outline-1 outline-white focus:outline-3 focus:outline-[#B6FF3B]  rounded-md p-2' value={form.title} />

                            </div>
                            <div className='flex gap-2 flex-col'>
                              <label className='' htmlFor="">Description : </label>
                              <textarea onChange={handleChange} name='description' className='min-h-[70px] outline-1 outline-white  focus:outline-3 focus:outline-[#B6FF3B]  rounded-md p-2' type="text" value={form.description} />

                            </div>
                            <div className='flex gap-2 flex-col'>
                              <label htmlFor="">Priority :{form.priority}</label>
                              <select onChange={handleChange} name='priority' value={form.priority} className=' outline-1 outline-white focus:outline-3 bg-[#0C1A2B]   focus:outline-[#B6FF3B]  rounded-md p-2' id="">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </select>

                            </div>
                            {/* <div className='flex gap-2 flex-col'>
                                <label className='' htmlFor="">Status : </label>
                              <input type="text" onChange={handleChange} name='status' className='outline-1 outline-white focus:outline-3  focus:outline-[#B6FF3B]  rounded-md p-2' value={form.status} />

                              </div> */}

                            <div className='flex gap-6 justify-center '>
                              <button className='absolute top-3 right-3  border rounded-full w-6 h-6 flex justify-center items-center    p-1' onClick={() => { setIsupdate(null) }}>X</button>
                              <button className='bg-green-500 rounded-xl text-white p-1 cursor-pointer active:scale-95' onClick={() => { dispatch() }}>Update</button>
                              <button className='bg-red-500 rounded-xl text-white p-1 cursor-pointer active:scale-95' onClick={() => { setIsupdate(null) }}>Cancel</button>
                            </div>
                          </motion.form>
                        </div> : ''
                      }
                      {
                        x.assignedTo ?
                          <button className={`font-medium  ${x.status == 'done' ? 'text-[#0C1A2B]' : 'text-[#B6FF3B]'} p-1 text-sm rounded-sm `} >Assigned to {x.assignedTo.name}</button>
                          :
                          <button className=' font-light shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] bg-[#0C1A2B] p-1 rounded-sm text-white' onClick={() => { setIsassign(x._id) }}>+assign</button>


                      }
                      {
                        isassign ? <div onClick={() => { setIsassign(null) }} className='fixed flex justify-center items-center inset-0 bg-black/10 backdrop-blur-md '>

                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}

                            onClick={(e) => e.stopPropagation()} className='bg-[#0C1A2B] p-7 max-w-180 overflow-x-auto custom-scrollbar shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)]  flex flex-col  gap-5 rounded-xl text-[#B6FF3B]'>
                            <h1>Available Members :</h1>
                            <div className='flex gap-6'>
                              {
                                members ?
                                  members?.map(x => {
                                    return <div className=" relative flex flex-col items-center justify-between   p-4  rounded-2xl shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0.5,0,0,2.4)] ">

                                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#B6FF3B] text-[#0C1A2B] font-bold text-xl ">
                                        {x.name.charAt(0)}
                                      </div>

                                      <div className="text-center">
                                        <h1 className="text-[#B6FF3B] font-semibold mb-4 w-32">{x.name}</h1>
                                      </div>

                                      <button className="w-full py-2 bg-[#0C1A2B] text-[#0C1A2B] active:scale-95 rounded-xl text-sm font-light bg-[#B6FF3B]  " onClick={() => { dispatch(taskassign({ taskId: isassign, memberId: x._id })) }}>
                                        Assign
                                      </button>
                                      <button className="w-full mt-2 py-2 bg-[#0C1A2B] text-[#0C1A2B] active:scale-95 rounded-xl text-sm font-medium bg-[#B6FF3B]  ">
                                        Tasks assigned
                                      </button>
                                    </div>
                                  }) : 'No members'
                              }
                            </div>
                          </motion.div>


                        </div> : ''
                      }
                    </div>


                  </div>
                })
              }
            </div>
        }
      </div>
    </div >
  )
}

export default Tasklist
