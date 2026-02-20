import React, { useEffect, useState } from 'react'
import Menu from '../../components/Menu'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getmemberprjs } from '../../features/ProjectSlice'

const Userhome = () => {
  const {user}=useSelector(s=>s.auth)
  const {memberprjs}=useSelector(s=>s.prj)
  const dispatch = useDispatch()
  const [menu,setMenu]=useState(false)
  useEffect(()=>{
    dispatch(getmemberprjs({orgId:user.organizationId._id,userId:user.id}))
  },[])
  return (
    
    <div className=' overflow-y-auto min-h-[calc(100vh-160px)] flex '>
      {/* sidebar */}
      <div className={ ` lg:flex hidden bg-gray-300 transition-all duration-500 ease-in-out ${menu?'flex-3  rounded-tr-md  ':'flex-1  rounded-tr-[40px]'}`}>
        <Menu setMenu={setMenu} menu={menu} />
      </div>
      {/* section */}
      <div className=' flex-5 md:flex-15  flex flex-col'>
        {/* header */}
        <div className='flex items-center p-4 h-20 justify-between border-b-4 m-3'> 
            <Link className='text-2xl font-bold'>{user.organizationId.name}</Link>
          <div>
          <h1 className=' text-2xl '>{user.name}</h1>
          </div>
        </div>
        {/* cards */}
        <div className='h-full '>
          <div className='grid grid-cols-1 gap-4 m-6   md:grid-cols-2 lg:grid-cols-4 '>
           {
            memberprjs?.map(x=>{
              return <div
                  
                  key={x._id} className=" hover:scale-104  duration-300 shadow-black hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] p-4 rounded-xl backdrop-blur-xl shadow-sm bg-white">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs uppercase font-bold text-green-600">Active</span>
                  </div>
                  <h3 className="text-xl font-semibold">{x.name}</h3>
                  <p className="text-gray-600 text-sm my-2">{x.description || "No description provided."}</p>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center text-xs">
                    <span>By: {x.createdBy.name || ''}</span>
                    <button className="text-blue-600 font-medium" onClick={() => { navigate(`/project/${prj._id}`) }}>View →</button>
                  </div>
                </div>
            })
            
           }
          </div>
        </div>

      </div>
    </div>
  )
}

export default Userhome






