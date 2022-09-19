import Specialitiy from '../models/specialities.js'

export const getSpecialities = async (req,res,next)=>{
    try {
        const specialities = await Specialitiy.find();

        if(specialities.length ===0)
            throw new Error('No specialities found.');
        res.status(200).json({
            status:"Success",
            specialities
        })    
        
    } catch (error) {
        res.status(404).json({
            status:"Fail",
            error:error.message
        })    
    }
}


export const createSpecialitiy = async (req,res,next) => {
        try {
            const {
                name,
                details
            } = req.body;

            const newSpecialitiy = await Specialitiy.create({
                name,
                details
            });
            res.status(200).json(
                {
                    status:"success",
                    newSpecialitiy
                }
            );
        } catch (error) {
            res.status(404).json({
                status:"Fail",
                error:error.message
            })    
        }
}


export const getSpecialitiy = async(req, res, next) => {
    try {
        const { id } = req.params
        const speciality = await Specialitiy.findById(id);

        res.status(200).json({
            status:"Success",
            speciality
        })    
        
    } catch (error) {
        res.status(404).json({
            status:"Fail",
            error:error.message
        })    
    }
}


export const updateSpecialitiy = async(req, res, next) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'details']
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
        const speciality = await Specialitiy.findById(id);
        // FOR EACH VALID UPDATE  DO THE UPDATE
        validOperations.forEach(update => speciality[update] = req.body[update])
        // SAVE THE USER
        await speciality.save();

        res.status(200).json({
            status:"Success",
            speciality
        })    
        
    } catch (error) {
        res.status(404).json({
            status:"Fail",
            error:error.message
        })    
    }
}


export const deleteSpecialitiy = async(req, res, next) => {
    try {
        const { id } = req.params
        const speciality = await Specialitiy.findByIdAndDelete(id);

        res.status(200).json({
            status:"Success",
            speciality
        })    
        
    } catch (error) {
        res.status(404).json({
            status:"Fail",
            error:error.message
        })    
    }
}
