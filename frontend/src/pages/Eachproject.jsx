import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { inviteMember } from '../features/AuthSlice'

const ProjectDetails = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects } = useSelector(state => state.prj)
  
  const [showTasks, setShowTasks] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [invitebox,setInvitebox] = useState(false)
  const [form,setForm]=useState({
    email:'',
    role:'user'
  })
  const handleinput =(e)=>{
    const {name,value} = e.target
    setForm((prev)=>({...prev,[name]:value}))
    console.log(form)
  }
  const handlesubmit =(e)=>{
    e.preventDefault()
    dispatch(inviteMember(form))

  }

  const project = projects?.find(p => p._id === id)

  // Mock data (replace with real project data)
  const progress = projects?.progress || 20; 
  const deadline = projects?.deadline || "2024-12-31";
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
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase">Team Members</h2>
            <button className="text-xs text-blue-600 font-bold hover:underline" onClick={()=>{setInvitebox(!invitebox)}}>{invitebox?'cancel':'+ Invite Member'}</button>
          </div>
          {
            invitebox?<div className='absolute  bg-black/40 backdrop-blur-sm inset-0 z-50 flex justify-center items-center  ' onClick={()=>{setInvitebox(false)}}>
              <div className='bg-white  relative h-90 w-140 rounded-xl shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0,0,0,0.4)] flex flex-col justify-center items-center' onClick={(e)=>{e.stopPropagation()}}>
                <button onClick={()=>{setInvitebox(false)}} className='bg-red-600 text-white w-20 h-10  rounded-xl absolute top-6 right-5'>close</button>
              <form action="" onSubmit={handlesubmit} className='flex flex-col h-50 w-90 justify-center p-3  rounded-xl gap-4 shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_2px_10px_0_rgb(0,0,0,0.4)]'>
                <input type="text" name='email' onChange={handleinput} value={form.email} placeholder='email'/>
                <button type='submit'>invite</button>
              </form>

              </div>
            </div>:''
          }

        {/* members */}
       {
        
       }
      </div>
    </div>
  )
}

export default ProjectDetails;