import { authmiddleware } from "../middleware/auth.js";
import { adminonly } from "../middleware/adminMiddleware.js";
import express from 'express'
import { addaitask } from "../controllers/taskcontroller.js";

const router = express.Router()

router.post('/addaitask',authmiddleware,adminonly,addaitask)

export default router

    