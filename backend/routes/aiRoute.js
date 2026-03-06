import { authmiddleware } from "../middleware/auth.js";
import { adminonly } from "../middleware/adminMiddleware.js";
import express from 'express'
import { createAitask } from "../controllers/aiController.js";

const router = express.Router()

router.post('/createAitask',authmiddleware,adminonly,createAitask)

export default router