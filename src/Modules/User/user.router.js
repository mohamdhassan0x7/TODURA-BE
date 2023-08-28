import {Router} from 'express'
import * as controller from './Controller/user.ctrl.js'
import { auth } from './../../Middleware/auth.js';
import { validation } from './../../Middleware/Validation.js';
import * as validators from './user.validation.js'
import { taskModel } from '../../../DB/Models/task.model.js';


const router = Router()

router.patch('/changePassword', validation(validators.changePassword) ,auth() , controller.changePassword)
router.post('/tasks/addTask',auth(),controller.addTask)
router.get('/tasks/upcoming',auth(),controller.upcomingTasks)
router.get('/tasks/delayed',auth(),controller.delayedTasks)
router.get('/tasks/finished',auth(),controller.finishedTasks) 
router.get('/tasks/today',auth(),controller.todayTasks) 
//router.get('/tasks/all',auth(),controller.allTasks) 
router.delete('/tasks/delete',auth(),controller.removeTask)
router.patch('/tasks/setFinished' , auth() , controller.setFinished)



export default router