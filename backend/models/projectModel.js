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
      ref: "users",
      required: true,
    },
   members: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'users'
}]


 },{timestamps:true})

const projectModel = mongoose.model('projects',projectSchema)
export default projectModel