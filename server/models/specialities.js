import mongoose from "mongoose";

const specialitySchema = new mongoose.Schema({
    name:{
        type: String,
        required:["true","Specialitiy Name is required"]
    },
    details:{
        type:String,
    }
});


const Specialitiy = mongoose.model('Specialitiy',specialitySchema);
export default Specialitiy;