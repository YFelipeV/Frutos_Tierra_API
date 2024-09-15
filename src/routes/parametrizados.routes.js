import { Router } from "express";
import { getAllCategorias } from "../controllers/parametrizadosController.js";

const router=Router()

router.get("/categorias",getAllCategorias)

export default router