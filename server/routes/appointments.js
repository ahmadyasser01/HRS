import express from "express";
import { bookAppointment, cancelAppointment, deleteAppointment, getAllAppointments, getAppointment, updateAppointment } from "../controllers/appointment.js";
import { protect } from "../controllers/auth.js";



// router obj
const router = express.Router();


router.route('/')
    .get(protect,getAllAppointments)
    .post(protect,bookAppointment)

router.route("/:id")
    .get(protect,getAppointment)  
    .patch(protect,updateAppointment)  
    .delete(protect,deleteAppointment)

// ALIAS ROUTE TO CANCEL APPOINTMENT DIRECTLY   
router.route("/:id/cancel").patch(cancelAppointment,updateAppointment)

export default router;
