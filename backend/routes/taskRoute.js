import { authmiddleware } from "../middleware/auth.js";
import { adminonly } from "../middleware/adminMiddleware.js";
import express from 'express'
import { addaitask,getalltask } from "../controllers/taskcontroller.js";

const router = express.Router()

router.post('/addaitask',authmiddleware,adminonly,addaitask)
router.get('/getalltask',authmiddleware,adminonly,getalltask)

export default router

    