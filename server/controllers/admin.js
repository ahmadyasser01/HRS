import Admin from '../models/admin.js'
import jwt from 'jsonwebtoken'
import crypto from "crypto"
import {promisify} from "util"


const signToken = (id)=>{
    /**
     * Create jwt token
     */
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })

}

const createSendToken = (admin,statusCode,res)=>{
    /**
     * create token
     * create cookie 
     * send  response to user 
     */
    const token = signToken(admin._id);
    const cookieOptions = {
        expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        httpOnly:true
    };
    res.cookie('jwt',token,cookieOptions);
    admin.password = undefined;

    res.status(statusCode).json({
        status:'success',
        token,
        data:{
            admin
        }
    })
}

export const signup = async(req,res,next) => {
    try {
        const newAdmin = await Admin.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        return createSendToken(newAdmin,201,res);
    } catch (error) {
        console.log("err",error);
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}

export const login = async(req, res, next) => {
    // GET EMAIL AND PASSWORD FROM REQUEST
    const {email,password} = req.body;
    try {
        // CHECK EMAIL AND PASSWORD EXISTS
        if(!email || !password) {
            throw new Error("Please provide email and password")
        }
        // FIND USER BY EMAIL
        const admin = await Admin.findOne({email}).select('+password')

        if(!admin || ! (await admin.correctPassword(password,admin.password))) {
            throw new Error("Invalid email or password")

        }
        // CREATE AND SEND NEW JWT TOKEN
        createSendToken(admin,200,res);
        
        
    } catch (error) {
        console.log("err",error);
        res.status(400).json({
            status: 'error',
            message: error.message
        });
        
    }

}

export const logout = async(req, res, next) => {
    res.cookie('jwt', 'xxxx', {
        expires: new Date(Date.now()),
        httpOnly: true
      });
      console.log(res.cookie())
      
      res.status(200).json({
         status: 'success',
    admin:null });  
}


export const protect = async (req, res,next) => {
    let token;
    try {
        // CHECK IF TOKEN IS IN REQUEST
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        } 
        else if(req.cookies?.jwt){
            token = req.cookies.jwt;
        }
        // Check if token is Not found
        if(!token)
        {
            throw new Error("You ARE NOT LOGGED IN  PLEASE LOGIN AND TRY AGAIN");
        }
        // VERIFY JWT TOKEN;
        const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

        // SEARCH FOR USER
        const currentAdmin = await Admin.findById(decoded.id);
        // IF NO USER FOUND THROW ERROR
        if(!currentAdmin)
        {
            throw new Error("You do not have permission to access this endpoint.");
        }
        /**
         * IF admin CHANGED PASSWORD AFTER ISSUING JWT TOKEN
         * ASK HIM TO SING IN AGAIN
         * 
         */
         if (currentAdmin.changedPasswordAfter(decoded.iat)) {
            throw new Error("Please Login again to continue")
          }

        // ADD admin TO REQUEST
         req.admin = currentAdmin;
         // IF NO ERROR UP TILL NOW THEN PASSED AND GO TO NEXT MIDDLEWARE
         next();

    } catch (error) {
        console.log("err",error);
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}

export const forgotPassword = async (req, res, next) =>{
    const admin = await Admin.findOne({email:req.body.email});
    try {
        // GET USER FROM EMAIL
        // IF NO EMAIL THROW ERROR
        if(!admin) throw new Error("There is no user with email " + req.body.email)
        //GENERATE RESET TOKEN
        const resetToken = admin.createPasswordResetToken();
        // SAVE USER
        await admin.save({validateBeforeSave:false});
        // SEND EMAIL WITH THE RESET LINK
        const resetURL = `${req.protocol}://${req.get(
            'host'
          )}/api/v1/admin/resetPassword/${resetToken}`;
          const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
          /**
           * TODO: SEND EMAIL WITH THE RESET LINK
           */
        // SEND SUCCESS RESPONSE
        res.status(200).json({
            state:"Success",
            message:resetURL
        })
        // OR RETURN ERROR  
        
    } catch (error) {
        admin.createPasswordResetToken = undefined;
        admin.passwordResetExpires = undefined;
        await admin.save({validateBeforeSave:false})
        return res.status(500).json({
            status:"Failed",
            message:error.message
        })
        
    }}
    
    
export const resetPassword = async (req, res, next) =>{
    try {
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        // FIND USER BY TOKEN
        const admin = await Admin.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires:{$gt:Date.now()}
        });
            // IF NO USER THROW ERROR
            if(!admin) throw new Error("TOken is invalid or expired")
            // CHANGE PASSWORD 
            admin.password = req.body.password;
            //  REMOVE RESET TOKKEN FROM DATABASE
            admin.passwordResetToken = undefined;
            admin.passwordResetExpires = undefined;
            await admin.save();
            // SEND NEW JWT TOKEN
            createSendToken(admin,201,res)

    } catch (error) {
        console.log("Error",error);
        res.status(500).json({
            status:"Failed",
            message:error.message
        })
    }
    }
export const getAllAdmins = async (req,res,next)=>{
    try {
        const admins = await Admin.find();
        if(admins.length==0) 
            throw new Error("Admin not found");
        res.status(200).json({
            status:"success",
            admins
        })
    } catch (error) {
        console.log("Error",error);
        res.status(500).json({
            status:"Failed",
            message:error.message
        })
    }
}