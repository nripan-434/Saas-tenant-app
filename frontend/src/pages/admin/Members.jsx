import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMembers } from '../../features/AuthSlice'

const Members = () => {
    const dispatch=useDispatch()
    const {members,user}=useSelector((state)=>(state.auth))
    useEffect(()=>{
        dispatch(getAllMembers(user.organizationId))
    },[])
  return (

    <div className=' bg-gray-300 '>
        {
            members?.length==='0'?<div>No members</div>:
            members?.map(x=>{
                    return <div>
                <h1>name:{x.name}</h1>
                <h1>email:{x.email}</h1>
                <h1>status</h1>
                <div>
                <button>remove</button>

                </div>

            </div>
            })
           

        }
      
    </div>
  )
}

export default Members
