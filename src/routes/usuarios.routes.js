import { Router } from "express";
import { getAllUsuarios, getUsuariosId,updateUsuarioEstado } from "../controllers/usuariosController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";


const router=Router()

router.get("/usuarios",authenticateToken,getAllUsuarios)
router.get("/usuarios/:id",authenticateToken,getUsuariosId)
router.put("/usuarios/:id",authenticateToken,updateUsuarioEstado)





export default router