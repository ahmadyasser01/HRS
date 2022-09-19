import Appointment from '../models/appointment.js'
export const getTodayAppointments = async(req, res, next) => {
    const today = new Date()
    const start = new Date(today);
    start.setHours(12,0,0);
    const end = new Date(today);
    end.setHours(21,0,0);
    req.query ={
        st:start,
        end
    }
    next();
}
export const getPastAppointments = async(req, res, next) => {
    const today = new Date()
    const end = new Date(today);
    console.log(end,"ss");
    end.setHours(12,0,0);
    req.query ={
        end
    }
    next();
}
export const getUpcomingAppointments = async(req, res, next) => {
    const st = new Date()
    req.query ={
        st
    }
    next();
}
export const getAllAppointments = async (req,res,next)=>{
    try {
        let appointments;
        console.log(req.query);
        let  startDate;
        let endDate;
        let query={};
        if(req.query?.st|| req.query?.end){
            if(req.query?.st) {
                startDate = new Date(req.query.st)
                query['$gte'] =startDate.toLocaleString()

            }
            if(req.query?.end) {
                endDate =   new Date(req.query.end)
                query['$lte'] =endDate.toLocaleString();
            
            }
            console.log(query);
            appointments = await Appointment.find({
                date:query
            }).populate({
                path: 'user',
                select: 'firstName -_id',
                options: {strictPopulate: false}
              }).populate({
                path: 'speciality',
                select: 'name -_id',
                options: {strictPopulate: false}

              }); 
        }
        else
{         appointments = await Appointment.find().populate({
            path: 'user',
            select: 'firstName -_id',
        }).populate({
            path: 'speciality',
            select: 'name -_id',

        }); 
    }
    appointments = appointments.map((a)=>{
        return {_id:a._id,speciality:a.speciality.name,user:a.user.firstName,date:a.date,__v:a.__v,cancelled:a.cancelled?"true":"false"}
       
    })
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
            console.log(req.body.date);
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