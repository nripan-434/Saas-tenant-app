import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getallprojects } from '../features/ProjectSlice'
import { Plus, Folder, LayoutDashboard, Settings, Users } from 'lucide-react';

const Orgadmin = () => {
  const dispatch =useDispatch()
  const {projects}=useSelector(state =>state.prj)
  const {user}=useSelector(state =>state.auth)
  useEffect(()=>{
      dispatch(getallprojects(user.organizationId))
  },[])
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* 1. Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-slate-800">
          AdminPanel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/" className="flex items-center gap-3 p-3 bg-indigo-600 rounded-lg">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/users" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition">
            <Users size={20} /> Team Members
          </Link>
          <Link to="/settings" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition">
            <Settings size={20} /> Settings
          </Link>
        </nav>
      </aside>

      {/* 2. Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Projects</h1>
            <p className="text-slate-500">Manage and monitor your organization projects</p>
          </div>
          <Link 
            to="/addproject" 
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg transition-all"
          >
            <Plus size={20} /> Create Project
          </Link>
        </header>

        {/* 3. Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects && projects.length > 0 ? (
            projects.map((prj) => (
              <div 
                key={prj._id} 
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group"
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
                
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                  <span>Created by: {prj.createdBy?.name || 'Admin'}</span>
                  <button className="text-indigo-600 font-semibold hover:underline">View Details →</button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-xl border-2 border-dashed border-slate-300">
               <p className="text-slate-500 text-lg">No projects found. Start by creating a new one!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Orgadmin
