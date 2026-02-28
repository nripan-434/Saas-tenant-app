import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoIosArrowBack, IoIosTime, IoIosPeople, IoIosRocket } from "react-icons/io";

const Memberprj = () => {
  const { id } = useParams(); // Get project ID from URL
  const navigate = useNavigate();
  const { memberprjs } = useSelector(s => s.prj);
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Find the specific project from the redux state
    const currentProject = memberprjs.find(p => p._id === id);
    setProject(currentProject);
  }, [id, memberprjs]);

  if (!project) return (
    <div className="h-screen flex items-center justify-center text-xl font-semibold">
      Loading Project Details...
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Back Button & Header */}
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6 group"
        >
          <IoIosArrowBack className="group-hover:-translate-x-1 duration-200" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Project Workspace
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mt-2">{project.name}</h1>
              <p className="text-gray-500 mt-2 max-w-2xl">{project.description}</p>
            </div>
            <div className="flex gap-3">
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Created By</p>
                <p className="font-medium text-gray-800">{project.createdBy?.name || 'Admin'}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                {project.createdBy?.name?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </div>

        {/* Project Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<IoIosPeople className="text-blue-500" />} label="Team Members" value={project.members?.length || 0} />
          <StatCard icon={<IoIosTime className="text-green-500" />} label="Status" value="Active" />
          <StatCard icon={<IoIosRocket className="text-purple-500" />} label="Tasks" value="12 Pending" />
        </div>

        {/* Members List Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Project Contributors</h2>
            <button className="text-blue-600 text-sm font-semibold hover:underline">Manage Team</button>
          </div>
          <div className="divide-y divide-gray-50">
            {project.members && project.members.length > 0 ? (
              project.members.map((member, index) => (
                <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                      {typeof member === 'object' ? member.name?.charAt(0) : 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{typeof member === 'object' ? member.name : 'User ID: ' + member}</p>
                      <p className="text-xs text-gray-400">Collaborator</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-400">Joined {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              ))
            ) : (
              <p className="p-10 text-center text-gray-400 italic">No other members assigned yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Stat Card Helper
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className="text-3xl p-3 bg-gray-50 rounded-2xl">{icon}</div>
    <div>
      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">{label}</p>
      <p className="text-2xl font-black text-gray-800">{value}</p>
    </div>
  </div>
);

export default Memberprj;