import express from "express";
import { createSpecialitiy, deleteSpecialitiy, getSpecialities, getSpecialitiy, updateSpecialitiy } from "../controllers/specalities.js";

import {  protect  } from "../controllers/admin.js";


/**
 *  PLEASE NOTE I TURNED OF AUTHORIZATION TO MAKE UI FEATURES WORK AS IT IS NOT IMPLENTED YET
 *  TO ADD AUTHORIZATION  PUT PROTECT FUNCTION BACK IN EACH PROTECTED ROUTE
 */

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
