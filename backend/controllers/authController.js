import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { asyncHandler } from "../middleware/asyncHandler.js";
import OrganizationModel from "../models/OrganizationModel.js";
import invitaionModel from "../models/invitaionModel.js";
import projectModel from "../models/projectModel.js"
import sendEmail from '../utils/sendEmail.js'

export const OrgRegister = asyncHandler(async (req, res) => {

    const { orgname, name, email, password } = req.body
    if (!orgname || !name || !email || !password) {
        return res.status(400).json({ message: "Fill All Fields" })
    }
    const loweremail = email.toLowerCase()
    const exist = await userModel.findOne({ email: loweremail })
    if (exist) {
        return res.status(409).json({ message: "email already registered" })
    }
    const org = await OrganizationModel.create({
        name: orgname
    })
    const salt = await bcrypt.genSalt(10)
    const hashedpass = await bcrypt.hash(password, salt)
    const user = await userModel.create({
        name, email: loweremail, password: hashedpass, organizationId: org._id, role: "admin"
    })
    return res.status(201).json({ message: "Organization Registered successfully" })

})


export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
     if ( !email || !password) {
        return res.status(400).json({ message: "Fill All Fields" })
    }
    const exist = await userModel.findOne({ email }).select("+password")
    if (!exist) {
        return res.status(400).json({ message: "Invalid Credentials" })
    }
    const pass = await bcrypt.compare(password, exist.password)
    if (!pass) {
        return res.status(400).json({ message: "Invalid Credentials" })
    }
    const token = jwt.sign({ id: exist._id, orgId: exist.organizationId, role: exist.role }, process.env.SECRET_KEY, { expiresIn: '7d' })
    const currentuser = {
        name: exist.name,
        id: exist._id,
        email: exist.email,
        role: exist.role,
        organizationId: exist.organizationId
    }
    return res.status(200).json({ message: "Logged in successfully", token, currentuser })


})

export const getallusers = async (req, res) => {
    try {
        const users = await userModel.find({ role: 'user' })
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: "server error" })
    }

}

export const inviteMember =asyncHandler(async(req,res)=>{
  const {email,role}=req.body
  const orgId = req.user.organizationId
    if(!email){
        return res.status(400).json({message:"Email is required"})
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000)

    await invitaionModel.findOneAndUpdate(
       {email:email.toLowerCase()},{role:role||'user',token,organizationId:orgId,expiration}
    ,{upsert:true,new:true})
    const invitelink=`http://localhost:5173/acceptinvite?token=${token}`

    await sendEmail({
        to:email,
        subject:`Invitation `,
        html:`<h2>You've been invited!</h2>
               <p>Click below to join the organization:</p>
               <a href="${invitelink}">Accept Invitation</a>`
    })
    res.status(200).json({message:'invitaion sent'})
})

export const acceptinvite =asyncHandler(async(req,res)=>{
    const {token,name,password}=req.body
    const exist = await invitaionModel.findOne({token})
    if(!exist){
        return res.status(403).json({message:"unauthorized"})

    }
    if(exist.expiration<new Date){
        await invitaionModel.deleteOne({exist})
        return res.status(400).json({message:'Invitaion Link Expired'})
    }
    if(!name || !password){
        return res.status(400).json({message:'enter the fields'})
    }
    const userexist=await userModel.findOne({email:exist.email})
    if(userexist){
        return res.status(400).json({message:'An account with this email already exists'})

    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    
    await userModel.create({
        name,
        email: exist.email,
        password: hashedPass,
        organizationId: exist.organizationId,
        role: exist.role
    });

    await invitaionModel.deleteOne({ exist });

    res.status(201).json({ message: "Registration successful!" });
});

export const getallmembers =asyncHandler(async(req,res)=>{
    const {orgId}=req.params
    if(!orgId){
        return res.status(400).json({message:"Organization Id Required!"})
    }
    const members = await userModel.find({organizationId:orgId,role:'user'})
    return res.status(200).json({members})
})

export const projectmember =asyncHandler( async(req,res)=>{
    const {userId,projectId}=req.params;
    const {confirm}= req.body
    const member =await userModel.findById(userId)
    if(!member){
        return res.status(409).json({message:'member not exist'})
    }
    if(member.projects.length>0 && !confirm){
        console.log(member.projects.length)
        console.log(confirm)
       if (member.projects && member.projects.includes(projectId)) {
    return res.status(409).json({ message: 'Already assigned to this project' });
}
        return res.status(200).json({
            needsConfirmation: true,
            message:`${member.name} already assigned in another project   `
        })
    }
const added = await userModel.findByIdAndUpdate(userId,{$addToSet:{projects:projectId}},{new:true})
await projectModel.findByIdAndUpdate(projectId,{$addToSet:{members:userId}},{new:true})
res.status(200).json({message:'Successfully assigned',added})
})

export const getallprojectmembers = asyncHandler(async(req,res)=>{
    const {projectId} = req.params
    if (!projectId) {
    return res.status(400).json({ message: "Project ID is required" })
  }
    const m = await userModel.find({projects:projectId})
    return res.status(200).json({m})
})