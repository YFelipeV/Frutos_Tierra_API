import { Router } from "express";
import { upload } from "../middleware/uploadFiles.js";
import { createSliderItem,  getAllSlider,  getAllSliderHome,  updateSliderState } from "../controllers/sliderController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";


const router=Router()

router.get("/sliders",getAllSlider)
router.get("/slider",authenticateToken,getAllSlider)
router.get("/slider_home",authenticateToken,getAllSliderHome)
router.post("/slider",upload.any(),authenticateToken,createSliderItem)
router.put("/slider/:id",upload.any(),authenticateToken,updateSliderState)




export default router