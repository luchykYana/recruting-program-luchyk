import Joi from 'joi';

export const InterviewValidator = Joi.object({
    time: Joi
        .string()
        .min(5)
        .max(20)
        .required(),

    during: Joi
        .number()
        .min(5)
        .max(120)
        .required(),

    applicant: Joi
        .any()
        .required(),

    interviewer: Joi
        .any()
        .required()
});