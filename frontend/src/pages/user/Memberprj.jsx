import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowBack, IoIosTime, IoIosPeople, IoIosRocket } from "react-icons/io";
import Loading from '../../components/Loading';
import { getmemberprjs } from '../../features/ProjectSlice';
import { getmembertasks, statusupdate } from '../../features/TaskSlice';


const Memberprj = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(s => s.auth)
  const { id } = useParams();
  const navigate = useNavigate();
  const { memberprjs } = useSelector(s => s.prj);
  const { membertasks } = useSelector(s => s.task);
  const filteredmembertasks = [...membertasks].sort((a, b) =>
    (a.status === 'done') - (b.status === 'done')
  );
  const [project, setProject] = useState(null);
  const [statusform, setStatusform] = useState({})
  const statushandle = (e, id) => {
    const { value } = e.target
    setStatusform((prev) => ({ ...prev, [id]: value }))
    console.log(statusform)
  }
  const pendingtasks = filteredmembertasks.filter(x => {
    return x.status == 'todo'
  })
  const inprogresstasks = filteredmembertasks.filter(x => {
    return x.status == 'in-progress'
  })
  const completedtasks = filteredmembertasks.filter(x => {
    return x.status == 'done'
  })
  const [taskcatogory, setTaskcatogory] = useState('alltasks')

  useEffect(() => {
    const currentProject = memberprjs.find(p => p._id === id);
    setProject(currentProject);
  }, [id, memberprjs]);
  useEffect(() => {
    dispatch(getmemberprjs({ orgId: user.organizationId._id, userId: user.id }))
  }, [])
  useEffect(() => {
    dispatch(getmembertasks({ projectId: id, userId: user.id }))
  }, [])
  const remainingtask = membertasks.filter(x => {
    return x.status != 'done'
  })
  if (!project) return (
    <div className="h-screen flex  justify-center text-xl font-semibold">
      <Loading />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0C1A2B] text-sm p-4  md:p-8">
      {/* Back Button & Header */}
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#B6FF3B]   transition-colors mb-6 group"
        >
          <IoIosArrowBack className="group-hover:-translate-x-1 duration-200" />
          Back to Dashboard
        </button>

        <div className="bg-[[#0C1A2B]]  rounded-3xl p-6 md:p-10 shadow-[inset_0_2px_4px_0_rgb(0,0,0,2.2),_0_6px_10px_5px_rgb(0,0,0,3.9)] border-[#B6FF3B] mb-8">
          <div className="flex  justify-between items-center md:items-center gap-4">
            <div>
              <span className="bg-[#B6FF3B]  text-[#0C1A2B] text-xs font-bold px-1 rounded-full uppercase  tracking-wider">
                Project Workspace
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-[#B6FF3B] mt-2">{project.name}</h1>
              <p className="text-[#B6FF3B] mt-2 max-w-2xl">{project.description}</p>
            </div>
            <div className="flex gap-3">
              <div className="text-right">
                <p className="text-sm text-[#B6FF3B] uppercase font-bold tracking-widest">Created By</p>
                <p className="font-medium text-[#B6FF3B]">{project.createdBy?.name || 'Admin'}</p>
              </div>
              <div className="w-12 h-12 rounded-full  bg-[#B6FF3B] shadow-[inset_0_2px_4px_0_rgb(0,0,0,1.2),_0_6px_10px_5px_rgb(0,0,0,3.9)]   flex items-center justify-center text-[#0C1A2B] font-bold ">
                {project.createdBy?.name?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2   md:grid-cols-3 gap-5 mb-8">
          <StatCard icon={<IoIosTime className="text-green-500" />} label="Status :" value={project.prjstatus} />
          <StatCard icon={<IoIosTime className="text-green-500" />} label="Deadline :" value={new Date(project.deadline).toLocaleDateString()} />
          <StatCard icon={<IoIosRocket className="text-purple-500" />} label="Remaining Tasks :" value={remainingtask.length} />
        </div>

        {
        
          membertasks.length == 0 ?
            <div className='flex justify-center m-3 text-[#B6FF3B] border-t-2 pt-7 '>No Task Assigned!</div> :
            <div >
              <h1 className='text-2xl text-[#B6FF3B] p-4'>Tasks:</h1>
              <div className='flex  flex-col overflow-x-auto custom-scrollbar justify-between  gap-4 bg-gray-800 p-4 rounded-xl'>
                <div className='flex gap-3'>
                  <button onClick={() => { setTaskcatogory('alltasks') }} className={`${taskcatogory == 'alltasks' ? 'bg-white ' : 'text-[#B6FF3B] bg-gray-500'} font-medium  cursor-pointer duration-300 active:scale-95  rounded-sm px-2 text-medium`}>all tasks</button>
                  <button onClick={() => { setTaskcatogory('completed') }} className={`${taskcatogory == 'completed' ? 'bg-white  ' : 'text-[#B6FF3B] bg-gray-500'} font-medium  cursor-pointer duration-300 active:scale-95  rounded-sm px-2 text-medium`}>completed tasks</button>
                  <button onClick={() => { setTaskcatogory('pending') }} className={`${taskcatogory == 'pending' ? 'bg-white  ' : 'text-[#B6FF3B] bg-gray-500'}   font-medium  cursor-pointer  duration-300 active:scale-95  rounded-sm px-2 text-medium`}>pending tasks</button>

                </div>
                <div className={`${taskcatogory == 'alltasks' ? 'block' : 'hidden'} flex flex-col md:flex-row gap-4`}>
                  {
                    filteredmembertasks.length == 0 ?
                      <div className='flex justify-center w-full m-3 text-[#B6FF3B] border-t-2 pt-7 '>No Task Assigned!</div> :
                      filteredmembertasks?.map(x => {
                        return <div key={x._id} className=" min-w-90 md:min-w-110 flex justify-between items-center p-5 rounded-2xl bg-[#0f172a] text-[#B6FF3B] shadow-[0_10px_25px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out hover:scale-102 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]  overflow-hidden">

                          <div>
                            <div className="relative z-10">
                              <h1 className="text-lg font-bold mb-2">
                                Task: {x.title}
                              </h1>

                              <p className="text-sm text-gray-300  mb-4">
                                Description: {x.description}
                              </p>
                              <p className="text-sm text-gray-300  mb-4">
                                DeadLine: {new Date(x.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className=' flex   justify-between items-center'>

                              <span className="text-xs h-7 px-3 py-1 rounded-full bg-black/30 font-semibold">
                                Priority: {x.priority}
                              </span>
                              <div className='flex justify-center text-sm items-center gap-2'>

                                {
                                  x.status == 'done' ? <div className='bg-[#B6FF3B] p-1 rounded-md text-[#0C1A2B] font-medium'>Completed</div> :
                                    <div className='flex  items-center gap-1 justify-center'>
                                                 {
                                            project.prjstatus==='completed'?'':
                                            <div>
                                                  <h1 className='pl-2'> Status : </h1>
                           
                                      <form className='hover:bg-gray-800 duration-300 bg-[#0C1A2B] hover:text-[#B6FF3B] flex gap-2 items-center pr-2 justify-center p-1  rounded-xl' action="">

                                        <select onChange={(e) => { statushandle(e, x._id) }} name='status' value={statusform[x._id] || x.status} id="" className='outline-0 bg-[#0C1A2B] p-1 cursor-pointer   rounded-xl'>
                                          <option value="todo">to do</option>
                                          <option value="in-progress">in progress</option>
                                          <option value="done">completed</option>
                                        </select>
                                        
                                        <button type='submit' onClick={(e) => {
                                          e.preventDefault()
                                          console.log(statusform[x._id])
                                          dispatch(statusupdate({ taskId: x._id, form: statusform[x._id] }))
                                        }} className='hover:text-[#0C1A2B] px-2 duration-300 rounded-md cursor-pointer   hover:bg-[#B6FF3B] font-bold'>submit</button>
                                      </form>
                                            </div>
                                        }
                                      
                                    </div>

                                }

                              </div>

                            </div>
                          </div>
                        </div>

                      })
                  }
                </div>
                <div className={`${taskcatogory == 'pending' ? 'block ' : 'hidden'} flex flex-col md:flex-row gap-4`}>
                  {
                     pendingtasks.length == 0 ?
            <div className='flex justify-center m-3 text-[#B6FF3B] border-t-2 pt-7 '>No Pending Task!</div> :
                    pendingtasks?.map(x => {
                      return <div key={x._id} className=" min-w-120 flex justify-between items-center p-5 rounded-2xl bg-[#0f172a] text-[#B6FF3B] shadow-[0_10px_25px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out hover:scale-102 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]  overflow-hidden">

                        <div>
                          <div className="relative z-10">
                            <h1 className="text-lg font-bold mb-2">
                              Task: {x.title}
                            </h1>

                            <p className="text-sm text-gray-300 mb-4">
                              Description: {x.description}
                            </p>
                          </div>
                          <div className=' flex  justify-between items-center'>

                            <span className="text-xs h-7 px-3 py-1 rounded-full bg-black/30 font-semibold">
                              Priority: {x.priority}
                            </span>
                            <div className='flex justify-center text-sm items-center gap-2'>

                              {
                                x.status == 'done' ? <div className='bg-[#B6FF3B] p-1 rounded-md text-[#0C1A2B] font-medium'>Completed</div> :
                                  <div className='flex  items-center gap-1 justify-center'>
                                    <h1 className='pl-2'> Status : </h1>
                                    <form className='hover:bg-gray-800 duration-300 bg-[#0C1A2B] hover:text-[#B6FF3B] flex gap-2 items-center pr-2 justify-center p-1  rounded-xl' action="">

                                      <select onChange={(e) => { statushandle(e, x._id) }} name='status' value={statusform[x._id] || x.status} id="" className='outline-0 bg-[#0C1A2B] p-1 cursor-pointer   rounded-xl'>
                                        <option value="todo">to do</option>
                                        <option value="in-progress">in progress</option>
                                        <option value="done">completed</option>
                                      </select>
                                      <button type='submit' onClick={(e) => {
                                        e.preventDefault()
                                        console.log(statusform[x._id])
                                        dispatch(statusupdate({ taskId: x._id, form: statusform[x._id] }))
                                      }} className='hover:text-[#0C1A2B] px-2 duration-300 rounded-md cursor-pointer   hover:bg-[#B6FF3B] font-bold'>submit</button>
                                    </form>
                                  </div>

                              }

                            </div>

                          </div>
                        </div>
                      </div>

                    })
                  }
                </div>
                <div className={`${taskcatogory == 'completed' ? 'block ' : 'hidden'} flex flex-col md:flex-row gap-4`}>
                  {
                     completedtasks.length == 0 ?
            <div className='flex justify-center m-3 text-[#B6FF3B] border-t-2 pt-7 '>No Completed Task !</div> :
                    completedtasks?.map(x => {
                      return <div key={x._id} className=" min-w-120 flex justify-between items-center p-5 rounded-2xl bg-[#0f172a] text-[#B6FF3B] shadow-[0_10px_25px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out hover:scale-102 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]  overflow-hidden">

                        <div>
                          <div className="relative z-10">
                            <h1 className="text-lg font-bold mb-2">
                              Task: {x.title}
                            </h1>

                            <p className="text-sm text-gray-300 mb-4">
                              Description: {x.description}
                            </p>
                          </div>
                          <div className=' flex  justify-between items-center'>

                            <span className="text-xs h-7 px-3 py-1 rounded-full bg-black/30 font-semibold">
                              Priority: {x.priority}
                            </span>
                            <div className='flex justify-center text-sm items-center gap-2'>

                              {
                                x.status == 'done' ? <div className='bg-[#B6FF3B] p-1 rounded-md text-[#0C1A2B] font-medium'>Completed</div> :
                                  <div className='flex  items-center gap-1 justify-center'>
                                    <h1 className='pl-2'> Status : </h1>
                                    <form className='hover:bg-gray-800 duration-300 bg-[#0C1A2B] hover:text-[#B6FF3B] flex gap-2 items-center pr-2 justify-center p-1  rounded-xl' action="">

                                      <select onChange={(e) => { statushandle(e, x._id) }} name='status' value={statusform[x._id] || x.status} id="" className='outline-0 bg-[#0C1A2B] p-1 cursor-pointer   rounded-xl'>
                                        <option value="todo">to do</option>
                                        <option value="in-progress">in progress</option>
                                        <option value="done">completed</option>
                                      </select>
                                      <button type='submit' onClick={(e) => {
                                        e.preventDefault()
                                        console.log(statusform[x._id])
                                        dispatch(statusupdate({ taskId: x._id, form: statusform[x._id] }))
                                      }} className='hover:text-[#0C1A2B] px-2 duration-300 rounded-md cursor-pointer   hover:bg-[#B6FF3B] font-bold'>submit</button>
                                    </form>
                                  </div>

                              }

                            </div>

                          </div>
                        </div>
                      </div>

                    })
                  }
                </div>

              </div>

            </div>

        }


      </div>
    </div>
  );
};

// Simple Stat Card Helper
const StatCard = ({ icon, label, value }) => (
  <div className="bg-[#B6FF3B] p-6 rounded-3xl shadow-sm border  flex items-center gap-4">
    <div className="text-3xl p-3 bg-[#0C1A2B]  rounded-2xl">{icon}</div>
    <div>
      <p className="text-xs text-[#0C1A2B]  uppercase font-bold tracking-wider">{label}</p>
      <p className="text-2xl font-black text-[#0C1A2B] ">{value}</p>
    </div>
  </div>
);

export default Memberprj;