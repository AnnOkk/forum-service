import { Router } from "express";
import UserAccountController from "../controllers/UserAccount.controller.js";
import validate from "../middlewares/validation.middleware.js";
import {userSchemas} from "../middlewares/UserValidation.middleware.js";


const router = Router();

router.post('/register',validate(userSchemas.createUserAccount), UserAccountController.register)
router.post('/login', UserAccountController.login)
router.delete('/user/:login', UserAccountController.deleteUser)
router.patch('/user/:login',validate(userSchemas.updateUser), UserAccountController.updateUser)
router.patch('/user/:login/role/:role',validate(userSchemas.addRole,'params'),UserAccountController.addRole)
router.delete('/user/:login/role/:role',UserAccountController.removeRole)
router.patch('/password', validate(userSchemas.changePassword),UserAccountController.changePassword)
router.get('/user/:login', UserAccountController.getUser)


export default router;