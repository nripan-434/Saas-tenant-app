import { OrgRegister,login,getallusers } from "../controllers/authController.js";
import { authmiddleware } from "../middleware/auth.js";
import { adminonly } from "../middleware/adminMiddleware.js";
import Router from 'express'

const router = Router()
router.post('/register',OrgRegister)
router.post('/login',login)
router.get('/getallusers',authmiddleware,adminonly,getallusers)

export default router