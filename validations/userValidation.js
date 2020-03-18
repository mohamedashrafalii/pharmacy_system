const Joi = require('joi')
const userValidation = (data) =>{
    const schema = 
    {
        name:Joi.string().min(1).max(50).required(),
        username:Joi.string().min(1).max(50).required(),
        type:Joi.string().min(1).max(50).valid('user','admin').required(),
        password:Joi.string().min(8).max(50).alphanum().required()
    }
    return Joi.validate(data,schema)
}
module.exports.userValidation = userValidation 