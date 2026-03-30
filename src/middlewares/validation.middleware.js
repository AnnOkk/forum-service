import Joi from 'joi';

const  schemas = {
    createPost: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        tags: Joi.array().items(Joi.string())
    }),
    addComment: Joi.object({
        message: Joi.string().required() //!!!
    }),
    getPostsByTags: Joi.object({
        values: Joi.string().required()
    }),getPostsByPeriod: Joi.object({
        dateFrom: Joi.date().required(),
        dateTo: Joi.date().required()
    }),
    updatePost: Joi.object({
        title: Joi.string(),
        tags: Joi.array().items(Joi.string()),
        content: Joi.string()

    })
};


const validate = (schemaName,source = 'body') => (req,res,next) => {
    console.log('MIDDLEWARE START');
    console.log('schemaName:', schemaName);
    console.log('source:', source);
    console.log('req[source]:', req[source]);


    const schema = schemas[schemaName];
    if(!schema){
        return next(new Error('Invalid schema name'));
    }
    const data = req[source];
    const {error} = schema.validate(data) //!!!where is function seek data to validate
    if(error){
        return res.status(400).send({
            message: error.details[0].message,
            code: 400,
            status: `Bad Request ${source}`,
            timestamp: new Date().toISOString().slice(0,19),
            path: req.path

        })
    }
    return next();
}


export default validate;
