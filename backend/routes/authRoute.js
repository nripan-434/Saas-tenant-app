import { OrgRegister,login,removemember,getallusers,getallmembers,projectmember, inviteMember,acceptinvite } from "../controllers/authController.js";
import { authmiddleware } from "../middleware/auth.js";
import { adminonly } from "../middleware/adminMiddleware.js";
import express from 'express'

const router = express.Router()
router.post('/register',OrgRegister)
router.post('/login',login)
router.get('/getallusers',authmiddleware,adminonly,getallusers)
router.post('/invite',authmiddleware,adminonly,inviteMember)
router.post('/acceptinvite',acceptinvite)
router.get('/getallmembers/:orgId',getallmembers)
router.patch('/projectmember/:userId/:projectId',projectmember)
router.delete('/removemember/:userId/:orgId',removemember)

export default router