import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAllMembers } from '../../features/AuthSlice'
import MembersCard from '../../components/MembersCard'
import { getallprojects } from '../../features/ProjectSlice'
import { motion } from 'framer-motion'
const Orgadmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { members, user } = useSelector((state) => (state.auth))
  useEffect(() => {
    if (!user?.organizationId) return;
    dispatch(getAllMembers(user.organizationId));
  }, [dispatch, user?.organizationId]);
  const { projects, count } = useSelector(state => state.prj);

  useEffect(() => {
    dispatch(getallprojects());
  }, [dispatch]);

  return (
    <div className="flex z-10 min-h-screen bg-white text-gray-800">
      <div

        className='hidden pr-2 z-10 lg:flex lg:w-64 lg:bg-gray-600 flex-col pt-11  rounded-tr-[60px] overflow-hidden transition-all duration-300' >
        <h1 className=' pl-4 font-bold text-2xl text-white'>DASHBOARD</h1>
        <div className='pt-6 '>
          <Link to={'/members'} className='hidden rounded-r-xl lg:flex hover:bg-white p-6  hover:text-black text-white  duration-300 font-[bold] '>Members</Link>
          <Link to={'/members'} className='hidden rounded-r-xl lg:flex hover:bg-white p-6  hover:text-black text-white  duration-300 font-[bold] '>Members</Link>
        </div>




      </div>
      <main className="flex-1 p-3  ">
        <motion.header
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex rounded-bl-[90px] rounded-tr-[60px] p-10 text-white justify-between bg-gray-600 items-center mb-2  border-bottom ">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-gray-200">Manage organization projects</p>
          </div>
          <Link to="/addproject" className="bg-blue-600 text-white px-4 py-2 rounded">
            + New Project
          </Link>
        </motion.header>

        <motion.h2
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg  font-semibold mb-4">Total Projects: {count}
        </motion.h2>
        <motion.div
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className='p-7 rounded-xl bg-[#6D8196]'>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects && projects.length > 0 ? (
              projects.map((prj) => (
                <motion.div
                  
                  key={prj._id} className=" hover:scale-104  duration-300 shadow-black hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] p-4 rounded-xl backdrop-blur-xl shadow-sm bg-white">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs uppercase font-bold text-green-600">Active</span>
                  </div>
                  <h3 className="text-xl font-semibold">{prj.name}</h3>
                  <p className="text-gray-600 text-sm my-2">{prj.description || "No description provided."}</p>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center text-xs">
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
          <div className='text-white border-t-7 border-white mt-10'>
            <h1 className='m-6 font-bold text-xl'>Members:</h1>
            <MembersCard members={members} orgId={user.organizationId} />

          </div>
        </motion.div>
      </main>




    </div>
  )
}

export default Orgadmin;