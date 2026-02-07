import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMembers } from '../../features/AuthSlice'
import MembersCard from '../../components/MembersCard'

const Members = () => {
    const dispatch=useDispatch()
    const {members,user}=useSelector((state)=>(state.auth))
    useEffect(()=>{
        dispatch(getAllMembers(user.organizationId))
    },[])
  return (
    <div className='p-3'>

      <MembersCard members={members}/>


    </div>
      
  )
}

export default Members
