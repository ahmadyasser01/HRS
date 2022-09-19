import express from "express";
import {  getAllAdmins, login, logout, protect,  signup } from "../controllers/admin.js";



// router obj
const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)


router.route('/')
    .get(protect,getAllAdmins)
    /**
     * TODO: implement createAdmin controller
     */
    // .post(signup)
  

export default router;
