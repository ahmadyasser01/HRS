import express from "express";



// router obj
const router = express.Router();


router.post('/login',login)
router.post('/logout',logout)


router.route('/me')
    .get(protect,admin,getMe)
    .patch(protect,admin,updateMe)
    .delete(protect,admin,deleteMe)

router.route('/')
    .get(admin,getAllAdmins)
    .post(createAdmin)



router.post('/forgotPassword',forgotPassword);
router.patch('/resetPassword/:token',resetPassword);    

export default router;
