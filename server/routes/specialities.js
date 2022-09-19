import express from "express";
import { createSpecialitiy, deleteSpecialitiy, getSpecialities, getSpecialitiy, updateSpecialitiy } from "../controllers/specalities.js";

import {  protect  } from "../controllers/admin.js";


// router obj
const router = express.Router();


router.route('/')
    .get(getSpecialities)
    .post(protect,createSpecialitiy)

router.route("/:id")
    .get(getSpecialitiy)  
    .patch(updateSpecialitiy)  
    .delete(deleteSpecialitiy)

export default router;
