import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    email:{
        type:String,
        required:["true","Email  is required"],
        unique:true
    },
    password:{
        type:String,
        required:["true","Password is required"],
        select:false

    }
});

adminSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,12);
    next();
});

//  CHECK PASSWORD CORRECTNESS
adminSchema.methods.correctPassword = async function(candidatePassword,userPassword)
{
    return await bcrypt.compare(candidatePassword,userPassword)
}

// CHECK IF PASSWORD IS CHANGED AFTER JWT OF LOFIN IS ISSUED
adminSchema.methods.changedPasswordAfter = function(JWTTimeStamp){
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000,
        10);
        return JWTTimeStamp < changedTimeStamp;
    }
    return false;
}
// CREATE PASSWORD RESET TOKEN
adminSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

// save The time when password is changed
adminSchema.pre('save',async function(next){
    if(!this.isModified('password') ||  this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});
const Admin = mongoose.model('Admin',adminSchema);
export default Admin;