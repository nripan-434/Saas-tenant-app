import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaArrowDown } from "react-icons/fa";
import { getAllMembers, projectmember } from '../../features/AuthSlice'
import { getallprojectmembers } from '../../features/ProjectSlice';
import { deallocatemember } from '../../features/ProjectSlice';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GrGenai } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { createAitask } from '../../features/AiSlice';
import Aitasks from '../../components/Aitasks';
import Loading from '../../components/Loading';

const Eachproject = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects } = useSelector(state => state.prj)
  const { members, status } = useSelector(s => s.auth)
  const { aitasks ,aistatus} = useSelector(s=>s.ai)
  const { existmembers } = useSelector(s => s.prj)
  const [memtoggle, setMemtoggle] = useState({})
  const [showTasks, setShowTasks] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [invitebox, setInvitebox] = useState(false)
  const projectmemebers = existmembers[id] || []
 
  const project = useMemo(() => {
    return projects?.find(p => p._id === id);
  }, [projects, id]);
   const [prompt,setprompt] = useState('')
    const handleinput =(e)=>{
      setprompt(e.target.value)
    }
    const handlesubmit = async(e)=>{
      e.preventDefault()
   dispatch(createAitask({projectId:project._id,prompt}))
   setIsopen(false)
   

    }
  const aigentasks=aitasks[project._id]
    
    useEffect(() => {
  if(project?.description){
    setprompt(`You are a Project Manager.

Based on the project description: ${project.description}, generate a list of actionable development tasks.

Each task MUST follow this JSON structure:

{
  "title": "short task name",
  "description": "clear explanation of what needs to be done",
  "priority": "low | medium | high",
  "status": "todo"
}

Rules:
- Return ONLY a valid JSON array.
- Do NOT include explanations or text outside JSON.
- Each task should be practical and implementable by a developer.
- Priority should reflect the logical order of implementation.

Example Output:

[
  {
    "title": "Setup database",
    "description": "Configure MongoDB connection and create initial schemas for users and projects",
    "priority": "high",
    "status": "todo"
  },
  {
    "title": "Create authentication API",
    "description": "Implement user registration and login using JWT authentication",
    "priority": "high",
    "status": "todo"
  }
]`)
  }
}, [project])
   const [isopen,setIsopen]=useState(false)
  
  useEffect(() => {
    if (!id || !project?._id) return;

    dispatch(getallprojectmembers(project._id));

  }, [project?._id, dispatch]);

  useEffect(() => {
    if (!project?.organizationId) return
    if (members?.length > 0) return
    if (status === "pending") return;

    dispatch(getAllMembers(project.organizationId))

  }, [project?.organizationId, dispatch, members?.length])
  const [pending, setPending] = useState(null)
  const handleAssigmMember = async (userId, projectId, force = false) => {
    try {
      const data = await dispatch(
        projectmember({ userId, projectId, isConfirm: force })
      ).unwrap();

      if (data.needsConfirmation && !force) {
        setPending({
          userId,
          message: data.message
        });
        return;
      }

      setPending(null);
      dispatch(getallprojectmembers(projectId));
    } catch (error) {
      console.log(error);
      setPending(null);
    }
  };



  const progress = 20;
  const deadline = "2024-12-31";


  const handleAddTask = () => {
    if (!newTask.trim()) return;
    alert(`Adding task: ${newTask}`);
    setNewTask("");
  };

  if (!project) {
    return (
      <div className="p-8 text-center">
        <p>Project not found.</p>
        <button onClick={() => navigate(-1)} className=" underline">Go Back</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0C1A2B] text-[#B6FF3B] p-8 w-full">
      {/* Back Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm  hover:text-blue-600"
      >
        ← Back to Projects
      </button>

      <div className="w-full">
        {/* Simple Header */}
        <header className="flex justify-between items-center pb-6 mb-6 border-b">
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="">Project Reference: {project._id}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border bg-[#B6FF3B] text-[#0C1A2B] rounded-full text-sm">Edit</button>
            <button className="px-4 py-2  bg-red-600 rounded-full text-white text-sm">Delete</button>
          </div>
        </header>

        {/* Deadline & Progress Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="p-4  rounded-xl border">
            <h3 className="text-xs font-bold  uppercase mb-2">Deadline</h3>
            <p className="text-lg font-semibold text-orange-600">
              {new Date(deadline).toLocaleDateString()}
            </p>
          </div>
          <div className="p-4  rounded-xl border flex flex-col items-start justify-between">
            <div className="flex justify-between mb-2">
              <h3 className="text-xl font-bold  uppercase">Progress :  </h3>
              <span className="text-xl font-bold"> {progress}%</span>
            </div>
            <div className="w-full  rounded-xl h-2">
              <div className="bg-[#B6FF3B] h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* description */}
        <div className="mb-10">
          <h2 className="text-sm font-bold  uppercase mb-2">About Project</h2>
          <p className="leading-relaxed">{project.description || "No description provided."}</p>
        </div>

        {/* Tasks Section with Toggle & Add Input */}
        <section className={`${showTasks ? 'min-h-45 max-h-100' : 'min-h-14'}  top-0 duration-300 mb-10 border rounded-xl no-scrollbar overflow-y-auto`}>
          <button
            onClick={() => setShowTasks(!showTasks)}
            className="w-full flex justify-between items-center p-4 fixed font-semibold"
          >
            <span>Project Tasks ({aigentasks?.length})</span>
            <span>{showTasks ? '−' : '+'}</span>
          </button>

          {showTasks && (
            <div className="p-4 ">
              {/* Add Task Space */}
              <div className=" flex flex-col gap-2 relative   mb-6">
               <div className='flex items-center gap-2 '>
                 <button  onClick={()=>{dispatch(createAitask({projectId:project._id,prompt}))}} className='hover:bg-[#B6FF3B] rounded-xl text-[#0C1A2B] p-3 font-bold bg-[#B6FF3B]/90 duration-200 w-40 flex justify-center gap-1  items-center'>
                  Generate Tasks <GrGenai/> 
                

                    </button>
                     <button className='flex items-center' onClick={()=>{setIsopen(!isopen)}}> <FiEdit className='text-[15px]  ' />prompt</button>
                     {
                      isopen?
                      <div className='    bg-black/40 backdrop-blur-2xl  inset-0 z-999 flex justify-center items-center  ' onClick={()=>{setIsopen(false)}}>
                        <form onSubmit={handlesubmit} onClick={(e) => e.stopPropagation()} action="" className='text-[#B6FF3B] border  flex flex-col gap-2   bg-[#0C1A2B] rounded-xl p-6'>
                        <h1 className='text-xl border-b p-1 '>Prompt:</h1>

                          <textarea onChange={handleinput}  type="text" className='h-60 mt-4 w-100 break-all outline-0 no-scrollbar overflow-x-auto' value={prompt} />
                          <button className='bg-[#B6FF3B]/70 hover:bg-[#B6FF3B] duration-200 rounded-md p-1 text-' type='submit'> Submit</button>
                        </form>
                      </div>
                       :''
                     }
                     
               </div>
              <Aitasks aitasks={aigentasks} status={aistatus} projectId={project._id}/>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Enter new task..."
                  className="flex-1 border rounded px-3 py-2 text-sm "
                />
                <button
                  onClick={handleAddTask}
                  className="bg-[#B6FF3B] text-[#0C1A2B] px-4 py-2 rounded text-sm font-medium"
                >
                  Add Task
                </button>
              </div>

              {/* Task List Space */}
              
            </div>
          )}
        </section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-[#B6FF3B] uppercase">Team Members</h2>
          <button className="text-xs  font-bold hover:underline" onClick={() => {
            setInvitebox(!invitebox)

          }}>{invitebox ? <h1 className='font-bold text-[15px]'>Cancel</h1> : <h1 className='font-bold text-[15px]'>+ Assign Member</h1>}</button>
        </div>


        {/* members */}
        {
          pending && (
            <div onClick={() => { setPending(false) }} className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-100">
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0C1A2B]  p-6 rounded-xl shadow-[8px_8px_6px_rgba(0,0,0,2.1)]">
                <p className="mb-4">{pending.message}</p>
                <div className="flex gap-4 justify-center">
                  <button
                    className="bg-[#B6FF3B] text-[#0C1A2B] px-4 py-2 rounded"
                    onClick={() => handleAssigmMember(pending.userId, project._id, true)}>
                    Assign Anyway
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded"
                    onClick={() => setPending(null)}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )
        }

        <div className={`${invitebox ? ' flex mb-3 gap-2 p-3 h-40 custom-scrollbar overflow-x-auto bg-[#B6FF3B]/90 text-[#0C1A2B] rounded-xl' : 'h-0'} duration-300 `}>
          {
            invitebox ?

              members?.map(x => {
                return <div className='  bg-[#0C1A2B] text-[#B6FF3B] pt-3 hover:shadow-[0_3px_5px_rgba(0,0,0,2.1)] items-center duration-300 hover:scale-105 flex flex-col  rounded-xl p-5  overflow-y-auto no-scrollbar w-50' key={x._id} onClick={() => { handleAssigmMember(x._id, project._id) }}>
                  <img src="https://images.pexels.com/photos/31162437/pexels-photo-31162437.jpeg" className=' h-18 w-18 object-cover rounded-full' alt="" />
                  <div>
                    <h1>{x.name}</h1>
                    <h1>status:</h1>
                  </div>

                </div>
              })


              : ''
          }
        </div>



      </div>

      <div className={`${projectmemebers.length === 0 ? 'bg-none' : 'shadow-[0_3px_5px_rgba(0,0,0,2.1)]'} mb-10 flex gap-3 p-9 rounded-xl overflow-x-auto custom-scrollbar`}>
        {
          projectmemebers?.map(x => {
            return <div key={x._id} className={'z-60 relative  border-2 hover:rounded-none    rounded-[25px] duration-300 hover:shadow-[5px_3px_30px_rgba(0,0,0,2.1)] w-[260px] p-4 '}>
              <div className='p-2 min-h-26  '>
                <h1 className='font-bold'>Name : {x.name}</h1>
                <h2 className='font-bold'>Email : {x.email}</h2>
              </div>

              <p onClick={() => setMemtoggle(prev => ({ ...prev, [x._id]: !prev[x._id] }))} className=' ml-2 mb-3  font-bold text-blue-400 underline flex items-center gap-1 cursor-pointer '>Activein <FaArrowDown className='text-[15px]' />  </p>
              <div
                className={`absolute border-t-2 mt-2 custom-scrollbar  left-auto right-auto flex gap-2 p-3 overflow-x-auto w-[230px] transition-all duration-300 ${memtoggle[x._id] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                {
                  x.projects.length>0?
                x.projects?.map(p => (
                  <div key={p._id} className="flex-shrink-0 text-[#0C1A2B]   bg-[#B6FF3B] rounded-md p-2">
                    {p.name}
                  </div>
                )): <p></p>
                }
              </div>
           

          < button onClick={() => { dispatch(deallocatemember({ userId: x._id, projectId: id })) }} className='absolute bottom-5 right-3 bg-red-600 font-bold text-white p-1 rounded-xl active:scale-95 hover:shadow-[0_0px_10px_rgba(255,0,0,2.1)] duration-200'>Deallocate</button>

    </div>
          })
        }
      </div >
    </div >
  )
}

export default Eachproject;