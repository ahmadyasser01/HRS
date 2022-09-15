import express from "express";
import { forgotPassword, getAllAdmins, login, logout, protect, resetPassword, signup } from "../controllers/admin.js";



// router obj
const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)

/**
 * TODO: IMPLEMENT GET ADMIN DATA AND UPDATE IT
 */

// router.route('/me')
//     .get(protect,getMe)
//     .patch(protect,updateMe)
//     .delete(protect,deleteMe)

router.route('/')
    .get(protect,getAllAdmins)
    // .post(createAdmin)



router.post('/forgotPassword',forgotPassword);
router.patch('/resetPassword/:token',resetPassword);    

export default router;
