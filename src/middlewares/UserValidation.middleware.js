import Joi from 'joi';

export const  userSchemas = {       //export -user-
    createUserAccount: Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    }),
    updateUser: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string()
    }),
    changePassword: Joi.object({
       // oldPassword: Joi.string().required(),
        newPassword: Joi.string()
    }),
    addRole: Joi.object({
        role: Joi.string()
            .uppercase()
            .valid('USER', 'MODERATOR', 'ADMIN')
    }),

};


// const validateUser = (schemaName,target='body') => (req,res,next) => {
//     const schema = schemas[schemaName];
//     if(!schema){
//         return next(new Error('Invalid schema name'));
//     }
//     const {error} = schema.validate(req[target]);
//     if(error){
//         return res.status(400).send({
//             message: error.details[0].message,
//             code: 400,
//             status: 'Bad Request',
//             timestamp: new Date().toISOString(),
//             path: req.path
//
//         })
//     }
//     return next();
// }
//
// export default validateUser;