import taskModel from "../models/taskModel.js"


export const createtask =async(req,res)=>{
   try {
     const {title,description,user}=req.body
    if(!title||!description){
        return res.status(422).json({message:"Please fill in all required fields"})
    }
    const userId = req.user._id;
    const titleexist = await taskModel.findOne({title:title,user:userId})
    if(titleexist){
        return res.status(409).json({message:"task already exist"})
    }
    const task=await taskModel.create({
        title,description,user:userId
    })
    return res.status(201).json({message:"task created successfully"})
   } catch (error) {
    // console.log(error)
   return res.status(500).json({message:'server error'}) 
   }

}
