import React, { useEffect, useState } from 'react'
import Menu from '../../components/Menu'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getmemberprjs } from '../../features/ProjectSlice'
import { IoIosPeople } from "react-icons/io";
import Loading from "../../components/Loading"
import { getAllMembers } from '../../features/AuthSlice'

const Userhome = () => {
  const { user } = useSelector(s => s.auth)
  const { memberprjs, status } = useSelector(s => s.prj)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState('')
  const filteredProjects = memberprjs?.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  useEffect(() => {
    dispatch(getmemberprjs({ orgId: user.organizationId._id, userId: user.id }))
  }, [])
  return (

    <div className=' overflow-y-auto text-white    min-h-[calc(100vh-160px)] flex '>
      {/* sidebar */}

      <div className={`flex flex-col pt-4 lg:flex hidden  shadow-[inset_0_2px_4px_0_rgb(0,0,0,1.2),_0_6px_8px_5px_rgb(0,0,0,1.9)] bg-[#0C1A2B] transition-all duration-500 ease-in-out ${menu ? 'flex-3  rounded-tr-md  ' : 'flex-1  rounded-tr-[40px]'}`}>
        <div className='ml-2'>
          <Menu setMenu={setMenu} menu={menu} />
        </div>
        <div className='flex flex-col   justify-center  w-full items-center mt-5 font-bold'>
          <Link className='hover:bg-[#B6FF3B] duration-200 w-full h-15 flex items-center justify-center'>
            <div className='flex  text-[#B6FF3B] hover:text-[#0C1A2B] items-center justify-center  gap-3'>
              <IoIosPeople className={`text-4xl ${menu ? 'translate-x-0' : 'translate-x-5'} duration-300  shrink-0`} />

              <span onClick={()=>{
                navigate('/members')
                }}
                className={` overflow-hidden transition-all duration-300
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
        <div className='flex items-center p-4 h-20 justify-between shadow-[0_0_20px_rgba(0,0,0,0.7)] rounded-xl m-3'>




          <Link className='text-xl md:text-2xl text-[#B6FF3B]'>Organization : <span className='font-medium'>{user.organizationId.name}</span></Link>
          <div className='m-3'>
            <h1 className='text-xl md:text-xl '><span className='bg-[#B6FF3B] rounded-full h-10 w-10 flex justify-center items-center text-[#0C1A2B] '>{user.name.charAt(0)}</span></h1>
          </div>
        </div>

        {/* Search */}
        <div className='m-4 flex gap-3'>
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#0C1A2B] shadow-[0_0_20px_rgba(0,0,0,1.3)] px-4 py-2 rounded-lg outline-none w-full md:w-80"
          />
          <button onClick={() => { setSearch('') }} className='bg-red-700 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,2.3)] px-5  rounded-xl'>clear</button>

        </div>

        {
          search == '' ? '' :

            filteredProjects.length != 0 ?
              <div className='border-b-2  '>
                <div className='ml-10  font-light'>Results on : <span className='underline font-medium text-[#B6FF3B]'> {search}</span></div>

                <div className='grid grid-cols-1 gap-4 m-6   md:grid-cols-2 lg:grid-cols-4 '>
                  {
                    filteredProjects?.map(x => {
                      return <div

                        key={x._id} className=" hover:scale-104  duration-300 shadow-black hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] p-4 rounded-xl backdrop-blur-xl  bg-[#0C1A2B]">
                        <div className="flex justify-between mb-2">
                          <span className="text-xs uppercase font-bold text-green-600">Active</span>
                        </div>
                        <h3 className="text-md  font-semibold">{x.name}</h3>
                        <p className="text-gray-300 text-sm my-2 h-15 custom-scrollbar overflow-y-auto">{x.description || "No description provided."}</p>
                        <div className="mt-4 pt-4 border-t flex justify-between items-center text-xs">
                          <span>By: {x.createdBy.name || ''}</span>
                          <button className="cursor-pointer text-blue-600 font-medium" onClick={() => { navigate(`/memberprj/${x._id}`) }}>View →</button>
                        </div>
                      </div>
                    })

                  }
                </div>
              </div>
              : <div className='ml-10 font-bold '>No results found on :<span className='underline font-medium text-[#B6FF3B]'> {search}</span>!</div>
        }

        <div className="px-6 mt-4 flex flex-col md:flex-row gap-3 justify-between">




        </div>
        {/* cards */}
        {
          status === 'pending' ?
            <span className='text-[#B6FF3B]'><Loading /></span> :
            
            <div className='h-full '>
              {
                memberprjs.length > 0 ?

                  <div className='grid grid-cols-1 gap-4 m-6   md:grid-cols-2 lg:grid-cols-4 '>
                    {
                      memberprjs?.map(x => {
                        return <div

                          key={x._id} className=" hover:scale-104  duration-300 shadow-black hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] p-4 rounded-xl backdrop-blur-xl shadow-sm bg-[#0C1A2B]">
                          <div className="flex justify-between mb-2">
                            <span className={`text-xs uppercase font-bold ${x.prjstatus==='completed'?'bg-[#B6FF3B] p-1  text-black rounded-sm':''}`}>{x.prjstatus}</span>
                          </div>
                          <h3 className="text-md font-semibold">{x.name}</h3>
                          <p className="text-gray-300 text-sm my-2 h-15 custom-scrollbar overflow-y-auto">{x.description || "No description provided."}</p>
                          <div className="mt-4 pt-4 border-t flex justify-between items-center text-xs">
                            <span>By: {x.createdBy.name || ''}</span>
                            <button className="cursor-pointer text-blue-600 font-medium" onClick={() => { navigate(`/memberprj/${x._id}`) }}>View →</button>
                          </div>
                        </div>
                      })

                    }
                  </div> : <h1 className='flex justify-center '>Not Assigned To Any Projects Yet!</h1>
              }
            </div>
      }

          </div>

    </div>
  )
}

export default Userhome






