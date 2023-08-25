
import joi from 'joi'

export const changePassword = {
    body:joi.object().required().keys({
        oldPassword :joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)).required(),
        newPassword: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)).required()
    })
}