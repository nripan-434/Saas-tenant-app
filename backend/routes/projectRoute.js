import express from 'express'
import { createproject,getallprojects } from '../controllers/projectController'

export const Router = express.Router()

Router.post('/createproject',createproject)
Router.get('/getallprojects',getallprojects)

export default Router