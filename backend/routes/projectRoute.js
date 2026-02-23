import express from 'express'
import { createproject,getallprojects,getmemberprjs,deallocatemember } from '../controllers/projectController.js'
import { authmiddleware } from '../middleware/auth.js'

export const Router = express.Router()

Router.post('/createproject',authmiddleware,createproject)
Router.get('/getallprojects',authmiddleware,getallprojects)
Router.get('/getmemberprjs/:orgId/:userId',authmiddleware,getmemberprjs)
Router.patch('/deallocatemember/:userId/:projectId',authmiddleware,deallocatemember)

export default Router