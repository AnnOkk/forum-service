import Joi from 'joi';

export const postSchemas = {
    createPost: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        tags: Joi.array().items(Joi.string()),
    }),
    addComment: Joi.object({
        message: Joi.string().required(),
    }),
    updatePost: Joi.object({
        title: Joi.string(),
        content: Joi.string(),
        tags: Joi.array().items(Joi.string()),
    }),

    dateFormat: Joi.object({
        dateFrom: Joi.date().iso().required(),
        dateTo: Joi.date().iso().required().greater(Joi.ref('dateFrom')),
    })
}

export const validate = (schema, target = 'body') => (req, res, next) => {

    if (!schema){
        return next(new Error('Schema is required'));
    }
    const {error,value} = schema.validate(req[target]);
    if (error) {
        return res.status(400).send({
            message: error.details[0].message,
            code: 400,
            status: 'Bad Request',
            timestamp: new Date().toISOString(),
            path: req.path
        });
    }
    req.validated = value;
    return next();
}

export default validate;
