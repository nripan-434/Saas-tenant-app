import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAllMembers } from '../../features/AuthSlice'
import MembersCard from '../../components/MembersCard'
import { getallprojects } from '../../features/ProjectSlice'
import { motion } from 'framer-motion'
import ProjectEfficiencyGraph from '../../components/ProjectEfficiencyGraph'
const Orgadmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(true)
 useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  handleResize()
  window.addEventListener("resize", handleResize)
  return () => window.removeEventListener("resize", handleResize)
}, [])
  const { members, user } = useSelector((state) => (state.auth))
  useEffect(() => {
    if (!user?.organizationId) return;
    dispatch(getAllMembers(user.organizationId._id));
  }, [dispatch, user?.organizationId]);
  const { projects, count } = useSelector(state => state.prj);

  useEffect(() => {
    dispatch(getallprojects());
  }, [dispatch]);

  return (
    <div className="flex z-10 min-h-screen bg-[#0C1A2B] text-gray-800">
      {isOpen?
      <motion.div
      initial={{ x:-50,y:30, opacity: 0 }}
          animate={{ x: 0,y:0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        className='   flex w-64 bg-[#0C1A2B] flex-col pt-11 border-t-10 border-r-3 border-b-10 border-[#B6FF3B] rounded-br-[20px] rounded-tr-[30px] overflow-hidden ' >
        <h1 className=' pl-4 font-bold text-2xl text-[#B6FF3B]'>DASHBOARD</h1>
        <div className='pt-6 '>
          <Link to={'/members'} className='hidden  lg:flex hover:bg-[#B6FF3B] p-4  hover:text-black text-[#B6FF3B]  duration-300 font-[bold] '>Members</Link>
        </div>
      </motion.div>:''
}
      <main className="flex-1 p-3  ">
        <motion.div
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          
          >
  <h1 className='font-bold text-2xl flex justify-center mb-4 pt-3 pb-3 border-b-2 text-[#B6FF3B] rounded-[10px] border-t-2 border-[#B6FF3B]'>Admin DashBoard</h1>

<div className="grid grid-cols-1 md:grid-cols-5  md:grid-rows-5 md:h-screen gap-4 flex mb-10">
    <div className="rounded-md md:col-span-3   md:row-span-3  bg-[#B6FF3B] p-1 h-70 md:h-full "><ProjectEfficiencyGraph /></div>
    <div className="rounded-md md:col-span-2 md:row-span-4 md:col-start-4 bg-[#B6FF3B]">4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea repudiandae distinctio quas itaque dolorem totam iure adipisci, earum repellat quam possimus soluta incidunt doloremque, nostrum corporis dolores magnam! Quisquam, eaque.</div>
       <div className="rounded-md md:col-start-3 md:row-start-4 bg-[#0C1A2B] flex justify-center shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0.5,0.5,0,0.5)]  items-center"> <motion.h2
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg m-6   font-semibold  text-[#B6FF3B] ">Total Projects: {count}
        </motion.h2></div>
    <div className="flex rounded-xl p-5 text-white justify-between   shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0.5,0.5,0,0.5)]   items-center  rounded-md md:col-span-2 md:col-start-1 md:row-start-4"> <div>
            <h1 className="text-3xl font-bold text-[#B6FF3B] ">Projects</h1>
            <p className="text-[#B6FF3B]">Manage organization projects</p>
            
          </div>  <Link to="/addproject" className="bg-[#B6FF3B] text-[#0C1A2B] px-4 py-2 rounded">
            + New Project
          </Link></div>
    <div className="rounded-md md:col-span-5 md:col-start-1 md:row-start-5 bg-[#B6FF3B] p-2 h-45  overflow-x-auto custom-scrollbar  ">
      <div
            className="flex gap-4 min-w-max h-full border-[#B6FF3B] rounded-xl">
            {projects && projects.length > 0 ? (
              projects.map((prj) => (
                <motion.div
                  
                  key={prj._id} className="  hover:scale-104 max-w-80 min-w-70 no-scrollbar overflow-y-auto duration-300 shadow-black hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] p-4 rounded-xl backdrop-blur-xl shadow-sm bg-[#0C1A2B]">
                  <div className="flex justify-between mb-2 text-[#B6FF3B]">
                    <span className="text-xs uppercase font-bold ">Active</span>
                  </div>
                  <h3 className="text-xl text-[#B6FF3B] font-semibold">{prj.name}</h3>
                  <p className="text-[#B6FF3B] text-sm  my-2">{prj.description || "No description provided."}</p>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center text-[#B6FF3B] text-xs">
                    <span>By: {prj.createdBy.name || ''}</span>
                    <button className="text-blue-600 font-medium" onClick={() => { navigate(`/project/${prj._id}`) }}>View →</button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full border-2 border-dashed p-10 text-center text-gray-400">
                No projects found.
              </div>
            )}

            <div />

          </div>
    </div>
</div>
        </motion.div>
        {/* <motion.header
         initial={{opacity:0,y:110 }}
          animate={{opacity:1,y:0 }}
          transition={{ duration: 0.5 }}
          className="flex mt-10 rounded-xl p-10 text-white justify-between border-t-4 border-[#B6FF3B]  shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0.5,0.5,0,0.5)] border-b-4  items-center mb-2  border-bottom ">
        </motion.header> */}
        <motion.div
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className=' rounded-xl bg-[#0C1A2B] mt-20 '>

          
          <div className='text-white md:border-l-4 md:border-t-0 border-t-4 p-1 pt-4 border-[#B6FF3B] rounded-xl mt-10'>
            <h1 className=' font-bold text-xl text-[#B6FF3B]'>Members:</h1>
            <MembersCard members={members} orgId={user.organizationId} />

          </div>
        </motion.div>
      </main>




    </div>
  )
}

export default Orgadmin;