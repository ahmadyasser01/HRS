import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username:{
        type: String,
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


const Admin = mongoose.model('Admin',adminSchema);
export default Admin;