import {Router} from 'express'
import * as controller from './controller/auth.ctrl.js'
import * as validators from './auth.validation.js'
import { validation } from '../../Middleware/Validation.js';

const router = Router()

router.post('/signUp',validation(validators.signUpSchema),controller.signUp)
router.get('/confirmEmail/:token' , controller.finishConfirmation)
router.post('/signIn' ,validation(validators.signInSchema),controller.signIn )
router.post('/resetPasswordCode' ,validation(validators.resetPasswordCode), controller.forgetPasswordEmail)
router.post('/resetPasswordCode/newPassword', validation(validators.resetPassword), controller.changeAfterReset)




export default router