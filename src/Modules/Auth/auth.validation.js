import joi from 'joi'


export const signUpSchema = {
    body:joi.object().required().keys({
        fName: joi.string().pattern(new RegExp (/^[A-Za-z]{2,}$/)).required(),
        lName: joi.string().pattern(new RegExp (/^[A-Za-z]{2,}$/)).required(),
        email : joi.string().email().required(),
        password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)).required(),
        cPassword: joi.string().valid(joi.ref('password')).required(),
        age: joi.number().integer().min(16).max(60),
        gender : joi.string().pattern(new RegExp ('^(male|female)$'))
    })
}

export const signInSchema = {
    body:joi.object().required().keys({
        email :  joi.string().email().required(),
        password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)).required(),
    })
}

export const resetPassword = {
    body:joi.object().required().keys({
        email :  joi.string().email().required(),
        newPassword: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)).required(),
        passCode:joi.string().required()
    })
}

export const resetPasswordCode = {
    body:joi.object().required().keys({
        email :  joi.string().email().required(),
    })
}