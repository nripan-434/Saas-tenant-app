import React, { useEffect, useState } from 'react'
import Menu from '../../components/Menu'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getmemberprjs } from '../../features/ProjectSlice'
import { IoIosPeople } from "react-icons/io";

const Userhome = () => {
  const { user } = useSelector(s => s.auth)
  const { memberprjs } = useSelector(s => s.prj)
  const navigate =useNavigate()
  const dispatch = useDispatch()
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    dispatch(getmemberprjs({ orgId: user.organizationId._id, userId: user.id }))
  }, [])
  return (

    <div className=' overflow-y-auto min-h-[calc(100vh-160px)] flex '>
      {/* sidebar */}
      <div className={`flex flex-col lg:flex hidden bg-gray-300 transition-all duration-500 ease-in-out ${menu ? 'flex-3  rounded-tr-md  ' : 'flex-1  rounded-tr-[40px]'}`}>
        <Menu setMenu={setMenu} menu={menu} />
        <div className='flex flex-col border-t-5 border-white  justify-center  w-full items-center mt-5 font-bold'>
          <Link className='hover:bg-white duration-200 w-full h-18 flex items-center justify-center'>
            <div className='flex items-center justify-center  gap-3'>
              <IoIosPeople className={`text-4xl ${menu?'translate-x-0':'translate-x-5'} duration-300  shrink-0`} />

              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300
      ${menu ? "opacity-100  translate-x-0" : "opacity-0  pointer-events-none -translate-x-9"}`}
              >
                Members
              </span>
            </div>
          </Link>
        </div>
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
          {
            memberprjs.length>0?
            
                      <div className='grid grid-cols-1 gap-4 m-6   md:grid-cols-2 lg:grid-cols-4 '>
            {
              memberprjs?.map(x => {
                return <div

                  key={x._id} className=" hover:scale-104  duration-300 shadow-black hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] p-4 rounded-xl backdrop-blur-xl shadow-sm bg-white">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs uppercase font-bold text-green-600">Active</span>
                  </div>
                  <h3 className="text-xl font-semibold">{x.name}</h3>
                  <p className="text-gray-600 text-sm my-2">{x.description || "No description provided."}</p>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center text-xs">
                    <span>By: {x.createdBy.name || ''}</span>
                    <button className="cursor-pointer text-blue-600 font-medium" onClick={() => { navigate(`/memberprj/${x._id}`) }}>View →</button>
                  </div>
                </div>
              })

            }
          </div>: <h1 className='flex justify-center '>Not Assigned To Any Projects Yet!</h1>
}
        </div>

      </div>
    </div>
  )
}

export default Userhome






