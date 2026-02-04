import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getallprojects } from '../features/ProjectSlice'

const Orgadmin = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const { projects, count } = useSelector(state => state.prj);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getallprojects());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
    
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8 border-bottom pb-4">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-gray-500">Manage organization projects</p>
          </div>
          <Link to="/addproject" className="bg-blue-600 text-white px-4 py-2 rounded">
            + New Project
          </Link>
        </header>

        <h2 className="text-lg font-semibold mb-4">Total Projects: {count}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects && projects.length > 0 ? (
            projects.map((prj) => (
              <div key={prj._id} className="border p-4 rounded shadow-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-xs uppercase font-bold text-green-600">Active</span>
                </div>
                <h3 className="text-xl font-semibold">{prj.name}</h3>
                <p className="text-gray-600 text-sm my-2">{prj.description || "No description provided."}</p>
                <div className="mt-4 pt-4 border-t flex justify-between items-center text-xs">
                  <span>By: {prj.createdBy?.name || ''}</span>
                  <button className="text-blue-600 font-medium" onClick={()=>{navigate(`/project/${prj._id}`)}}>View →</button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full border-2 border-dashed p-10 text-center text-gray-400">
              No projects found.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Orgadmin;