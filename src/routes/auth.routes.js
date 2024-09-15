import { Router } from "express";
import { getProfile, getProfileAll, login, registerUser, updateUser } from "../controllers/authController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { registerSchema } from "../schemas/auth/register.schema.js";
import { authenticateToken } from "../middleware/authMiddleware.js";


const router=Router()

router.get("/auth/profile/:id",authenticateToken,getProfile)
router.get("/auth/profileAll",authenticateToken,getProfileAll)
router.post("/auth/signin",login)
router.post("/auth/register",validateSchema(registerSchema), registerUser)
router.put("/auth/profile/:id",authenticateToken, updateUser)
router.put("/auth/verifyToken ",authenticateToken)


export default router