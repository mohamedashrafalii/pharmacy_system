const Joi = require('joi')
const addMedicineValidation = (data) =>{
    const schema = 
    {   
    barcodeNumber:Joi.number().positive().required(),
    name:Joi.string().min(1).max(100).required(),
    description:Joi.string().max(1000),
    price:Joi.number().positive().required(),
    quantity:Joi.number().min(0).required(),
    activeIngredients:Joi.string().max(1000),
    date:Joi.date().required(),
    }
    return Joi.validate(data,schema)
}
module.exports.addMedicineValidation = addMedicineValidation 
const editMedicineValidation = (data) =>{
    const schema = 
    {
    barcodeNumber:Joi.number().positive(),
    name:Joi.string().max(100),
    description:Joi.string().max(1000),
    price:Joi.number().positive(),
    quantity:Joi.number().min(0),
    activeIngredients:Joi.string().max(1000),
    date:Joi.date(),
    }
    return Joi.validate(data,schema)
}
module.exports.editMedicineValidation = editMedicineValidation 
