import { authmiddleware } from "../middleware/auth.js";
import { adminonly } from "../middleware/adminMiddleware.js";
import express from 'express'
import { addaitask,addnewtask,getalltask,removetask } from "../controllers/taskcontroller.js";

const router = express.Router()

router.post('/addaitask',authmiddleware,adminonly,addaitask)
router.post('/addnewtask',authmiddleware,adminonly,addnewtask)
router.get('/getalltask',authmiddleware,adminonly,getalltask)
router.delete('/removetask/:taskId',authmiddleware,adminonly,removetask)

export default router

    