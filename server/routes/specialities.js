import express from "express";



// router obj
const router = express.Router();


router.route('/')
    .get(protect,getSpecialities)
    .post(protect,createSpecialitiy)

router.route("/:id")
    .get(protect,getSpecialitiy)  
    .patch(protect,updateSpecialitiy)  
    .delete(protect,deleteSpecialitiy)

export default router;
