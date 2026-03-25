import Joi from "joi";

export const addPostSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
})

export const updatePostSchema = Joi.object({
    title: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
})