import mongoose from 'mongoose'
 const projectSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    organizationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Organization',
        required:true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

 },{timestamps:true})

const projectModel = mongoose.model('projects',projectSchema)
export default projectModel