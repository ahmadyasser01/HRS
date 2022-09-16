import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    speciality:{
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
        type:String,
        required:["true","Appointment must have date"]
    }
    ,
    cancelled:{
        type:Boolean,
        default:false
    }
});
// HASH PASSWORD BEFOR SAVE
appointmentSchema.pre('save',async function (next){
    // if(!this.isModified('date')) return next();
    // const  timeString = new Date(this.date).toLocaleString("en-US", {timeZone: 'Africa/Cairo'});
    // console.log(timeString);
    // const savedDate = new Date(Date.parse(timeString)).toISOString()
    // console.log(savedDate);
    // if(< 12 && this.date >=21) throw new Error("Invalid time range")
    console.log(this.date);
    const dateFormat = new Date(Date.parse(this.date));
    console.log(dateFormat.toISOString());

    next();
});


// // CHECK IF PASSWORD IS CHANGED AFTER JWT OF LOFIN IS ISSUED
// userSchema.methods.changedPasswordAfter = function(JWTTimeStamp){
//     if(this.passwordChangedAt){
//         const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000,
//         10);
//         return JWTTimeStamp < changedTimeStamp;
//     }
//     return false;
// }


const Appointment = mongoose.model('Appointment',appointmentSchema);
export default Appointment;