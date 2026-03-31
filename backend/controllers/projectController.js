import mongoose from "mongoose"
import { asyncHandler } from "../middleware/asyncHandler.js"
import projectModel from "../models/projectModel.js"
import userModel from "../models/userModel.js"


export const createproject = asyncHandler(async (req, res) => {
    const { name, description, organizationId, startDate, deadline } = req.body
    if (!name || !description || !organizationId || !deadline) {
        return res.status(400).json({
            message: 'Please provide name, description, organizationId, and deadline'
        })
    }
    if (!mongoose.Types.ObjectId.isValid(organizationId)) {
        return res.status(400).json({ message: "Invalid Organization Id" })
    }
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const start = startDate ? new Date(startDate) : null
    const end = new Date(deadline)
    if (start) start.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)
    if (start && start < today) {
        return res.status(400).json({
            message: "Start date cannot be in the past"
        })
    }
    if (end < today) {
        return res.status(400).json({
            message: "Deadline cannot be in the past"
        })
    }
    if (start && end < start) {
        return res.status(400).json({
            message: "Deadline must be after start date"
        })
    }
    const prjexist = await projectModel.findOne({ name, organizationId })
    if (prjexist) {
        return res.status(409).json({ message: "project name already exists" })
    }
    const creator = req.user._id
    const prj = await projectModel.create({
        name,
        description,
        organizationId,
        startDate,
        deadline,
        createdBy: creator
    })

    return res.status(201).json({
        message: `project ${prj.name} created successfully`,
        project: prj
    })
})

const getDeadlineStatus = (deadline) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const end = new Date(deadline)
    end.setHours(0, 0, 0, 0)
    const diffDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24))

    if (diffDays < 2) return 'overdue'
    if (diffDays <= 3) return 'urgent'
    if (diffDays <= 7) return 'approaching'

    return 'safe'
}



export const getallprojects = asyncHandler(async (req, res) => {
    const orgId = req.user.organizationId

    if (!orgId || !mongoose.Types.ObjectId.isValid(orgId)) {
        return res.status(400).json({ message: "Invalid Organization Id" })
    }

    const prj = await projectModel
        .find({ organizationId: orgId })
        .populate('createdBy')

    if (prj.length === 0) {
        return res.status(404).json({ message: 'no projects found' })
    }

    const updated = prj.map(p => ({
        ...p.toObject(),
        status: getDeadlineStatus(p.deadline)
    }))
    const count = updated.length

    return res.status(200).json({ prj: updated,count })
})


export const getmemberprjs = asyncHandler(async (req, res) => {
    const { orgId, userId } = req.params

    if (!orgId || !userId) {
        return res.status(400).json({ message: 'User and Organization Id required' })
    }

    const prjs = await projectModel
        .find({ organizationId: orgId, members: userId })
        .populate('createdBy')

    const updated = prjs.map(p => ({
        ...p.toObject(),
        status: getDeadlineStatus(p.deadline)
    }))

    return res.status(200).json({ prjs: updated })
})

export const getallprojectmembers = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const project = await projectModel.findById(projectId).populate({
        path: "members",
        populate: {
            path: "projects",
            select: "name _id"
        }
    })
    return res.json(project);
});

export const deallocatemember = asyncHandler(async (req, res) => {
    const { userId, projectId } = req.params
    const exist = await projectModel.findOne({ _id: projectId, members: userId })


    const updatedProject = await userModel.findByIdAndUpdate(
        userId,
        { $pull: { projects: new mongoose.Types.ObjectId(projectId) } },
        { new: true }
    )
    if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
    }
    if (!updatedProject) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
        message: 'Member deallocated successfully',
        project: updatedProject
    })
})


export const updateProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params
    const { name, description, deadline, startDate } = req.body
    console.log(name)
    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: "Invalid Project Id" })
    }
    const project = await projectModel.findById(projectId)
    if (!project) {
        return res.status(404).json({ message: "Project not found" })
    }
    if (name && name !== project.name) {
        const exist = await projectModel.findOne({
            name: name,
            organizationId: project.organizationId
        })

        if (exist) {
            return res.status(409).json({ message: "Project name already exists" })
        }
    }
    project.name = name || project.name
    project.description = description || project.description
    project.deadline = deadline || project.deadline
    project.startDate = startDate || project.startDate

    const updatedProject = await project.save()

    return res.status(200).json({
        message: "Project updated successfully",
        project: {
            ...updatedProject.toObject(),
            status: getDeadlineStatus(updatedProject.deadline)
        }
    })
})
