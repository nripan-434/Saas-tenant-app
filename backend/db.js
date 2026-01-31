import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log('db is connected')
            })
    }
    catch (err) {
        console.log(err)
    }

}