import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        default:''
    },
    status:{
        type:String,
        enum:["pending","completed"],  
        default:'pending',
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    }
} ,{timestamps:true})
export default mongoose.model("tasks",TaskSchema)        