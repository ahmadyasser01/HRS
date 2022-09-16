import Appointment from '../models/appointment.js'

export const getAllAppointments = async (req,res,next)=>{
    try {
        let appointments;
        console.log(req.query);
        if(req.query?.st){
            const startDate = new Date(req.query.st)
            const endDate =   new Date(req.query.end)
            console.log(startDate," st","and",endDate," is end");
            appointments = await Appointment.find({
                date:{
                    $gte:startDate.toLocaleString(),
                    $lte:endDate.toLocaleString()
                }
            }).populate({
                path: 'user',
                select: 'firstName',
              }).populate({
                path: 'speciality',
                select: 'name'
              });   
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
                user,
                date
            } = req.body;
            console.log(req.body);
            const newAppointment = await Appointment.create({
                user,
                speciality,
                date
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
        const { id } = req.params
        const appointment = await Appointment.findById(id).populate({
            path: 'user',
            select: 'firstName',
          }).populate({
            path: 'speciality',
            select: 'name'
          });
          if(appointment ===null)
          throw new Error('Could not find appointment');

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
        const allowedUpdates = ['date',"cancelled"]
        const validOperations = updates.filter((update)=>allowedUpdates.includes(update))
        if(validOperations.length ==0)
        {
            throw new Error("SORRY WE CAN'T DO UPDATES RIGHTNOW!")
        }
        // TODO::
        /**
         * CHECK THIS IMPLEMENTATION AND OPTMIZIE THE CODE 
         */
        const { id } = req.params;
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
        const { id } = req.params
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

export const cancelAppointment = async(req, res, next) => {
    req.body = {
        cancelled:true
     }
     console.log(req.body);
     next();
}