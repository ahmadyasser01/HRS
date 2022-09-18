import express from "express";
import { bookAppointment, cancelAppointment, deleteAppointment, getAllAppointments, getAppointment, getTodayAppointments, updateAppointment } from "../controllers/appointment.js";
import { protect } from "../controllers/auth.js";



// router obj
const router = express.Router();

router.route("/today").get(getTodayAppointments,getAllAppointments)

router.route('/')
    .get(getAllAppointments)
    .post(bookAppointment)

router.route("/:id")
    .get(getAppointment)  
    .patch(updateAppointment)  
    .delete(deleteAppointment)

// ALIAS ROUTE TO CANCEL APPOINTMENT DIRECTLY   
router.route("/:id/cancel").patch(cancelAppointment,updateAppointment)
export default router;
