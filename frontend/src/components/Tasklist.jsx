import React from 'react'
import { useDispatch } from 'react-redux'
import { removetask } from '../features/TaskSlice'

const Tasklist = ({tasks}) => {
  const dispatch = useDispatch()
  return (
    <div>
       <div>
                    {
                      tasks.length=='0'?<div>No Tasks Added Yet!</div>:
                      <div className='flex gap-2 rounded-xl overflow-x-auto  custom-scrollbar pb-5 '>
                        {
                          tasks?.map(x=>{
                            return  <div key={x._id} className="flex flex-col gap-1 custom-scrollbar  overflow-x-auto items-start   justify-between min-w-80 max-w-100 items-center p-3 border hover:bg-[#B6FF3B] bg-[#B6FF3B]/90 text-[#0C1A2B] rounded-xl ">
                    <span className="text-[18px] underline font-bold"><span className='font-bold'></span>Task: {x.title}</span>
                    <span className="text-[16px]"><span className='font-bold'>Description:</span> {x.description}</span>
                    <span className="text-[16px]"><span className='font-bold'>Priority:</span> {x.priority}</span>
                    <span className="text-[16px]"><span className='font-bold'>Status:</span> {x.status}</span>
                    <div className='flex  justify-between w-full gap-2 font-bold'>
                    <button className='bg-red-600 p-1 rounded-sm text-white' onClick={()=>{dispatch(removetask(x._id))}}>remove</button>
                    <button className='bg-sky-800 p-1 rounded-sm text-white'>update</button>

                    <button className='bg-green-700 p-1 rounded-sm text-white'>+assign</button>
                    </div>
                    

                                  </div>
                          })
                        }
                      </div>
                    }
                  </div>
    </div>
  )
}

export default Tasklist
