import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMembers } from '../../features/AuthSlice'
import MembersCard from '../../components/MembersCard'
import { useNavigate } from 'react-router-dom'

const Members = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {members,user}=useSelector((state)=>(state.auth))
    useEffect(()=>{
        dispatch(getAllMembers(user.organizationId._id))
    },[])
  return (
    <div className='p-3'>
       <button
        onClick={() => navigate(-1)}
        className="mb-6 ml-5 text-md font-bold text-gray-500 hover:text-blue-600"
      >
        ← Back 
      </button>

      <MembersCard members={members}/>


    </div>
      
  )
}

export default Members
