import Appointment from '../models/appointment.js'

export const getAllAppointments = async (req,res,next)=>{
    try {
        let appointments;
        if(req.query){
            const startDate = new Date(req.query.st)
            const endDate =   new Date(req.query.st)
            console.log(startDate,endDate);
            appointments = await Appointment.find({
                date:{
                    $gte:startDate,
                    $lte:endDate
                }
            })
        }
        else
{         appointments = await Appointment.find();
}
        if(appointments.length ===0)
            throw new Error('No appointments found.');
        res.status(200).json({
            status:"Success",
            appointments
        })    
        
    } catch (error) {
        res.status(404).json({
            status:"Fail",
            error:error.message
        })    
    }
}


export const bookAppointment = async (req,res,next) => {
        try {
            const {
                speciality,
                user
            } = req.body;

            const newAppointment = await Appointment.create({
                user,
                speciality
            });
            res.status(200).json(
                {
                    status:"success",
                    newAppointment
                }
            );
        } catch (error) {
            res.status(404).json({
                status:"Fail",
                error:error.message
            })    
        }
}


export const getAppointment = async(req, res, next) => {
    try {
        const { id } = req.params.id
        const appointment = await Appointment.findById(id);

        res.status(200).json({
            status:"Success",
            appointment
        })    
        
    } catch (error) {
        res.status(404).json({
            status:"Fail",
            error:error.message
        })    
    }
}


export const updateAppointment = async(req, res, next) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['date']
        const validOperations = updates.filter((update)=>allowedUpdates.includes(update))
        if(validOperations.length ==0)
        {
            throw new Error("SORRY WE CAN'T DO UPDATES RIGHTNOW!")
        }
        // TODO::
        /**
         * CHECK THIS IMPLEMENTATION AND OPTMIZIE THE CODE 
         */
        const { id } = req.params.id;
        // check if not reserved or not cancelled
        const appointment = await Appointment.findById(id);
        // FOR EACH VALID UPDATE  DO THE UPDATE
        validOperations.forEach(update => appointment[update] = req.body[update])
        // SAVE THE USER
        await appointment.save();

        res.status(200).json({
            status:"Success",
            appointment
        })    
        
    } catch (error) {
        res.status(404).json({
            status:"Fail",
            error:error.message
        })    
    }
}


export const deleteAppointment = async(req, res, next) => {
    try {
        const { id } = req.params.id
        const appointment = await Appointment.findByIdAndDelete(id);

        res.status(200).json({
            status:"Success",
            appointment: appointment
        })    
        
    } catch (error) {
        res.status(404).json({
            status:"Fail",
            error:error.message
        })    
    }
}
