import Joi from 'joi';

export const ApplicantValidator = Joi.object({
    name: Joi
        .string()
        .min(1)
        .max(20)
        .trim()
        .required()
        .messages({
            'string.empty': 'поле є обов\'язковим для заповнення',
            'string.min': 'мінімальна кількість символів 1',
            'string.max': 'максимальна кількість символів 20',
            'string.pattern.base': 'тільки українські та англійські літери'
        }),

    surname: Joi
        .string()
        .min(1)
        .max(20)
        .required()
        .messages({
            'string.empty': 'поле є обов\'язковим для заповнення',
            'string.min': 'мінімальна кількість символів 1',
            'string.max': 'максимальна кількість символів 20',
            'string.pattern.base': 'тільки українські та англійські літери'
        }),

    skills: Joi
        .any()
        .required(),

    level: Joi
        .number()
        .min(1)
        .max(3)
        .required()
});