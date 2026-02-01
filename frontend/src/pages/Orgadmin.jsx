import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getallprojects } from '../features/ProjectSlice'

const Orgadmin = () => {
  const dispatch =useDispatch()
  const {projects}=useSelector(state =>state.prj)
  const {user}=useSelector(state =>state.auth)
  useEffect(()=>{
      dispatch(getallprojects(user.organizationId))
  },[])
  return (
    <div >
     <Link >create project</Link>
     <div>
      {
        projects?.map(x=>{
          return <div>
            <h1>x.name</h1>
          </div>
        })
      }
     </div>

    </div>
  )
}

export default Orgadmin
