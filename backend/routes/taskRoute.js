import express from 'express'
import { createtask } from '../controllers/taskcontroller.js'


const Router = express.Router()
Router.post('/createtask',createtask)


export default Router