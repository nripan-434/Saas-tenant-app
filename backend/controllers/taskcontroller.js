import { asyncHandler } from "../middleware/asyncHandler.js";
import projectModel from "../models/projectModel.js";
import taskModel from "../models/taskModel.js"
import userModel from "../models/userModel.js";


export const addnewtask = async (req, res) => {

  const { task, projectId } = req.body

  if (!task.title || !task.description) {
    return res.status(400).json({ message: "Please fill in all required fields" })
  }
  const userId = req.user._id;
  const titleexist = await taskModel.findOne({ title: task.title, createdBy: userId })
  if (titleexist) {
    return res.status(409).json({ message: "task already exist" })
  }
  const task1 = await taskModel.create({
    title: task.title, description: task.description, priority: task.priority, createdBy: userId, projectId: projectId
  })
  const progress = await calculateProjectProgress(projectId)
  await projectModel.findByIdAndUpdate(projectId, { progress })
  return res.status(201).json({ message: "task created successfully", task: task1 })
}

export const addaitask = asyncHandler(async (req, res) => {
  const { task, projectId } = req.body
  const { organizationId, _id } = req.user
  // console.log(projectId)
  console.log(task)
  if (!task) {
    return res.status(400).json({ message: 'Task is required' })
  }
  if (!projectId) {
    return res.status(400).json({ message: 'Project Id not found!' })
  }
  if (!organizationId) {
    return res.status(400).json({ message: 'Unauthorized Access!' })
  }
  const prj = await taskModel.findOne({ projectId: projectId, title: task.title })
  if (prj) {
    return res.status(400).json({ message: 'Task Already Added!' })
  }
  const restask = await taskModel.create({ title: task.title, priority: task.priority, description: task.description, projectId: projectId, createdBy: _id })
  const progress = await calculateProjectProgress(projectId)
  await projectModel.findByIdAndUpdate(projectId, { progress })
  return res.status(200).json({ message: 'Task added', restask })
})
export const getalltask = asyncHandler(async (req, res) => {
  const { projectId } = req.query;

  if (!projectId) {
    return res.status(400).json({ message: 'Project Id is required in query params!' });
  }
  const tasks = await taskModel.find({ projectId: projectId }).populate('assignedTo');
  return res.status(200).json({ tasks });
});
export const removetask = async (req, res) => {
  const { taskId } = req.params
  const userId = req.user._id
  const task = await taskModel.findOne({ _id: taskId, createdBy: userId })
  if (!task) {
    return res.status(404).json({ message: "Task not found" })
  }
  await task.deleteOne()
  const projectId = task.projectId
  const progress = await calculateProjectProgress(projectId)
  await projectModel.findByIdAndUpdate(projectId, { progress })
  return res.status(200).json({
    message: "Task deleted successfully", taskId
  })
}



export const updatetask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { task } = req.body;
  console.log(task)
  const userId = req.user._id;
  if (!taskId) {
    return res.status(400).json({ message: "Task Id is required" });
  }
  const existingTask = await taskModel.findOne({ _id: taskId, createdBy: userId });
  if (!existingTask) {
    return res.status(404).json({ message: "Task not found or unauthorized" });
  }
  if (existingTask.title == task.title && existingTask.description == task.description && existingTask.priority == task.priority && existingTask.status == task.status) {
    return res.status(400).json({ message: "Task is already up to date. No changes saved." })
  }
  existingTask.title = task.title;
  existingTask.description = task.description;
  existingTask.priority = task.priority || existingTask.priority;
  existingTask.status = task.status || existingTask.status;

  await existingTask.save();
  const latestprogress = await calculateProjectProgress(existingTask.projectId)

  await projectModel.findByIdAndUpdate(existingTask.projectId, { progress: latestprogress })
  return res.status(200).json({ message: "Task updated successfully", task: existingTask });
});




export const taskassign = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { memberId } = req.body;
  const userId = req.user._id;

  if (!taskId) {
    return res.status(400).json({ message: "Task Id is required" });
  }
  if (!memberId) {
    return res.status(400).json({ message: "Member Id is required" });
  }
  const existingTask = await taskModel.findOne({ _id: taskId, createdBy: userId });
  if (!existingTask) {
    return res.status(404).json({ message: "Task not found or unauthorized" });
  }
  const member = await userModel.findOne({ _id: memberId })
  const existingTaskmember = await userModel.findOne({ _id: existingTask.assignedTo })
  if (existingTask.assignedTo || existingTask.assignedTo == memberId) {
    return res.status(404).json({ message: `Already Assigned to ${existingTaskmember.name} ` });
  }
  existingTask.assignedTo = memberId;
  existingTask.taskremoved = false;
  await existingTask.save();
  await existingTask.populate('assignedTo')
  return res.status(200).json({ message: `Task Assigned ${member.name} successfully`, task: existingTask });
});

export const getmembertasks = asyncHandler(async (req, res) => {
  const { projectId, userId } = req.query;
  if (!projectId) {
    return res.status(400).json({ message: 'Project Id is required in query params!' })
  }
  const tasks = await taskModel.find({ projectId: projectId, assignedTo: userId }).populate('assignedTo')
  return res.status(200).json({ tasks })
});

export const statusupdate = asyncHandler(async (req, res) => {
  const { taskId } = req.params
  const { form } = req.body
  console.log(taskId)
  console.log(form)
  const task = await taskModel.findOne({ _id: taskId })
  if (!task) {
    return res.status(400).json({ message: 'Task not Found!' })
  }
  task.status = form;
  await task.save()
  const progress = await calculateProjectProgress(task.projectId)

  await projectModel.findByIdAndUpdate(task.projectId, { progress })
  return res.status(200).json({ message: 'Status Updated Successfully', task })

})
const calculateProjectProgress = async (projectId) => {
  const tasks = await taskModel.find({ projectId })
  console.log(tasks.length)
  const total = tasks.length
  if (total === 0) return 0
  console.log(tasks.map(t => t.status))

  const completed = tasks.filter(t => t.status === 'done')
  const completedcount = completed.length
  console.log(Math.round((completedcount / total) * 100))
  return Math.round((completedcount / total) * 100)
}