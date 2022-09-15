import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    specialitiy:{
        type: mongoose.Schema.ObjectId,
        ref:'Specialitiy',
        required:["true","Appointment must belong to Specialitiy"]
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:["true","Appointment must belong to User"]
    },
    date:{
        type:Date,
        required:["true","Appointment must have date"]
    }
    ,
    cancelled:{
        type:Boolean,
        default:false
    }
});


const Appointment = mongoose.model('Appointment',appointmentSchema);
export default Appointment;