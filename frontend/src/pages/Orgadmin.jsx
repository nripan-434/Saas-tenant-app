import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getallprojects } from '../features/ProjectSlice'
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Folder, LayoutDashboard, Settings, Users, Menu, X,ChevronDown } from 'lucide-react';

const Orgadmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch()
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  
  const { projects, count } = useSelector(state => state.prj)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getallprojects(user.organizationId))
  }, [])

  return (
    <div className="relative flex h-screen bg-gray-100 font-sans overflow-hidden">
      {/* 1. Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0  z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. Sidebar */}
      <aside className={`
        absolute rounded-r-4xl inset-y-0  left-0 z-20 w-64 bg-slate-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 text-2xl font-bold border-b  flex justify-between items-center">
          AdminPanel
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/adminhome" className="flex items-center gap-3 p-3 bg-indigo-600 rounded-lg">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          {/* dropdown for members */}
          <div className="space-y-1">
  <button
    onClick={(e) => {
      e.stopPropagation(); // Prevents accidental sidebar closing on mobile
      setIsTeamOpen(!isTeamOpen);
    }}
    className="flex items-center justify-between w-full gap-3 p-3 hover:bg-slate-800 rounded-lg transition-colors group"
  >
    <div className="flex items-center gap-3">
      <Users size={20} className={isTeamOpen ? "text-indigo-400" : "text-white"} />
      <span className={isTeamOpen ? "text-indigo-400" : "text-white"}>Team Members</span>
    </div>
    <motion.div
      animate={{ rotate: isTeamOpen ? 180 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <ChevronDown size={16} />
    </motion.div>
  </button>

  {/* Sub-menu items with Framer Motion */}
  <AnimatePresence>
    {isTeamOpen && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden pl-11 space-y-1"
      >
        <Link 
          to="/users" 
          onClick={() => setIsSidebarOpen(false)} // Closes sidebar on mobile after clicking
          className="block p-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
        >
          All Members
        </Link>
        <Link 
          to="/users/roles" 
          onClick={() => setIsSidebarOpen(false)}
          className="block p-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
        >
          Roles & Permissions
        </Link>
      </motion.div>
    )}
  </AnimatePresence>
</div>
          <Link to="/settings" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition">
            <Settings size={20} /> Settings
          </Link>
        </nav>
      </aside>

      {/* 3. Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full">
        {/* Mobile Header Toggle */}
        <div className="lg:hidden bg-white p-4 flex items-center border-b border-slate-200">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600">
            <Menu size={24} />
          </button>
          <span className="ml-4 font-bold text-slate-800">AdminPanel</span>
        </div>

        <div className=" p-4 sm:p-6 lg:p-8">
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4  pb-4 border-b-2 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Projects</h1>
              <p className="text-slate-500 text-sm sm:text-base">Manage and monitor your organization projects</p>
            </div>
            <Link
              to="/addproject"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3.5 rounded-full font-semibold shadow-lg transition-all w-full sm:w-auto"
            >
              <Plus size={20} /> Create Project
            </Link>
          </header>
          <h1 className='p-2 text-2xl font-bold'>Number of Projects:{count}</h1>

          {/* 4. Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects && projects.length > 0 ? (
              projects.map((prj) => (
                <div
                  key={prj._id}
                  className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                  <div className="flex items-start justify-between">
                    <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600">
                      <Folder size={24} />
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Active</span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {prj.name}
                  </h3>
                  <p className="mt-2 text-slate-600 text-sm line-clamp-2">
                    {prj.description || "No description provided for this project."}
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 text-xs text-slate-400">
                    <span>Created by: {prj.createdBy?.name || 'Admin'}</span>
                    <button className="text-indigo-600 font-semibold hover:underline">View Details →</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 sm:py-20 text-center bg-white rounded-xl border-2 border-dashed border-slate-300 mx-auto w-full">
                <p className="text-slate-500 text-lg px-4">No projects found. Start by creating a new one!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Orgadmin