import React from 'react'
import Loading from './Loading'
import { useDispatch } from 'react-redux'
import { addaitask } from '../features/TaskSlice'
const Aitasks = ({aitasks,status,projectId}) => {
  const dispatch = useDispatch()
  return (

    <div>
        {
            status==='pending'?
            <Loading/>
            :
            <div className="flex m-4 gap-3 custom-scrollbar transition-all duration-300 overflow-x-auto p-1">
                {aitasks?.map(task => (
                  <div key={task.id} className="flex flex-col gap-2 overflow-x-auto  justify-between min-w-80 items-center p-3 border rounded hover:bg-gray-50">
                    <span className="text-[18px] underline font-bold"><span className='font-bold'></span>Task: {task.title}</span>
                    <span className="text-[16px]"><span className='font-bold underline'>Description:</span> {task.description}</span>
                    <span className="text-[16px]"><span className='font-bold underline'>Priority:</span> {task.priority}</span>
                    <button className='bg-[#0C1A2B] rounded-xl p-1 w-full text-[#B6FF3B]' onClick={()=>{dispatch(addaitask({task,projectId}))}}>add to task</button>
                  </div>
                ))}
              </div>
        }
         
      
    </div>
  )
}

export default Aitasks
