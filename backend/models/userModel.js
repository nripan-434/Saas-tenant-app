import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'

    },
    organizationId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Organization",
  required: true
}


}, { timestamps: true })

const userModel = mongoose.model('users', userSchema)
export default userModel