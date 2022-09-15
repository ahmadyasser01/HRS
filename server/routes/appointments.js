import express from "express";



// router obj
const router = express.Router();


router.route('/')
    .get(protect,getAllAppointments)
    .post(protect,bookAppointment)

router.route("/:id")
    .get(protect,getAppointment)  
    .patch(protect,updateAppointment)  
    .delete(protect,deleteAppointment)

export default router;
