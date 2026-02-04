import mongoose from "mongoose";


const invitationSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    organizationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'organizations',
        required:true,


    },
    role:{     
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true,
        unique:true
    },
    expiration:{
        type:Date,
        required:true
    }

},{timestamps:true})
export default mongoose.model('Invitations',invitationSchema)
