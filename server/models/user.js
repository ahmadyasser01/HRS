import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:["true","First Name is required"]
    },
    lastName:{
        type:String,
        required:["true","last Name is required"]
    },
    email:{
        type:String,
        required:["true","Email  is required"]
    },
    password:{
        type:String,
        required:["true","Password is required"],
        select:false
    },
    bloodGroup:{
        type:String,
        enum :["A-","A+","B+","B-","AB+","AB-","O+","O-"]
    },
    phone:{
        type:String,
    },
    age:{
        type:Number,
    }
});
// HASH PASSWORD BEFOR SAVE
userSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,12);
    next();
});

//  CHECK PASSWORD CORRECTNESS
userSchema.methods.correctPassword = async function(candidatePassword,userPassword)
{
    return await bcrypt.compare(candidatePassword,userPassword)
}

// CHECK IF PASSWORD IS CHANGED AFTER JWT OF LOFIN IS ISSUED
userSchema.methods.changedPasswordAfter = function(JWTTimeStamp){
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000,
        10);
        return JWTTimeStamp < changedTimeStamp;
    }
    return false;
}
// CREATE PASSWORD RESET TOKEN
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

// save The time when password is changed
userSchema.pre('save',async function(next){
    if(!this.isModified('password') ||  this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

const User = mongoose.model('User',userSchema);
export default User;