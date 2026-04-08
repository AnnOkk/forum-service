import { Router } from 'express';
import userAccountController from '../controllers/userAccount.controller.js';
import validate from "../middlewares/UserValidation.middleware.js";



const router = Router();



router.post('/register',validate('createUserAccount'),userAccountController.createUserAccount);
router.post('/login',userAccountController.loginUser);
router.delete('/user/:user',userAccountController.deleteUser);
router.patch('/user/:user',validate('updateUser'),userAccountController.updateUser);
router.patch('/user/:user/role/:role',userAccountController.addRole);
router.delete('/user/:user/role/:role',userAccountController.deleteRole);
router.get('/user/:user',userAccountController.getUser);//?





export default router;