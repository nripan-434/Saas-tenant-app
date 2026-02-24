import mongoose from "mongoose"
import { asyncHandler } from "../middleware/asyncHandler.js"
import projectModel from "../models/projectModel.js"



export const createproject = asyncHandler(async (req, res) => {
    const { name, description, organizationId } = req.body
    if (!name || !description || !organizationId) {
        return res.status(400).json({ message: 'Please provide name, description, and organizationId' })
    }
    if (!mongoose.Types.ObjectId.isValid(organizationId)) {
        return res.status(400).json({ message: "Invalid Organization Id" })
    }
    const prjexist = await projectModel.findOne({ name, organizationId })
    if (prjexist) {
        return res.status(409).json({ message: "projectname already exist" })
    }
    const creator = req.user._id
    const prj = await projectModel.create({
        name, description, organizationId, createdBy: creator
    })
    return res.status(201).json({ message: `project ${prj.name} created successfully` })

})




export const getallprojects = asyncHandler(async (req, res) => {
    const orgId  = req.user.organizationId
    if (!orgId || !mongoose.Types.ObjectId.isValid(orgId)) {
        return res.status(400).json({ message: "Invalid Organization Id" })
    }
    const prj = await projectModel.find({ organizationId:orgId }).populate('createdBy')
    if (prj.length === 0) {
        return res.status(404).json({ message: 'no projects found' })
    }
    return res.status(200).json({ prj,count:prj.length })
})

export const getmemberprjs = asyncHandler(async(req,res)=>{
  const {orgId,userId}=req.params
  if(!orgId  || !userId ){
    return res.status(400).json({message:'User and Organization Id required'})
  }
  const prjs = await projectModel.find({organizationId:orgId,members:userId}).populate('createdBy')
  return res.status(200).json({prjs})
  
})
export const getallprojectmembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await projectModel.findById(projectId).populate("members");
  return res.json(project);
});

export const  deallocatemember = asyncHandler(async(req,res)=>{
    const {userId,projectId}= req.params
    const exist = await projectModel.findOne({_id:projectId,members:userId})
  
    const updatedProject = await projectModel.findByIdAndUpdate(
        projectId,
        { $pull: { members: new mongoose.Types.ObjectId(userId)} },
        { new: true }
    )
    if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json({ 
        message: 'Member deallocated successfully', 
        project: updatedProject 
    })
})