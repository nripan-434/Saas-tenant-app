import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaArrowDown } from "react-icons/fa";
import { getAllMembers, projectmember } from '../../features/AuthSlice'
import { getallprojectmembers, updateProject } from '../../features/ProjectSlice';
import { deallocatemember } from '../../features/ProjectSlice';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GrGenai } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { createAitask } from '../../features/AiSlice';
import Aitasks from '../../components/Aitasks';
import { addnewtask, getalltask } from '../../features/TaskSlice';
import Tasklist from '../../components/Tasklist';
import { useRef } from 'react';
const Eachproject = () => {
  const dispatch = useDispatch()
  const current = useRef()
  const aitaskcurrent = useRef()
  const prjtaskcurrent = useRef()
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects } = useSelector(state => state.prj)
  const { members, status } = useSelector(s => s.auth)
  const { aitasks, aistatus } = useSelector(s => s.ai)
  const { existmembers } = useSelector(s => s.prj)
  const { tasks } = useSelector(s => s.task)
  const [memtoggle, setMemtoggle] = useState({})
  const [invitebox, setInvitebox] = useState(false)
  const projectmemebers = existmembers[id] || []
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState({
    name: '',
    description: '',
    deadline: ''
  })
  const project = useMemo(() => {
    return projects?.find(p => p._id === id);
  }, [projects, id]);
  useEffect(() => {
    if (project && editOpen) {
      setEditData({
        name: project.name || '',
        description: project.description || '',
        deadline: project.deadline
          ? new Date(project.deadline).toISOString().split("T")[0]
          : ''
      })
    }
  }, [project, editOpen])
  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({ ...prev, [name]: value }))
  }
  const handleEditSubmit = (e) => {
    e.preventDefault()
    dispatch(updateProject({ projectId: project._id, updatedData: editData }))
    setEditOpen(false)
  }

  const scrollToInput = () => {
    current.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const scrolltoaitasks = () => {
    aitaskcurrent.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const [prompt, setprompt] = useState('')
  const handleinput = (e) => {
    setprompt(e.target.value)
  }
  const handlesubmit = async (e) => {
    e.preventDefault()
    dispatch(createAitask({ projectId: project._id, prompt }))
  }
  const aigentasks = aitasks[project._id]

  useEffect(() => {
    if (project?._id) {
      dispatch(getalltask(project._id));
    }
  }, [project?._id, dispatch]);
  useEffect(() => {
    if (project?.description) {
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

  const [isopen, setIsopen] = useState(false)
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
      ).unwrap()

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


  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  })
  const handledata = (e) => {
    const { name, value } = e.target
    setTask((prev) => {
      const updated = { ...prev, [name]: value }
      return updated
    })


  }
  const handletaskAddsubmit = (e) => {
    e.preventDefault()
    dispatch(addnewtask({ task, projectId: project._id }))

    setTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    })
  }
  const [projectStatus, setProjectStatus] = useState('');
  useEffect(() => {
    if (project?.prjstatus ) {
      setProjectStatus(project.prjstatus);
    }
  }, [project]);

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setProjectStatus(value);

    dispatch(updateProject({
      projectId: project._id,
      updatedData: { status: value }
    }));
  };






  return (
    <div className="min-h-screen bg-[#0C1A2B] text-[#B6FF3B]  lg:px-58 p-6 md:p-20 w-full">
      {/* Back Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm  hover:text-blue-600"
      >
        ← Back to Projects
      </button>
      <div className="w-full text-sm sm:text-xl">
        {/* Simple Header */}
        <header className="flex justify-between items-center pb-6 mb-6 border-b">
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <p className="">Project Reference: {project._id}</p>
            <p className="">Created Date: {new Date(project.startDate).toLocaleDateString()}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setEditOpen(true)} className="px-4 py-2 border bg-[#B6FF3B] text-[#0C1A2B] rounded-full text-sm">Edit</button>
            <div className='flex text-sm justify-center items-center'>
              <label htmlFor="">Status :</label>
              <select
                value={projectStatus}
                onChange={handleStatusChange}
                className='custom-scrollbar bg-[#0C1A2B] text-[#B6FF3B] px-2 outline-0 rounded-xl'
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On-hold</option>
              </select>
            </div>

            {
              editOpen && (
                <div
                  className="fixed inset-0 bg-black/40 backdrop-blur-2xl z-[999] flex justify-center items-center"
                  onClick={() => setEditOpen(false)}
                >
                  <motion.form
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleEditSubmit}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#0C1A2B] text-[#B6FF3B] border rounded-xl p-6 flex flex-col gap-4 w-[400px]"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-2">
                      <h1 className="text-xl font-bold">Edit Project</h1>
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => setEditOpen(false)}
                      >
                        X
                      </button>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col">
                      <label>Project Name</label>
                      <input
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="outline-0 bg-transparent border rounded-xl p-3"
                      />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                        className="outline-0 bg-transparent no-scrollbar border rounded-xl p-3"
                      />
                    </div>

                    {/* Deadline */}
                    <div className="flex flex-col">
                      <label>Deadline</label>
                      <input
                        type="date"

                        name="deadline"
                        min={new Date().toISOString().split("T")[0]}
                        value={editData.deadline}
                        onChange={handleEditChange}
                        className="outline-0 bg-transparent border rounded-xl p-3"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="bg-[#B6FF3B] text-[#0C1A2B] font-bold rounded-md p-2"
                    >
                      Update Project
                    </button>
                  </motion.form>
                </div>
              )
            }
            {/* <button className="px-4 py-2  bg-red-600 rounded-full text-white text-sm">Delete</button>  */}
          </div>
        </header>
        {/* Deadline & Progress Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className={`${project.status == 'overdue' ? 'bg-gradient-to-br from-red-700 via-red-600 to-red-800 text-white border border-red-400 shadow-[0_0_25px_rgba(255,0,0,0.4)]' : project.status == 'urgent' ? 'bg-[#3B2A0D] border border-[#FFC857] text-[#FFE8A3]' : 'bg-[#0C1A2B] border border-[#B6FF3B]/20 text-[#B6FF3B]'} shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0,0,0,0.9)] p-5 rounded-xl `}>
            <h3 className="text-xs font-bold  uppercase mb-2">Deadline</h3>
            <p className="text-lg font-semibold ">
              {new Date(project.deadline).toLocaleDateString()}
            </p>
          </div>
          <div className="p-4  rounded-xl shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0,0,0,0.9)] flex flex-col items-start justify-between">
            <div className="flex justify-between mb-2">
              <h3 className="text-xl font-bold  uppercase">Progress :  </h3>
              <span className="text-xl font-bold "> {project.progress}%</span>
            </div>
            <div className="w-full  rounded-xl h-2">
              <div className="bg-[#B6FF3B] h-2 rounded-full transition-all duration-500" style={{ width: `${project.progress}%` }}></div>
            </div>
          </div>
        </div>
        {/* description */}
        <div className="mb-10 shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0,0,0,0.9)] p-6">
          <h2 className="text-sm font-bold border-b uppercase mb-2">About Project</h2>
          <p className="leading-relaxed  text-[16px]">{project.description || "No description provided."}</p>
        </div>
        <button className="w-full flex gap-4 items-center pb-4  font-semibold">
          <span>Project Tasks ({tasks?.length})</span>
          <h1 className='cursor-pointer bg-[#B6FF3B] rounded-xl p-1 text-[#0C1A2B]' onClick={() => { scrollToInput() }}>Add Task</h1>
        </button>
        <div className=''>
          <section
            ref={prjtaskcurrent}
            className={`p-5 custom-scrollbar   duration-300 mb-10 shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0,0,0,0.9)] rounded-xl  overflow-y-auto`}>
            {/* {showTasks && ( */}
            <div className="p-4 ">
              <div className='flex gap-4 flex-col mb-8'>
                <h1 className='flex justify-between'>Tasks:   </h1>
                <Tasklist tasks={tasks} members={projectmemebers} />
              </div>
              <div className='flex justify-center'>
                <div className='flex flex-col lg:w-2/4 w-full  mt-6 gap-3'>
                  {/* create a task */}
                  <form onSubmit={handletaskAddsubmit} action="" className='flex flex-col shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0,0,0,2.9)]  p-4 rounded-xl gap-4'>
                    <h1 className='flex justify-center text-2xl font-bold'>Create a Task</h1>
                    <div className='flex flex-col'>
                      <label htmlFor="">Task :</label>
                      <input onChange={handledata} ref={current} name='title' value={task.title} className='outline-0' type="text" placeholder='create authentication' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor="">Description :</label>
                      <textarea onChange={handledata} name='description' value={task.description} className='outline-0' type="text" placeholder='add auth and jwt for authentication' />
                    </div>
                    <div className='flex'>
                      <label htmlFor="">Priority :</label>
                      <select onChange={handledata} name='priority' className='custom-scrollbar bg-[#0C1A2B] text-[#B6FF3B] px-2 outline-0 rounded-xl' id="">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div className='flex gap-3 flex-col'>
                      <label>Deadline :</label>
                      <input
                        type="date"
                        name="dueDate"
                        min={new Date().toISOString().split("T")[0]}
                        value={task.dueDate || ""}
                        onChange={handledata}
                        className='outline-0 p-1 rounded-xl '
                      />
                    </div>
                    <button className='p-2 bg-[#B6FF3B] text-[#0C1A2B] rounded-xl'>Add</button>
                  </form>
                </div>
              </div>
              <div className=" flex flex-col gap-2    ">
                <div className='flex items-center gap-2 '>
                  {
                    isopen ?
                      <div className=' fixed   bg-black/40 backdrop-blur-2xl  inset-0 z-999 flex justify-center items-center  ' onClick={() => { setIsopen(false) }}>
                        <motion.form
                          initial={{ y: 40, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          onSubmit={(e) => {
                            handlesubmit(e)
                            scrolltoaitasks()
                            setIsopen(false)
                          }} onClick={(e) => e.stopPropagation()} action="" className='text-[#B6FF3B] border  flex flex-col gap-2   bg-[#0C1A2B] rounded-xl p-6'>
                          <div className='flex border-b justify-between p-2 items-center'>
                            <h1 className='text-xl  p-1 '>Prompt:</h1>
                            <button className='text-red-500 font-medium' onClick={() => { setIsopen(false) }}>X</button>

                          </div>
                          <textarea onChange={handleinput} type="text" className='h-80 mt-4 w-100 break-all outline-0 no-scrollbar overflow-x-auto' value={prompt} />
                          <button className='bg-[#B6FF3B]/70 hover:bg-[#B6FF3B] text-[#0C1A2B] font-medium duration-200 rounded-md p-1 text-' type='submit' > Submit</button>
                        </motion.form>
                      </div>
                      : ''
                  }
                </div>
                <div className='flex justify-center  items-center mt-4  gap-4'>
                  <div className=' flex flex-col md:flex-row gap-3 w-full md:w-2/4   items-center '>
                    <button onClick={() => {
                      dispatch(createAitask({ projectId: project._id, prompt }))
                      scrolltoaitasks()
                    }
                    } className='hover:bg-[#B6FF3B] rounded-xl text-[#0C1A2B] p-3 font-bold bg-[#B6FF3B]/90 duration-200 w-full flex justify-center gap-1  items-center'>
                      Generate Tasks <GrGenai />
                    </button>
                    <button className='flex items-center' onClick={() => { setIsopen(!isopen) }}> <FiEdit className='text-[15px]  ' />prompt</button>
                  </div>
                </div>
                <div ref={aitaskcurrent}>
                  <Aitasks aitasks={aigentasks} status={aistatus} projectId={project._id} />
                </div>
              </div>
            </div>
            {/* )} */}
          </section>
        </div>
        {/* member */}
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
                return <div className='  bg-[#0C1A2B] text-[#B6FF3B] pt-3 hover:shadow-[0_3px_5px_rgba(0,0,0,2.1)] justify-center  items-center duration-300 hover:scale-105 flex flex-col  rounded-xl p-5  overflow-y-auto no-scrollbar w-50' key={x._id} onClick={() => { handleAssigmMember(x._id, project._id) }}>
                  <div className='flex flex-col items-center justify-center'>
                    <div className="rounded-full h-16 w-16 flex justify-center items-center font-bold text-2xl bg-[#B6FF3B] text-[#0C1A2B]">
                      {x.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h1 className=''>Name:{x.name}</h1>

                    </div>

                  </div>

                </div>
              })
              : ''
          }
        </div>
      </div>
      <div
        className={`${projectmemebers.length === 0
          ? ""
          : "shadow-[0_3px_5px_rgba(0,0,0,2.1)]"
          } mb-10 flex items-start gap-3 p-5 rounded-xl overflow-x-auto custom-scrollbar`}
      >
        {projectmemebers?.map((x) => {
          return (
            <div
              key={x._id}
              className="shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.2),_0_6px_10px_0_rgb(0,0,0,0.9)] hover:rounded-none rounded-[25px] duration-300 hover:shadow-[5px_3px_30px_rgba(0,0,0,2.1)] min-w-60 max-w-60 p-4 flex flex-col"
            >
              {/* Avatar */}
              <div className="flex justify-center items-center">
                <div className="rounded-full h-16 w-16 flex justify-center items-center font-bold text-2xl bg-[#B6FF3B] text-[#0C1A2B]">
                  {x.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Info */}
              <div className="p-2 min-h-26">
                <h1 className="font-bold">
                  Name : <span className="font-light">{x.name}</span>
                </h1>
                <h2 className="font-bold">
                  Email : <span className="font-light">{x.email}</span>
                </h2>
              </div>

              {/* Toggle */}

              <p
                onClick={() =>
                  setMemtoggle((prev) => ({
                    ...prev,
                    [x._id]: !prev[x._id],
                  }))
                }
                className="ml-2 mb-2 justify-between  font-bold text-blue-400  flex items-center gap-1 cursor-pointer"
              >
                <button className='flex underline justify-center items-center gap-1' >
                  Activein
                  <FaArrowDown
                    className={`text-[15px] transition-transform ${memtoggle[x._id] ? "rotate-180" : ""
                      }`}
                  />
                </button>
                <button
                  onClick={() =>
                    dispatch(
                      deallocatemember({ userId: x._id, projectId: id })
                    )
                  }
                  className=" mt-3 self-end bg-red-600 font-bold text-white px-2 py-1 rounded-xl active:scale-95 hover:shadow-[0_0px_10px_rgba(255,0,0,0.8)] duration-200"
                >
                  Deallocate
                </button>
              </p>


              <div
                className={`shadow-[0_3px_5px_rgba(0,0,0,0.5)] custom-scrollbar rounded-xl flex gap-2 overflow-x-auto w-full transition-all duration-300 ${memtoggle[x._id]
                  ? "opacity-100 h-auto p-3"
                  : "opacity-0 h-0 p-0 overflow-hidden"
                  }`}
              >
                {x.projects?.length > 0 &&
                  x.projects.map((p) => (
                    <div
                      key={p._id}
                      className="flex-shrink-0 text-[#0C1A2B] bg-[#B6FF3B] rounded-md px-2 py-1 "
                    >
                      {p.name}
                    </div>
                  ))}
              </div>


            </div>
          );
        })}
      </div>

    </div >
  )
}

export default Eachproject;