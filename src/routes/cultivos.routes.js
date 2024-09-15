import { Router } from "express";
import { createCultivo, deleteCultivo, getAllCultivos, getAllCultivosAll, getCultivoId, updateCultivo } from "../controllers/cultivosController.js";
import { upload } from "../middleware/uploadFiles.js";
import { cultivoSchema } from "../schemas/cultivos/cultivo.schema.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { authenticateToken } from "../middleware/authMiddleware.js";


const router=Router()

router.get("/cultivos_all",getAllCultivosAll)
router.get("/cultivos",authenticateToken,getAllCultivos)
router.get("/cultivos/:id",getCultivoId)
router.post("/cultivos",upload.any(),validateSchema(cultivoSchema),authenticateToken,createCultivo)
router.put("/cultivos/:id",upload.any(),authenticateToken,updateCultivo,)
router.delete("/cultivos/:id",authenticateToken,deleteCultivo)



export default router