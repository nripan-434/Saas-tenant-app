import React, { useState } from 'react'
import Loading from './Loading'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { addaitask } from '../features/TaskSlice'
const Aitasks = ({aitasks,status,projectId}) => {
  const dispatch = useDispatch()
  const [open,setOpen]=useState(false)
 
  return (

    <div>
        {
            status==='pending'?
            <Loading/>
            :
            <div>
              {aitasks? <p className='font-bold '>Ai generated Tasks:</p>:''}
              <div className="flex mt-3 gap-3 custom-scrollbar transition-all duration-300 overflow-x-auto pb-3">
              
                {aitasks?.map(task => (
                  <div key={task._id} className="flex flex-col gap-2 overflow-x-auto  justify-between min-w-80 items-center p-3 border hover:bg-[#B6FF3B] bg-[#B6FF3B]/90 text-[#0C1A2B] rounded-xl ">
                    <span className="text-[18px] underline font-bold"><span className='font-bold'></span>Task: {task.title}</span>
                    <span className="text-[16px]"><span className='font-bold underline'>Description:</span> {task.description}</span>
                    <span className="text-[16px]"><span className='font-bold underline'>Priority:</span> {task.priority}</span>
                    <button className='bg-[#0C1A2B] rounded-xl p-1 w-full text-[#B6FF3B]' onClick={()=>{setOpen(!open)}}>add to task</button>
                    {
          open?<div onClick={()=>{setOpen(false)}} className='fixed inset-0 z-10 bg-black/30 backdrop-blur-sm flex justify-center items-center'>
           <motion.form 
           onSubmit={()=>{
            dispatch(addaitask({task,projectId,deadline}))
           }}
            initial={{ y: 30 }}
                    animate={{ y: 0 }}

                    transition={{ duration: 0.4 }}
           action="" className='flex justify-center flex-col gap-3 bg-[#0C1A2B] px-25 py-9 rounded-xl' onClick={(e)=>{e.stopPropagation()}}>
            <div>
              <span>Deadline:  </span>
            <input className='bg-[#B6FF3B]/90 rounded-sm px-3 text-black'  min={new Date().toISOString().split("T")[0]} type='date' />

            </div>
            <button className='hover:bg-[#B6FF3B] bg-[#B6FF3B]/80 transition-all duration-300 text-[#0C1A2B] rounded-sm active:scale-95'>Add to Tasklist</button>
           </motion.form>
        </div>:''
        }
                  </div>
                ))}
              </div>
            </div>
            
        }
        
        
         
      
    </div>
  )
}

export default Aitasks
