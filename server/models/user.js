import mongoose from "mongoose";

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
        required:["true","Password is required"]
    }
});


const User = mongoose.model('User',userSchema);
export default User;