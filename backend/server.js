import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db.js'
import Authrouter from './routes/authRoute.js'
import Projectrouter from './routes/projectRoute.js'

import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js'
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use('/auth',Authrouter)
app.use('/project',Projectrouter)
app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    console.log("server is running")
})
connectDB()

