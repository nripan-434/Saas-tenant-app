import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
export const authmiddleware = async (req,res,next) =>{
    try {
        const authheader = req.headers.authorization
    if(!authheader || !authheader.startsWith('Bearer '))return res.status(401).json({message:"Access denied , login"})
    const token = authheader.split(" ")[1]
    const decoded = jwt.verify(token,process.env.SECRET_KEY)
    const user = await userModel.findById(decoded.id)
    if(!user){
        return res.status(401).json({message:"user not found"})
    }
    req.user=user
    next()
    } catch (error) {
        return res.status(401).json({message:"Invalid or expired token "})
    }
}