import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects } = useSelector(state => state.prj)
  
  const [showTasks, setShowTasks] = useState(false);
  const [newTask, setNewTask] = useState("");

  const project = projects?.find(p => p._id === id)

  // Mock data (replace with real project data)
  const progress = project?.progress || 20; 
  const deadline = project?.deadline || "2024-12-31";
  const members = project?.members || [
    { id: 1, name: 'John Doe', role: 'Developer' },
    { id: 2, name: 'Jane Smith', role: 'Designer' }
  ];
  const tasks = project?.tasks || [
    { id: 1, title: "Initialize Repository", status: "Completed" },
    { id: 2, title: "Design System Setup", status: "In Progress" }
  ];

  const handleAddTask = () => {
    if(!newTask.trim()) return;
    alert(`Adding task: ${newTask}`);
    setNewTask("");
  };

  if (!project) {
    return (
      <div className="p-8 text-center">
        <p>Project not found.</p>
        <button onClick={() => navigate(-1)} className="text-blue-600 underline">Go Back</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 p-8 w-full">
      {/* Back Navigation */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 text-sm text-gray-500 hover:text-blue-600"
      >
        ← Back to Projects
      </button>

      <div className="w-full">
        {/* Simple Header */}
        <header className="flex justify-between items-center pb-6 mb-6 border-b">
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="text-gray-500">Project Reference: {project._id}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded-full text-sm">Edit</button>
            <button className="px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm">Delete</button>
          </div>
        </header>

        {/* Deadline & Progress Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="p-4 bg-gray-50 rounded-xl border">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Deadline</h3>
            <p className="text-lg font-semibold text-orange-600">
              {new Date(deadline).toLocaleDateString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-full border flex flex-col items-start justify-between">
            <div className="flex justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-400 uppercase">Progress :  </h3>
              <span className="text-xl font-bold"> {progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-10">
          <h2 className="text-sm font-bold text-gray-400 uppercase mb-2">About Project</h2>
          <p className="text-gray-700 leading-relaxed">{project.description || "No description provided."}</p>
        </div>

        {/* Tasks Section with Toggle & Add Input */}
        <section className="mb-10 border rounded-md overflow-hidden">
          <button 
            onClick={() => setShowTasks(!showTasks)}
            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 font-semibold"
          >
            <span>Project Tasks ({tasks.length})</span>
            <span>{showTasks ? '−' : '+'}</span>
          </button>
          
          {showTasks && (
            <div className="p-4">
              {/* Add Task Space */}
              <div className="flex gap-2 mb-6">
                <input 
                  type="text" 
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Enter new task..." 
                  className="flex-1 border rounded px-3 py-2 text-sm focus:outline-blue-500"
                />
                <button 
                  onClick={handleAddTask}
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium"
                >
                  Add Task
                </button>
              </div>

              {/* Task List Space */}
              <div className="space-y-2">
                {tasks.map(task => (
                  <div key={task.id} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
                    <span className="text-sm">{task.title}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-1 bg-gray-100 rounded text-gray-500">
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Team Section */}
        <section className="pt-6 border-t">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase">Team Members</h2>
            <button className="text-xs text-blue-600 font-bold hover:underline">+ INVITE</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {members.map((member) => (
              <div key={member.id} className="p-3 border rounded-full flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold">{member.name}</p>
                  <p className="text-[10px] text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProjectDetails;