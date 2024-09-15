import { Router } from "express";
import { createFinca, deleteFinca, getAllFincas, getFincasId, updateFinca } from "../controllers/fincasController.js";
import { fincaSchema } from "../schemas/fincas/finca.schema.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { authenticateToken } from "../middleware/authMiddleware.js";


const router=Router()

router.get("/fincas",authenticateToken,getAllFincas)
router.get("/fincas/:id",authenticateToken,getFincasId)
router.post("/fincas",createFinca,validateSchema(fincaSchema),authenticateToken)
router.put("/fincas/:id",authenticateToken,updateFinca)
router.delete("/fincas/:id",authenticateToken,deleteFinca)



export default router