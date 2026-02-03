import express from 'express'
import { createproject,getallprojects } from '../controllers/projectController.js'
import { authmiddleware } from '../middleware/auth.js'

export const Router = express.Router()

Router.post('/createproject',authmiddleware,createproject)
Router.get('/getallprojects',authmiddleware,getallprojects)

export default Router