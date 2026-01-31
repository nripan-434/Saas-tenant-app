import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { asyncHandler } from "../middleware/asyncHandler.js";
import OrganizationModel from "../models/OrganizationModel.js";

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
