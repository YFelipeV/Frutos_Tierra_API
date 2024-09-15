import { Router } from "express";
import { getMenuForUser } from "../controllers/menuController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";


const router=Router()

router.get("/menu/:userId",authenticateToken,getMenuForUser)






export default router