import express from "express";



// router obj
const router = express.Router();


router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)


router.route('/me')
    .get(protect,getMe)
    .patch(protect,updateMe)
    .delete(protect,deleteMe)



router.post('/forgotPassword',forgotPassword);
router.patch('/resetPassword/:token',resetPassword);    

export default router;
